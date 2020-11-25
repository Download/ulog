var read = require('./read')
var update = require('./update')

module.exports = function(ulog) {
  if (typeof importScripts === 'function') {
    // we are in a worker... listen to config messages from the main window
    addEventListener('message', function(evt){
      if ((typeof evt.data == 'object') && (evt.data.cmd == 'ulog:config')) {
        ulog.config = evt.data.cfg
        ulog.ext()
      }
    })
  } else {
    // dispatch the current config to workers
    dispatch(ulog.config)
    // storage events unfortunately only fire on events triggered by other windows...
    // so we need to poll here...
    setInterval(function(){
      if (ulog.config) {
        var cfg = read(ulog)
        if (update(ulog.config, cfg)) {
          ulog.ext()
          dispatch(cfg)
        }
      }
    }, 350)
  }
}

// dispatch to workers
function dispatch(cfg) {
  navigator.serviceWorker.getRegistrations().then(function(registrations){
    registrations.forEach(function(reg){
      reg.active && reg.active.postMessage({ cmd: 'ulog:config', cfg:cfg })
    })
  })
}
