self.timings = {
  logWithDebug: function(){
    // found a bug in debug... timings don't actually seem to work when
    // we recreate the logger on each call. at least not in this version.
    // So let's create one logger and use it multiple times...
    var log = debug('timings')
    log('Notice how the timings of the log calls')
    log('are added at the end of the message.')
    log('This gives us some extra insight')
    setTimeout(function(){
      log('in our app\'s performance.')
    }, 256)
  },

  logWithUlog: function(){
    var log = anylogger('timings').debug
    log('Also notice how the timings of the log')
    log('calls are added before the message')
    log('This gives us some extra insight')
    setTimeout(function(){
      log('in our app\'s performance.')
    }, 256)
  },

  logWithLogLevel: function(){

  }
}
