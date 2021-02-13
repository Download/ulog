self.myTest = {
  log: function() {
    var log = anylogger('test')
    log.info('This is a test')
    log.info('Notice, how the filename and line numbers')
    log.info('shown in the browser are correct.')
  }
}