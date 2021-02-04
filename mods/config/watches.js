var grab = require('../../core/grab')

module.exports = function(ulog){
  return grab(ulog, 'watch', []).map(function(watch){
    var result = {}
    for (var key in watch) {
      key.split(',').forEach(function(name){
        result[name] = watch[key]
      })
    }
    return result
  })
}