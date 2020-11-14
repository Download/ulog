var fs = require('fs')
var path = require('path')

var read = require('./read')
var update = require('./update')

module.exports = function(ulog) {
  var filename = path.resolve(ulog.get('log_config') || 'log.config')
  try {
    fs.watch(filename, { persistent: false }, function() {
      read(ulog, function(cfg){
        if (update(ulog.config, cfg)) ulog.ext()
      })
    })
    // debounce(100,     )
  } catch(ignore){}
}

function debounce(ms, callback) {
  var wait
  return function() {
    if (wait) clearTimeout(wait)
    var args = arguments
    wait = setTimeout(function(){
      wait = null
      callback.apply(null, args)
    }, ms)
  }
}
