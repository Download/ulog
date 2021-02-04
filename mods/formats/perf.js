var formatter = require('./formatter')

module.exports = function(ctx, rec) {
  return formatter(ctx, rec, { color: 'logger', padding: 6, dir: 1 }, function(){
    var time = new Date()
    rec.logger.lastCalled = rec.logger.lastCalled || time
    var ms = time.getTime() - rec.logger.lastCalled.getTime()
    rec.logger.lastCalled = time
    return (
      ms >= 36000000 ?  (ms/3600000).toFixed(1) + 'h' :
      ms >=   600000 ?    (ms/60000).toFixed(ms >= 6000000 ? 1 : 2) + 'm' :
      ms >=    10000 ?     (ms/1000).toFixed(ms >=  100000 ? 1 : 2) + 's' :
      // a one-ms diff is bound to occur at some point,
      // but it doesn't really mean anything as it's
      // basically just the next clock tick, so only
      // show values > 1
      ms >        1 ?                      ms + 'ms' :
      ''
    )
  })
}
