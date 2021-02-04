var grab = require('../../core/grab')

/**
 * Mod: props
 *
 * Enables properties on loggers that are backed by options on ulog.
 *
 * This mod allows other mods to declare props that will be added on each created logger
 * and that are backed by options on ulog itself. A getter and setter will be created that
 * return the value of the option for that logger, or set (override) the value of that
 * option for that specific logger.
 *
 * When a prop is set directly on a logger, the logger will keep an in-memory setting that
 * overrides the option set on ulog itself. To clear a prop and have it use the global option
 * again, set `undefined` as the value for the prop.
 */
var props = module.exports = {
  use: [
    require('../options'),
  ],

  // // called when a logger needs to be enhanced
  ext: function(logger) {
    var settings = grab(this, 'settings', {})
    for (var name in settings) {
      if (settings[name].prop) {
        props.new.call(this, logger, name, settings[name].prop)
      }
    }
  },


  // contribute props to log records
  record: function(logger, rec) {
    var settings = grab(this, 'settings', {})
    for (var name in settings) {
      if (settings[name].prop) {
        rec['log_' + name] = this.get(name, logger.name)
      }
    }
  },

  /**
   * `new(logger, name, prop)`
   *
   * Creates an option named `name` on the given `logger`, using
   * the provided `prop` whenever applicable.
   *
   * @param {Function} logger The logger function
   * @param {String} name The name of the property to create
   * @param {Object} prop A prop object
   *
   * The `prop` object can have functions `fromStr` and `toStr` that
   * convert from and to String, and `get` and `set` that are called whenever
   * the property is read or written.
   *
   * @returns The given `logger`
   */
  new: function(logger, name, prop) {
    if (name in logger) return logger // already exist
    var ulog=this
    var value // private field
    return Object.defineProperty(logger, prop.name || name, {
      get: function(){
        var v = value !== undefined ? value : ulog.get(name, logger.name)
        v = v !== undefined ? v : prop.default
        v = prop.fromStr ? prop.fromStr.call(logger, v, ulog) : v
        v = prop.get ? prop.get.call(logger, v, ulog) : v
        return v
      },
      set: function(v){
        v = prop.toStr ? prop.toStr.call(logger, v, ulog) : v
        if (value !== v) {
          value = v
          ulog.ext(logger)
        }
        prop.set && prop.set.call(logger, v, ulog)
      }
    })
  }
}