var formatter = require('./formatter')

module.exports = function(ctx, rec){
  return formatter(ctx, rec, { color: 'level' }, function(){
    return [' ', 'x', '!', 'i', '-', '>', '}'][rec.ulog.levels[rec.level]]
  })
}
