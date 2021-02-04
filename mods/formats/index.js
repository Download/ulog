var parse = require('kurly/parse')
var pipe = require('kurly/pipe')
var grab = require('../../core/grab')
var console = require('../channels/console')
var makeStatic = require('./utils').makeStatic
var makeStaticPipe = require('./utils').makeStaticPipe
var applyFormatting = require('./apply-formatting')
var applyAlignment = require('./apply-alignment')

/**
 * mod - formats
 *
 * Makes log formatting configurable and extendable
 */
module.exports = {
  use: [
    require('../channels'),
  ],

  settings: {
    format: {
      config: 'log_format',
      prop: {
        default: require('./default'),
      }
    },
  },

  formats: {
    // add a bunch of formats
    date: require('./date'),
    lvl: require('./lvl'),
    message: require('./message'),
    name: require('./name'),
    perf: require('./perf'),
    time: require('./time'),
    '*': require('./wildcard'),
  },

  ext: function(logger) {
    var ulog = this
    for (var channel in logger.channels) {
      for (var level in ulog.levels) {
        logger.channels[channel].fns[level] = makePipe(ulog, logger, channel, level)
      }
    }

    function makePipe(ulog, logger, channel, level) {
      var formats = grab(ulog, 'formats', {})
      var ast = parse(logger.format, { optional: true })
      var rec = logger.channels[channel].recorders.reduce(function(rec, record){
        record.call(ulog, logger, rec)
        return rec
      }, { channel: channel, level: level })
      var line = pipe(ast, formats, rec)
      var ch = logger.channels[channel]
      var method = ch.fns[level]
      var output = ch.out

      if ((output === console) && pipe.isStatic(line)) {
        // derive the arguments to be bound from the pipeline
        var args = line
        .map(toTag)
        .filter(skip)
        .reduce(function(r,fmt){
          var msg = makeStatic(fmt)
          return applyFormatting(rec, fmt, msg, r)
        }, [''])
        // apply alignment if needed
        applyAlignment(rec, args)
        // bind the output and arguments to the log method
        // this uses a devious trick to apply formatting without
        // actually replacing the original method, and thus
        // without mangling the call stack
        return makeStaticPipe(output, method, rec, args)
      } else {
        return makeDynamicPipe(output, method, rec, line)
      }
  }

    function makeDynamicPipe(output, method, rec, line) {
     // set up a dynamic pipeline as a function
     var containsMessage = line.reduce(function(r,node){return r || (node && node.name === 'message')}, false)
     return (function(rec){return function() {
        // arguments to this function are the message
        rec.message = [].slice.call(arguments)
        // run through the pipeline, running all formatters
        var args = line
        .map(toTag)
        .filter(skip)
        .reduce(function(r,fmt){
          var msg = typeof fmt == 'function' ? fmt(rec) : fmt
          return applyFormatting(rec, fmt, msg, r)
        }, [''])
        if (! containsMessage) args.push.apply(args, rec.message)
        // apply alignment if needed
        applyAlignment(rec, args)
        // pass the formatted arguments on to the original output method
        method.apply(output, args)
      }})(rec)
    }

    function toTag(node) {return (
      !node || !node.tag ? node :
      node.tag
    )}

    function skip(tag){return (typeof tag != 'string') || tag.trim().length}
  },
}
