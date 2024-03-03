import adapter from './adapter/adapter.js'
import anylogger from 'anylogger'
import ulog from 'ulog'
adapter(anylogger, ulog)

const log = ulog('my:logger')
log.debug('Quick test', 'debug')
log.log('Quick test', 'log')
log.info('Quick test', 'info')
log.warn('Quick test', 'warn')
log.error('Quick test', 'error')

const log2 = ulog('other:logger')
log2.debug('Quick test', 'debug')
log2.log('Quick test', 'log')
log2.info('Quick test', 'info')
log2.warn('Quick test', 'warn')
log2.error('Quick test', 'error')

log2.info('testing timing...')
setTimeout(() => {
  log2.info('timing test done')
}, 20)
