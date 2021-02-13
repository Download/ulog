self.levels = {
  logWithUlog: function(){
    // we use anylogger to create the logger
    // so we stay framework independent
    var log = anylogger('levels')
    log.debug('In addition to debug logging, ulog also has levels')
    log.trace('This is a trace message')
    log.debug('This is a debug message')
    log.log('This is a log message')
    log.info('This is an info message')
    log.warn('This is a warning message')
    log.error('This is an error message')
  }
}
