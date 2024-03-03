import {
  type LogObject,
  type Logger,
} from 'anylogger'
import ulog, { type Mod, type HasExtender } from '../../core/core.js'
import cfg, { type HasCfg, type HasProps } from '../cfg/cfg.js'
import noop from './outputs/noop.js'
import drain from './outputs/drain.js'
import defaultCfg from './default-cfg.js'

export type Lvl = Mod & HasCfg & HasProps & HasOutputs & HasExtender

export type HasOutputs = {
  outputs: Outputs
}

export type Outputs = {
  [name: string]: LogObject
}

export type HasLvl = {
  level: number
  output: LogObject,
  drain: LogObject,
}

export type WithLvl = Logger & HasLvl


const lvl: Lvl = {
  use: [
    cfg,
  ],

  cfg: defaultCfg,

  props: {
    level: { get: getLevel },
    output: { get: getOutput },
    drain: { get: getDrain },
  },

  outputs: {
    console: console,
    noop: noop,
    drain: drain,
  },

  ext: (logger) => {
    // overwrite enabledFor so it looks at the configured level
    logger.enabledFor = (level) => (
      level && ((logger as any).level >= ((ulog.levels as any)[level])) || false
    )
    // overwrite log methods with methods from `output` or `drain`,
    // based on wether the logger is currently enabled for that level
    for (const name in ulog.levels) {
      (logger as any)[name] = logger.enabledFor(name)
        ? (logger as any).output[name]
        : (logger as any).drain[name]
    }
  },
}

export default lvl

/**
 * Gets the level number for the given `logger`.
 *
 * @param logger The logger to get the level for
 * @returns The level number for the logger
 */
function getLevel(logger: Logger): number {
  const fromStr = (v: string) => (ulog as any).levels[v] || 0
  const debug = fromStr(cfg.get('debug', logger.name))
  const level = fromStr(cfg.get('log', logger.name))
  return Math.max(debug, level)
}

/**
 * Gets the output for the given `logger`.
 *
 * @param logger The logger to get the output for
 * @returns The output for the given `logger`
 */
function getOutput(logger: Logger): LogObject {
  const output = cfg.get('log_output', logger.name);
  const outputs = ulog.grab('outputs', {});
  return outputs[output] || console
}

/**
 * Gets the drain for the given `logger`.
 *
 * @param logger The logger to get the drain for
 * @returns The drain for the given `logger`
 */
function getDrain(logger: Logger): LogObject {
  const drain = cfg.get('log_drain', logger.name)
  const outputs = ulog.grab('outputs', {})
  return outputs[drain] || noop
}
