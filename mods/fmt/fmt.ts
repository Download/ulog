import type { LogFunction, LogLevel, LogObject, Logger } from 'anylogger'
import type { FormatRecord, Recorder, WithFmt } from './types.js'
import type { Mod } from '../../core/core.js'
import kurly from 'kurly'
import pipe from 'kurly/pipe.js'
import ulog from '../../core/core.js'
import cfg from '../cfg/cfg.js'
import lvl from '../lvl/lvl.js'
import { firefox, palette, levelColors } from './color/utils.js'
import applyFormatting from './apply-formatting.js'
import applyAlignment from './apply-alignment.js'
import cr from './formats/cr.js'
import date from './formats/date.js'
import level from './formats/lvl.js'
import message from './formats/message.js'
import name from './formats/name.js'
import perf from './formats/perf.js'
import time from './formats/time.js'
import wildcard from './formats/wildcard.js'
import defaultCfg from './default-cfg.js'
const { parse } = kurly

/**
 * mod - formats
 *
 * Makes log formatting configurable and extendable
 */
const fmt: Mod = {
  use: [
    cfg,
    lvl,
  ],

  cfg: defaultCfg,

  props: {
    format: {
      get: (logger: Logger) => cfg.get('log_format', logger.name)
    },
    align: {
      get: (logger: Logger) => cfg.get('log_align', logger.name) == 'on'
    },
    color: {
      get: (logger: Logger) => cfg.get('log_color', logger.name) == 'on'
    }
  },

  colors: {
    palette: palette,
    levels: levelColors,
  },

  formats: {
    // add a bunch of formats
    cr,
    date,
    message,
    name,
    perf,
    time,
    'lvl': level,
    '*': wildcard,
  },

  ext: function(logger: Logger) {
    var formats = ulog.grab('formats', {})
    var recorders = ulog.grab('recorder', [])
    var colors = ulog.grab('colors', {})
    const format = (logger as Logger & WithFmt).format;
    var ast = parse(format, { optional: true })
    for (const level in ulog.levels) {
      if (logger.enabledFor(level)) {
        (logger as any)[level] = makeLogFunction(
            (logger as any), level, formats, recorders, ast, colors
        )
      }
    }
  },
}

export default fmt

function makeLogFunction(
  logger: Logger & WithFmt, level: LogLevel, formats: any,
  recorders: Recorder[], ast: any, colors: any
) {
  const index = hash(logger.name) % colors.palette.length
  var rec = recorders.reduce(
    (rec: FormatRecord, record: Recorder) => record(rec),
    { logger, level, colors: { ...colors, index } }
  )
  var line = pipe(ast, formats, rec)
  var method = (logger as any)[level]
  var output = (logger as any).output

  if ((pipe as any).isStatic(line)) {
    // derive the arguments to be bound from the pipeline
    var args = line
    .map(toTag)
    .filter(skip)
    .reduce((r,fmt) => applyFormatting(rec, fmt, fmt, r), [''])
    // apply alignment if needed
//    applyAlignment(rec, args)
    // bind the output and arguments to the log method
    return makeStaticLogFunction(output, method, rec, args)
  } else {
    // wrap with a dynamic log function
    return makeDynamicLogFunction(output, method, rec, line)
  }
}

/**
 * Makes a static log function
 *
 * This function uses a devious trick to apply formatting without actually
 * replacing the original method, and thus without mangling the call stack.
 *
 * @param output The output log object
 * @param method The method to make into a static log function
 * @param rec The log record
 * @param args The args to bind statically
 * @returns The static log function
 */
function makeStaticLogFunction(output: LogObject, method: LogFunction, rec: FormatRecord, args: any[]) {
  // create a property with a getter, then return the property
  // the getter ensures that whenever the method is invoked,
  // we intercept the call before it happens and dynamically
  // bind the formatting args to the method right before invocation
  // giving us formatting that does not mangle the call stack
  return (Object.defineProperty({}, 'result', {
    get: function(){
      return method.bind.apply(method,
        ([output] as any).concat(firefox && (rec.level === 'trace') ? [] : args.map(function(arg){
          return typeof arg == 'function' ? arg() : arg
        })
      ))
    }
  }) as any)['result']
}

function makeDynamicLogFunction(output: LogObject, method: LogFunction, rec: FormatRecord, line: any) {
  // check if the format contains the `message` format
  var containsMessage = line.reduce((r: any, node:any) => (
    r || (node && node.name === 'message')
  ), false)

  // wrap the log function with one that does formatting
  return ((rec) => function() {
    // arguments to this function are the message
    rec.message = [].slice.call(arguments)
    // run through the pipeline, compiling all formats
    var args = line.map(toTag).filter(skip).reduce((r:any,fmt:any) => {
      var msg = typeof fmt == 'function' ? fmt(rec) : fmt
      return applyFormatting(rec, fmt, msg, r)
    }, [''])
    if (! containsMessage) args.push.apply(args, rec.message)
    // apply alignment if needed
    applyAlignment(rec, args)
    // pass the formatted arguments on to the original output method
    method.apply(output, args)
  })(rec)
}

function toTag(node:any) {
  return !node || !node.tag ? node : node.tag
}

function skip(tag:any){
  return (typeof tag != 'string') || tag.trim().length
}

function hash(s: string) {
  for (var i=0, h=0xdeadbeef; i<s.length; i++)
      h = imul(h ^ s.charCodeAt(i), 2654435761)
  return (h ^ h >>> 16) >>> 0
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul#Polyfill
function imul(a: number, b: number) {
  b |= 0
  var result = (a & 0x003fffff) * b;
  if (a & 0xffc00000 /*!== 0*/) result += (a & 0xffc00000) * b |0;
  return result |0;
}
