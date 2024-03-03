import {
  isStaticFunction,
  type DynamicFormatRecord,
  type NewFormat
} from './types.js'
import pad from './pad.js'

const newFormat: NewFormat = ({ ctx, rec, props }, fn) => {
  var dir = props.direction === pad.LEFT ? pad.LEFT : pad.RIGHT
  var padding = props.padding || 0
  ctx.text && ctx.text.split(':').forEach(function(text: any){
    if (text[0] == '>') dir = pad.LEFT
    if (text[0] == '<') dir = pad.RIGHT
    text = (text[0] == '>') || (text[0] == '<') ? text.substring(1) : text
    if (Number(text) && (Number(text) === Number(text))) padding = Number(text)
  })
  const result = isStaticFunction(fn)
    ? () => {
        var result = fn()
        if (Array.isArray(result) && (result.length == 1) && (typeof result[0] == 'string'))
        result = result[0]
        if (padding && (typeof result == 'string')) result = pad(result, padding, ' ', dir)
        return result
      }
    : (rec: DynamicFormatRecord) => {
        var result = fn(rec)
        if (Array.isArray(result) && (result.length == 1) && (typeof result[0] == 'string'))
        result = result[0]
        if (padding && (typeof result == 'string')) result = pad(result, padding, ' ', dir)
        return result
      }
  // copy props to the result
  return Object.assign(result, props);
}

export default newFormat
