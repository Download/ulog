var alignment = require('../align/utils')
var hasAlign = alignment.hasAlign

module.exports = function(rec, r){
  var a = hasAlign(rec.logger.channels[rec.channel].out) && rec.logger.align && alignment
  r[0] = ((a && a.specifier && a.specifier[rec.level]) || '') + r[0]
  r.splice.apply(r, [1, 0].concat((a && a.args && a.args[rec.level]) || []))
  return r
}
