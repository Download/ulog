import ulog from '../../../core/core.js'

import type { Format } from '../types.js'
import newFormat from '../new-format.js'

const lvl: Format = (ctx, rec) => (newFormat({ ctx, rec,
  props: {
    color: 'level'
  }
}, () => {
  return [' ', 'x', '!', 'i', '-', '>', '}'][(ulog as any).levels[rec.level]]
}))

export default lvl
