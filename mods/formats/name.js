var pad = require('../formats/pad')

module.exports = function(rec) {
  return pad(rec.name, 22)
}
