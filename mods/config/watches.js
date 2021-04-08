module.exports = function(ulog){
  return ulog.grab('watch', []).map(function(watch){
    var result = {}
    for (var key in watch) {
      key.split(',').forEach(function(name){
        result[name] = watch[key]
      })
    }
    return result
  })
}