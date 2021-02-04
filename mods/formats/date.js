var formatter = require('../formats/formatter')
var pad = require('../formats/pad')

module.exports = function(ctx, rec){
  return formatter(ctx, rec, { color: 'logger' }, function() {
    var time = new Date()
    return time.getFullYear() + '/' +
        pad(time.getMonth().toString(), 2, '0', pad.LEFT) + '/' +
        pad(time.getDate().toString(), 2, '0', pad.LEFT)
  })
}