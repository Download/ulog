var record = require('./record')

/**
 * Creates a format function based on a structured formatter
 *
 * The structured formatter function can be any function that accepts an object
 * as a parameter and returns the thing to be logged. If the result of the call
 * to the structured formatting function is not an array, it will be wrapped in
 * one. The resulting array will be used as the final arguments in the log call
 *
 * @param {*} formatter The structured formatter function
 */
module.exports = function(ulog, logger, formatter){
  var format = function(level, fn){
    return function(){
      var args = [].slice.call(arguments)
      var rec = record(ulog, logger, level, args)
      args = formatter(rec)
      if (! Array.isArray(args)) args = [args]
      fn.apply(logger, args)
    }
  }
  for (var level in ulog.levels) logger[level] = format.call(ulog, level, logger[level])
  logger.discard = format.call(ulog, level, logger.discard)
}
