var name = require('./name')
var lvl = require('./lvl')

module.exports = function(logger){
  var loggerName = name(logger)
  for (var level in this.levels) logger[level] = logger[level].bind(logger, lvl({ level: logger[level.toUpperCase()] }), loggerName)
  logger.discard = logger.discard.bind(logger, ' ', loggerName)
}
