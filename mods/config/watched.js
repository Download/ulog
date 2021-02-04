var grab = require('../../core/grab')
var watches = require('./watches')

module.exports = function(ulog){
  var settings = grab(ulog, 'settings', {})
  var watchers = watches(ulog)
  var watched = {}
  watchers.forEach(function(watcher){
    for (var name in watcher) {
      watched[name] = watchers[name]
    }
  })
  for (var setting in settings) {
    var name = (settings[setting] && settings[setting].config) || setting
    watched[name] = settings[setting]
  }
  return watched
}
