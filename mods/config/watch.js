var fs = require('fs')
var path = require('path')

var read = require('./read')
var update = require('./update')
var notify = require('./notify')

module.exports = function(ulog) {
  var filename = path.resolve(ulog.get('log_config') || 'log.config')
  try {
    fs.watch(filename, { persistent: false }, function() {
      read(ulog, function(cfg){
        var changed = update(ulog.config, cfg)
        if (changed.length) notify(ulog, changed)
      })
    })
  } catch(ignore){}
}
