module.exports = {
  use: [
    require('../props'),
    require('../channels'),
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
    },
  },

  ext: function(logger) {
    logger.NONE = 0
    logger.ALL = 7
    for (var level in this.levels) {
      logger[level.toUpperCase()] = this.levels[level]
    }
    logger.enabledFor = function(level){
      return logger.level >= logger[level.toUpperCase()]
    }
  },
}
