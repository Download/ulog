var pad = require('../formats/pad')

module.exports = function(){
  return function(rec) {
    return pad(rec.time.getHours().toString(), 2, '0', pad.LEFT) + ':' +
        pad(rec.time.getMinutes().toString(), 2, '0', pad.LEFT)
  }
}