import { BaseLevels } from 'anylogger'
import anylogger from 'anylogger'
import ulog from 'ulog';
import formats from 'ulog/mods/formats'
import kurly from 'ulog/mods/kurly'

const log = anylogger('my-app') as ulog;
log('Logging is easy!')

if (log.level >= log.INFO) {
	log.info('This message will be logged')
}
log.level = log.WARN
log.info('This info message will NOT be logged.')
log.warn('This warning message WILL be logged.')
log.level = log.NONE
log.error('Logging is completely disabled.')

ulog.use({
	outputs: {
		custom: {
			log() {
				var args = [].slice.call(arguments)
				args.shift('Custom!!')
				console.log.apply(console, args)
			}
		}
	},
	use: [formats],
	formats: {
		cool(logger) {
			// will be called on logger creation/extension
			// replace the default log methods with formatters
			// use bind so we leave the call stack intact.
			// only works for static info like our 'Cool!' message
			for (var level in this.levels) {
				const lvl = level as keyof BaseLevels;
				logger[lvl] = logger[lvl].bind(logger, 'Cool!')
			}
			// don't forget to format the method to discard to the drain as well!
			logger.discard = logger.discard.bind(logger, 'Cool!')
		}
	}
})

ulog.use(kurly)
ulog.use({
	formatters: {
		custom(ctx) {
			return function (rec) {
				return 'Custom!'
			}
		}
	}
})