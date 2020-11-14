var name = require('./name')

module.exports = function(logger){
  var loggerName = name(logger)
  for (var level in this.levels) logger[level] = logger[level].bind(logger, loggerName)
  logger.discard = logger.discard.bind(logger, loggerName)
}
