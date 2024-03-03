import type { Format } from '../types.js'
import newFormat from '../new-format.js'
import pad from '../pad.js'

const perf: Format = (ctx, rec) => (newFormat({ ctx, rec,
  props: {
    color: 'logger',
    padding: 6,
    direction: pad.LEFT,
  }
}, () => {
  var time = new Date()
  var ms = (rec.logger as any)['_lastCalled']
      ? time.getTime() - (rec.logger as any)['_lastCalled'].getTime()
      : 0
  ;(rec.logger as any)['_lastCalled'] = time

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
}))

export default perf
