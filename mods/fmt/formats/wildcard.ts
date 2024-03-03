import type { Format } from '../types.js'
import newFormat from '../new-format.js'

const wildcard: Format = (ctx, rec) => (newFormat({ ctx, rec,
  props: {
    color: 'level'
  }
}, () => {
  return ctx.name in rec ? rec[ctx.name] : ctx.name + (ctx.text ? ctx.text : '')
}))

export default wildcard
