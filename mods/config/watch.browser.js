var read = require('./read')
var update = require('./update')

module.exports = function(ulog) {
  // storage events unfortunately only fire on events triggered by other windows...
  // so we need to poll here...
  setInterval(function(){
    if (ulog.config) {
      var cfg = read(ulog)
      if (update(ulog.config, cfg)) {
        ulog.ext()
      }
    }
  }, 350)
}
