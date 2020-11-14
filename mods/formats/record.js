var grab = require('../../core/grab')

/**
 * Records a record for a log call based on the ulog instance, the logger and leven and the call arguments.
 *
 * Collects all record functions from all mods and allows each of them to contribute to the result.
 *
 * @param {} ulog Ulog instance
 * @param {*} logger Logger instance
 * @param {*} level The level of the current call
 * @param {*} args The arguments of the log call
 */
module.exports = function(ulog, logger, level, args){
  var recorders = grab(ulog, 'record', [])
  return recorders.reduce(function(r, record){
    record.call(ulog, logger, level, args, r)
    return r
  }, {})
}
