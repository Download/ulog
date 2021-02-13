var grab = require('../../core/grab')

module.exports = {
  extend: {
    settings: {},

   /**
     * `ulog.get(name?: String, ...args): String|Object`
     *
     * Get hook.
     *
     * This method can be used to read settings. When called, it
     * initializes the return value to the value for the setting with `name`
     * and then calls the `get` method on all registered mods, allowing them
     * to modify the result value. Then it returns that result.
     *
     * The first argument to `get` is expected to be the name of the setting
     * to get. Any other arguments are passed on to the `get` methods on
     * registered mods unchanged.
     */
    get: function() {
      var ulog = this
      var args = [].slice.call(arguments)
      var name = args[0]
      if (! name) return ulog.settings
      args.unshift(ulog.settings[name])
      var getters = grab(ulog, 'get', [])
      getters.map(function(get){
        args[0] = get.apply(ulog, args)
      })
      return args[0]
    },

    /**
     * `ulog.set(name, value)`
     *
     * Sets the setting named `name` to the given `value`.
     *
     * E.g. to set the log level for all loggers to 'warn':
     *
     * `ulog.set('log', 'warn')`
     *
     * The `value` may contain a literal value for the setting, or
     * it may contain a semicolon separated list of `expression=value` pairs,
     * where `expression` is a debug-style pattern and `value` is a literal value
     * for the setting. The literal value may not contain any semicolons, or must
     * escape them by preceding them with a backslash: `\;`.
     *
     * E.g. to set the log level for libA to ERROR, for libB to INFO and for
     * all other loggers to WARN:
     *
     * `ulog.set('log', 'libA=error; libB=info; *=warn')`
     *
     * Both forms may be combined:
     *
     * `ulog.set('log', 'warn; libA=error; libB=info')` // same as above
     *
     * The `expression=value` pairs are evaluated in the order they are listed,
     * the first `expression` to match decides which `value` is returned.
     *
     * The `expression` can be a list of patterns and contain wildcards
     * and negations:
     *
     * `ulog.set('log', 'info; lib*,-libC=error; libC=warn')`
     *
     * Because of the expression=value pairs being evaluated in order, the simplest
     * is generally to list specific rules first and general rules later:
     *
     * `ulog.set('log', 'libC=warn; lib*=error; info')` // equivalent to above
     */
    set: function(name, value) {
      var ulog = this
      var changed = ulog.settings[name] !== value
      ulog.settings[name] = value
      grab(ulog, 'set', []).map(function(set){
        set.call(ulog, name, value)
      })
      if (changed) ulog.ext()
    }
  }
}
