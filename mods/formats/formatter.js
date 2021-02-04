var pad = require('./pad')

module.exports = function formatter(ctx, rec, props, fn) {
  if (! fn) {fn = props; props = rec; rec = undefined}
  var dir = props.dir === pad.LEFT ? pad.LEFT : pad.RIGHT, padding = props.padding || 0
  ctx.text && ctx.text.split(':').forEach(function(text){
    if (text[0] == '>') dir = pad.LEFT
    if (text[0] == '<') dir = pad.RIGHT
    text = (text[0] == '>') || (text[0] == '<') ? text.substring(1) : text
    if (Number(text) && (Number(text) === Number(text))) padding = Number(text)
  })
  var fmt = function(rec) {
    var result = fn(rec)
    if (Array.isArray(result) && (result.length == 1) && (typeof result[0] == 'string'))
    result = result[0]
    if (padding && (typeof result == 'string')) result = pad(result, padding, ' ', dir)
    return result
  }
  var result = rec ? function() {return fmt(rec)} : function(rec){return fmt(rec)}
  for (var prop in props) {
    result[prop] = props[prop]
  }
  return result
}
