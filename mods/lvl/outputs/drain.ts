import anylogger from 'anylogger'

const log = anylogger('ulog:lvl:drain')

const drain = {
  error(...args: any[]) {
    log.enabledFor('debug') && log.debug('error', ...args)
  },
  warn(...args: any[]) {
    log.enabledFor('debug') && log.debug('warn', ...args)
  },
  info(...args: any[]) {
    log.enabledFor('debug') && log.debug('info', ...args)
  },
  log(...args: any[]) {
    log.enabledFor('debug') && log.debug('log', ...args)
  },
  debug(...args: any[]) {
    log.enabledFor('debug') && log.debug('debug', ...args)
  },
  trace(...args: any[]) {
    log.enabledFor('debug') && log.debug('trace', ...args)
  }
}

export default drain
