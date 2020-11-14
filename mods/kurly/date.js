var pad = require('../formats/pad')

module.exports = function(){
  return function(rec) {
    return rec.time.getFullYear() + '/' +
        pad(rec.time.getMonth().toString(), 2, '0', pad.LEFT) + '/' +
        pad(rec.time.getDate().toString(), 2, '0', pad.LEFT)
  }
}