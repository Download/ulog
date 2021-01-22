// options are smart settings....
var options = module.exports = {
  use: [
    require('../settings')
  ],

  /**
   * `options.get(result: String|Object, name?: String, loggerName?: String): String|Object`
   *
   * @param {String|Object} result The result found so far.
   * @param {String} name The name of the setting to get. Optional.
   * @param {String} loggerName The name of the logger to get the effective setting for. Optional.
   * @returns {String|Object} The (effective) setting for the given `name` and `loggerName`.
   *
   * if no `loggerName` is given, returns the `result` unchanged.
   *
   * If a `loggerName` is given, the effective setting value for that specific
   * logger name is returned.
   *
   * If empty string is given as `loggerName`, the effective global/default
   * setting value is returned.
   *
   * For example, given that the following settings are active:
   *
   * `{ level: 'info; libA=warn; libB=error', output: 'console' }`
   *
   * These following statements would be true:
   *
   * `JSON.stringify(ulog.get()) == '{"level":"info; libA=warn; libB=error","output":"console"}'`
   * `ulog.get('output') == 'console`
   * `ulog.get('level') == 'info; libA=warn; libB=error'`
   * `ulog.get('level', 'libA') == 'warn'`
   * `ulog.get('level', 'libB') == 'error'`
   * `ulog.get('level', 'libC') == 'info'`
   * `ulog.get('level', '') == 'info'`
   */
  get: function(result, name, loggerName) {
    if (loggerName === undefined) return result
    return options.eval(options.parse(result, name), loggerName)
  },

  /**
   * `parse(value: string, name?: string) => Array<Object>`
   *
   * Parses the setting value string, returning an AST
   *
   * e.g `parse('warn; test=debug')` would yield:
   *
   * [{
   * 	incl: [test],
   * 	excl: [],
   * 	value: 'debug'
   * },{
   *   incl: [*],
   *   excl: [],
   *   value: 'warn'
   * }]`
   *
   * if `debugStyle` is truthy, the setting value string is parsed debug-style
   * and `impliedValue` is used as the value of the setting
   *
   * @param {String} value The setting value string.
   * @param {String} name The name of the setting. Optional.
   *
   * @returns {Array} The parsed setting value objects
   */
  parse: function(value, name) {
    var d = (name == 'debug') && name
    var settings = []
    var items = (value||'').trim().split(';').map(function(x){return x.replace('\\;', ';')})
    // parse `ulog` style settings, include support for `debug` style
    var implied = []
    for (var i=0,item,idx; item=items[i]; i++) {
      var x = ((idx = item.indexOf('=')) == -1)
          ? [item.trim()]
          : [item.substring(0,idx).trim(), item.substring(idx + 1).trim()]
      // ulog: expressions is first param or none if only a setting value is present (implied)
      // debug: expressions is always first and only param
      var expressions = x[1] || d ? x[0].split(/[\s,]+/) : []
      // ulog: setting value is second param, or first if only a value is present (implied)
      // debug: setting value is always implied
      var setting = { value: x[1] || (!d && x[0]) || d, incl: [], excl: [] }
      if (expressions.length) {
        settings.push(setting)
      }
      else {
        expressions.push('*')
        implied.push(setting)
      }
      // add the expressions to the incl/excl lists on the setting
      for (var j=0,s; s=expressions[j]; j++) {
        s = s.replace(/\*/g, '.*?')
        setting[s[0]=='-'?'excl':'incl'].push(new RegExp('^' + s.substr(s[0]=='-'?1:0) + '$'))
      }
    }
    // add implied settings last so they act as defaults
    settings.push.apply(settings, implied)
    return settings
  },

  /**
   * Evaluates the given AST for the given logger name.
   *
   * @param {Array} ast AST
   * @param {String} name Logger name
   *
   * @returns {String} The effective option value for the given logger name
   */
  eval: function(ast, name){
    for (var i=0,s,r; s=ast[i]; i++) {              // for all parts ('info; test=debug' has 2 parts)
      if (excl(s, name)) continue
      if (r = incl(s, name)) return r
    }

    function excl(s, name) {
      for (var j=0,br,excl; excl=s.excl[j]; j++)    // for all exclusion tests
        if (br = excl.test(name)) return br   // if logger matches exclude, return true
    }

    function incl(s, name) {
      for (var j=0,incl; incl=s.incl[j]; j++)  	    // for all inclusion tests
        if (incl.test(name)) return s.value   // if logger matches include, return result
    }
  },
}
