import type { Format } from '../types.js'
import newFormat from '../new-format.js'

const name: Format = (ctx, rec) => (newFormat({ ctx, rec,
  props: {
    color: 'logger',
    padding: 16
  }
}, () => {
  return rec.logger.name
}))

export default name
