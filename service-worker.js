
importScripts('full.min.js')

var log = anylogger('ulog:tutorial:serviceworker')

addEventListener('message', function(evt){
  if ((typeof evt.data == 'object') && (evt.data.cmd == 'ulog:log')) {
    for (var level in ulog.levels) {
      if ((evt.data.level == level) || (evt.data.level == 'all'))
        log[level](evt.data.message)
    }
  }
}, {passive:true})