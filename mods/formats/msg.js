var formatter = require('./formatter')

module.exports = function(ctx) {
  return formatter(ctx, { color: 'level' }, function(rec){
    return rec.msg
  })
}
