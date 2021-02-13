self.myapp = {
  logWithDebug: function(){
    // code below is tightly coupled to debug
    var log = debug('my-app')
    log('Let\'s log some messages with debug!')
    log('With debug, every logger has a name')
    log('and the name is printed in the output.')
  },
  logWithUlog: function(){
    // we use anylogger to create the logger
    // so we stay loosely coupled to ulog
    var log = anylogger('my-app').debug
    log('Let\'s log some messages with ulog!')
    log('With ulog, every logger has a name')
    log('and the name is printed in the output.')
  },
  logWithLogLevel: function(){

  }
}
