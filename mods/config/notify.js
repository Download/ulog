var watches = require('./watches')

module.exports = function(ulog, changed) {
  ulog.ext()
  var watched = watches(ulog)

  changed.map(function(change){
    return { change: change, watches: watched.filter(function(watch){return typeof watch[change.name] == 'function'}) }
  })
  .filter(function(item){
    return item.watches.length
  })
  .forEach(function(item){
    item.watches.forEach(function(watch) {
      setTimeout(function(){
        watch[item.change.name].call(ulog, item.change)
      },0)
    })
  })
}
