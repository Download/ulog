var grab = require('../../core/grab')

module.exports = {
  use: [
    require('../levels'),
  ],

  settings: {
    format: {
      config: 'log_format',
      prop: {
        default: 'simple',
      }
    },
  },

  formats: {
    none: function(){},
    simple: require('./simple'),
    json: require('./json'),
    '*': function(){}
  },

  ext: function(logger) {
    var formats = grab(this, 'formats', {})
    var format = formats[logger.format] || formats['*']
    format.call(this, logger)
  },

  // for structured formats, the default record function
  record: function(logger, level, args, rec) {
    rec.time = new Date()
    rec.name = logger.name
    rec.message = args
    rec.level = logger[level.toUpperCase()]
    rec.levelName = level

    // properties like output, format, level...
    var settings = grab(this, 'settings', {})
    for (var name in settings) {
      if (settings[name].prop) {
        rec['log_' + name] = logger[name]
      }
    }
    rec.logger = logger
  },
}
