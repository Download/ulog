var grab = require('../../core/grab')

module.exports = function(ulog, callback) {
  var settings = grab(ulog, 'settings', {})
  var cfg = {}
  for (var setting in settings) {
    try {
      var name = settings[setting].config || setting
      if (name in localStorage) cfg[name] = localStorage.getItem(name)
    } catch(ignore){}
  }
  return callback ? callback(cfg) : cfg
}
