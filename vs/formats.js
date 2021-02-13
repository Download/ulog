self.formats = {
  logWithUlog: function(){
    // we go outside the anylogger api here
    // this code is now tightly coupled to ulog
    // this is why it's better to use external
    // config instead of ulog.get and ulog.set
    // or logger properties as we use here
    // however this is just an example so it's ok
    var log = ulog('formats')
    log.debug('ulog also feautures configurable formatting')
    log.format = 'lvl name time>6'
    log.info('Here we changed the format to include the time')
  }
}