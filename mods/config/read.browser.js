
var configure = require('./configure')
var watched = require('./watched')

module.exports = function(ulog, callback) {
  var watches = watched(ulog)

  var cfg = {}
  for (var name in watches) {
    try {
      var value = localStorage.getItem(name)
      if (value) cfg[name] = value
    } catch(ignore){}
  }

  cfg = configure(watches, cfg)
  return callback ? callback(cfg) : cfg
}
