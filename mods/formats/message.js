var formatter = require('../formats/formatter')

module.exports = function(ctx) {
  return formatter(ctx, { color: 'level' }, function(rec){
    return rec.message
  })
}
