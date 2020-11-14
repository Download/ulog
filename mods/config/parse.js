module.exports = function parse(data, regex, replacement, decode) {
  return data.reduce(function(result,value){
    value = value.replace(regex, replacement)
    var i = value.indexOf('=')
    if (i !== -1) {
      var n = value.substring(0, i).replace(/^\s+|\s+$/g, '')
      if (n) {
        var v = value.substring(i + 1).replace(/^\s+|\s+$/g, '')
        if (decode) v = decode(v)
        result[n] = v
      }
    }
    return result
  }, {})
}
