import anylogger, { type Logger } from 'anylogger'
import ulog, { type Mod, type HasExtender } from '../../core/core.js'
import env from './env.js'

/**
 * The `cfg` mod has a `get` method that lets you get any config setting and
 * have it parsed and evaluated for the given logger name.
 *
 * In addition it has an extender that adds properties to the given logger
 * based on configuration found in other mods.
 */
export type Cfg = Mod & HasExtender & HasGet & HasParse & HasEval

/**
 * The default value to use when no value was set.
 *
 * The default value may not be an expression. E.g.
 * `'info'` is a valid default value for the config
 * `log`, but `'warn; my:logger=info'` is not.
 */
export type CfgDefaultValue = string

/**
 * For configs where no value is specified (e.g. the
 * `debug` config), this specifies the implied value
 * that is used when the logger matches the expression.
 */
export type CfgImpliedValue = { impliedValue: string }

/**
 * Either a default value string or an implied value object
 */
export type CfgEntry = CfgDefaultValue | CfgImpliedValue

/**
 * A mapping of config names to config entries
 */
export type CfgEntries = {
  [name: string]: CfgEntry
}

/**
 * Mods that have a `cfg` key with config entries
 */
export type HasCfg = {
  cfg: CfgEntries
}

export type Matcher = {
  incl: RegExp[]
  excl: RegExp[]
  value: string | undefined
}

export type Prop = {
  get: (logger: Logger) => any
  set?: (logger: Logger, value: any) => void
}

export type Props = {
  [name: string]: Prop
}

export type HasProps = {
  props: Props
}

export type CfgGet = (name: string, loggerName?: string) => string

export type HasGet = {

  /**
   * Gets a config setting by `name`.
   *
   * The settings is evaluated for `loggerName`, if given.
   *
   * @param name The name of the cfg setting to get
   * @param loggerName The optional logger name to evaluate the setting against
   * @returns The (possibly evaluated) setting value
   */
  get: CfgGet
}

export type CfgParse = (value: string, impliedValue?: string) => Matcher[]

export type HasParse = {
  /**
   * Parses the setting value string, returning a Matcher[]
   *
   * e.g `parse('warn; test=debug')` would yield:
   *
   * [{
   * 	 incl: [test],
   * 	 excl: [],
   * 	 value: 'debug'
   * },{
   *   incl: [*],
   *   excl: [],
   *   value: 'warn'
   * }]`
   *
   * if `debugStyle` is truthy, the setting value string is parsed debug-style
   * and `impliedValue` is used as the value of the setting
   *
   * @param value The value to parse.
   * @param impliedValue For debug-style settings, the implied value
   *
   * @returns The matcher array
   */
  parse: CfgParse
}

export type CfgEval = (matchers: Matcher[], name: string) => string

export type HasEval = {
  /**
   * Evaluates the given `matchers` agains the given logger `name`.
   *
   * @param matchers Matchers
   * @param name Logger name
   *
   * @returns The effective value for the given logger name
   */
  eval: CfgEval
}

const log = anylogger('ulog:cfg')

const cfg: Cfg = {
  /**
   * Extends the given `logger` with cfg-based properties from `props`
   *
   * @param logger The logger to extend
   * @returns The extended logger
   */
  ext(logger) {
    let addedProps = ''
    for (const mod of ulog.mods) {
      if ((mod as HasProps).props) {
        for (var name in (mod as HasProps).props) {
          const prop: Prop = (mod as HasProps).props[name]
          const setter = prop.set
          const property: any = {
            writeable: true,
            configurable: true,
            get: () => prop.get(logger)
          }
          if (setter) {
            property.set = (v: any) => setter(logger, v)
          }
          Object.defineProperty(logger, name, property)
          addedProps = addedProps + (addedProps.length ? ', ' : '') + name
        }
      }
    }
    log.debug('ext', logger.name, '=>', 'added props', addedProps)
  },

  get(name: string, loggerName?: string): string {
    const def = ((name: string): CfgEntry | void => {
      let result = undefined
      for (const mod of ulog.mods) {
        if ((mod as HasCfg).cfg && (name in (mod as HasCfg).cfg)) {
          result = (mod as HasCfg).cfg[name]
        }
      }
      return result
    })(name)

    const impliedValue = (typeof def == 'object') ? def.impliedValue : ''
    const defaultValue = (typeof def == 'string') ? def : ''
    const value = env.get(name) || ''

    // if no loggerName, it's done
    if (!loggerName) {
      return value
    }

    // else parse the value as an ulog cfg setting
    const matchers = cfg.parse(value, impliedValue)
    // evaluate it for the given loggerName and return
    // what it found, if anything, or the defaultValue
    const match = cfg.eval(matchers, loggerName)
    const result = match || defaultValue
    return result;
  },

  parse(value: string, impliedValue?: string): Matcher[] {
    // keep track of matchers
    const matchers: Matcher[] = []
    // keep track of 'implied wildcard' (fallback) settings (see below)
    var implied: Matcher[] = []
    // a config at the top level is just a semicolon-separated list of items
    const items = (value || '').trim().split(';')

    // loop over the items and parse cfg settings
    for (let item of items) {
      const idx = item.indexOf('=')
      // check if we have an equals symbol
      var x = (idx == -1)
        ? [item.trim()]
        : [item.substring(0,idx).trim(), item.substring(idx + 1).trim()]
      // ulog: expressions is first param or none if only a value is present
      // debug: expressions is always first and only param
      var expressions = x[1] || impliedValue ? x[0].split(/[\s,]+/) : []
      // ulog: setting value is second param, or first if only a value is present
      // debug: setting value is always implied
      var matcher: Matcher = {
        value: x[1] || (!impliedValue && x[0]) || impliedValue,
        incl: [],
        excl: []
      }
      // if the setting has expressions, add it to the array
      if (expressions.length) {
        matchers.push(matcher)
      } else {
        // add the implied wildcard expression
        expressions.push('*')
        // save the matcher separately as fallback
        implied.push(matcher)
      }
      // add the expressions to the incl/excl lists on the matcher
      for (let s of expressions) {
        s = s.replace(/\*/g, '.*?')
        const list = s[0] == '-' ? 'excl' : 'incl'
        matcher[list].push(new RegExp('^' + s.substring(s[0] == '-' ? 1 : 0) + '$'))
      }
    }
    // add implied settings last so they act as fallback
    matchers.push(...implied)
    return matchers
  },

  eval(matchers, name) {
    for (let m of matchers) {
      if (excl(m, name)) continue
      let r
      if (r = incl(m, name)) return r
    }
    return ''
    function excl(m: Matcher, name: string): string | undefined {
      for (let excl of m.excl) {             // for all exclusion tests
        if (excl.test(name)) return '!'      // if logger matches exclude, return '!'
      }
    }

    function incl(m: Matcher, name: string): string | undefined {
      for (let incl of m.incl) { 	           // for all inclusion tests
        if (incl.test(name)) return m.value  // if logger matches include, return result
      }
    }
  }
}

export default cfg;
