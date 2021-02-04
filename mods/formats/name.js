var formatter = require('./formatter')

module.exports = function(ctx, rec) {
  return formatter(ctx, rec, { color: 'logger', padding: 16 }, function(){
    return rec.logger.name
  })
}
