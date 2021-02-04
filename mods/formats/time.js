var formatter = require('../formats/formatter')
var pad = require('../formats/pad')

module.exports = function(ctx, rec){
  return formatter(ctx, rec, { color: 'logger' }, function() {
    var time = new Date()
    return pad(time.getHours().toString(), 2, '0', pad.LEFT) + ':' +
        pad(time.getMinutes().toString(), 2, '0', pad.LEFT)
  })
}