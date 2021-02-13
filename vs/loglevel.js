self.myloglevel = {
  log: function(){
    // code below is tightly coupled to debug
    var logger = log.createLogger('loglevel')
    logger.info('------------')
    logger.info('| loglevel |')
    logger.info('------------')
  }
}

