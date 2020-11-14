module.exports = {
  use: [
    require('../props'),
    require('../outputs'),
  ],

  settings: {
    level: {
      config: 'log',
      // level property
      prop: {
        // default value
        default: require('./default.js'),
        // level number from string
        fromStr: function(v) {
          return Number(v) === Number(v) ? Number(v) : v && this[v.toUpperCase()]
        },
        // level number to string
        toStr: function(v) {
          for (var x in this)
            if (this[x] === v) return x.toLowerCase()
          return v
        },
        // property getter extension, called when property on logger is read
        get: function(v, ulog){
          return Math.max(ulog.get('debug', this.name) && this.DEBUG || this.NONE, v)
        },
      },
    }
  },

  ext: function(logger) {
    logger.NONE = 0
    logger.ALL = 9007199254740991 // Number.MAX_SAFE_INTEGER
    logger.levels = ['none']
    for (var name in this.levels) {
      logger[name.toUpperCase()] = this.levels[name]
      logger.levels[this.levels[name]] = name
    }
    logger.enabledFor = function(name){
      return logger.level >= logger[name.toUpperCase()]
    }
    for (var name in this.levels) {
      if (!logger.enabledFor(name)) logger[name] = logger.discard
    }
  },
}
