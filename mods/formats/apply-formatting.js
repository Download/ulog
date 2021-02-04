var console = require('../channels/console')
var hasColor = require('../colors/utils').hasColor
var colorSpecifier = require('../colors/utils').colorSpecifier
var colorArgument = require('../colors/utils').colorArgument
var colorSpecifierAfter = require('../colors/utils').colorSpecifierAfter

module.exports = function(rec, fmt, msg, r){
  var out = rec.logger.channels[rec.channel].out
  if (out === console) {
    var colored = hasColor(out)
    var c = colored && rec.logger.colored && fmt.color
    c = c == 'level' ? rec.logger.colors.levels[rec.level] : c
    c = c == 'logger' ? rec.logger.color : c
    r[0] += (c && colorSpecifier(c)) || ''
    var len = Array.isArray(msg) ? msg.length : 1
    for (var i=0; i<len; i++) {
      var m = Array.isArray(msg) ? msg[i] : msg
      r[0] += fmt.specifier || (typeof m == 'object' ? '%O ' : '%s ')
    }
    r[0] += (c && colorSpecifierAfter(c)) || ''
    r.push.apply(r, (c && colorArgument(c)) || [])
  }
  r.push.apply(r, Array.isArray(msg) ? msg : [ msg ])
  return r
}
