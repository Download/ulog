self.myulog = {
  log: function(){
    // we use anylogger to create the logger
    // so we stay loosely coupled to ulog
    var log = anylogger('ulog').debug
    log('-----------')
    log('|  ulog   |')
    log('-----------')
  }
}
