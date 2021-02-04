var formatter = require('./formatter')

module.exports = function(ctx, rec) {
  return formatter(ctx, rec, { color: 'level' }, function() {
    return ctx.name in rec ? rec[ctx.name] : ctx.name + (ctx.text ? ctx.text : '')
  })
}