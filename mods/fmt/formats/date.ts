import type { Format } from '../types.js'
import newFormat from '../new-format.js'
import pad from '../pad.js'

const date: Format = (ctx, rec) => (newFormat({ ctx, rec,
  props: {
    color: 'logger'
  }
}, () => {
  var time = new Date()
  return time.getFullYear() + '/' +
      pad(time.getMonth().toString(), 2, '0', pad.LEFT) + '/' +
      pad(time.getDate().toString(), 2, '0', pad.LEFT)
}))

export default date
