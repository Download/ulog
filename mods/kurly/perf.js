var pad = require('../formats/pad')

module.exports = function() {
  return function(rec) {
    var result = ''
    if (rec.logger.lastCalled && (rec.time.getTime() - rec.logger.lastCalled.getTime() > 1)) {
      result = '+' + (rec.time.getTime() - rec.logger.lastCalled.getTime()) + 'ms'
    }
    rec.logger.lastCalled = rec.time
    return pad(result, 8)
  }
}
