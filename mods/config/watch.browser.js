var read = require('./read')
var update = require('./update')
var notify = require('./notify')

module.exports = function(ulog) {
  // storage events unfortunately only fire on events triggered by other windows...
  // so we need to poll here...
  setInterval(function(){
    if (ulog.config) {
      var cfg = read(ulog)
      setTimeout(function(){
        var changed = update(ulog.config, cfg)
        if (changed.length) setTimeout(function(){
          notify(ulog, changed)
        }, 0)
      }, 0)
    }
  }, 350)
}
