self.colors = {
  logWithDebug: function(){
    // code below is tightly coupled to debug
    var log = debug('colors')
    log('See how different loggers')
    log('get different colors. This ')
    log('makes reading the log output')
    log('much easier.')
  },
  logWithUlog: function(){
    // we use anylogger to create the loggers
    // so we stay loosely coupled to ulog
    var log = anylogger('colors').debug
    log('See how different loggers')
    log('get different colors. This')
    log('makes reading the log output')
    log('much easier.')
  }
}