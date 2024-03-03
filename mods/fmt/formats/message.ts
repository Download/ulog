import type { Format, FormatContext } from '../types.js'
import newFormat from '../new-format.js'

const message: Format = (ctx: FormatContext) => newFormat({ ctx,
  props: {
    color: 'level'
  }
}, (rec) => {
    return rec.message
  }
)

export default message
