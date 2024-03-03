import type { Format } from '../types.js'
import newFormat from '../new-format.js'
import pad from '../pad.js'

const time: Format = (ctx, rec) => (newFormat({ ctx, rec,
  props: {
    color: 'logger'
  }
}, () => {
  var time = new Date()
  return pad(time.getHours().toString(), 2, '0', pad.LEFT) + ':' +
      pad(time.getMinutes().toString(), 2, '0', pad.LEFT)
}))

export default time
