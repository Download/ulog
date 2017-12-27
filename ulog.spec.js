var expect = require('chai').expect
var sinon = require('sinon')


function nop(){}
var testConsole = {
	error: sinon.spy(nop), //console.error.bind(console)),
	warn: sinon.spy(nop), //console.warn.bind(console)),
	info: sinon.spy(nop), //console.info.bind(console)),
	log: sinon.spy(nop), //console.log.bind(console)),
	debug: sinon.spy(nop), //console.log.bind(console)),
	trace: sinon.spy(nop), //console.trace.bind(console)),
	reset: function(){
		testConsole.error.reset()
		testConsole.warn.reset()
		testConsole.info.reset()
		testConsole.log.reset()
		testConsole.debug.reset()
		testConsole.trace.reset()
	}
}

var log = require('./')
var oldLevel = log.level
log.con = function(){return testConsole}
log.level = log.level // trigger patch, so testConsole is used

var named = require('./')('my-module-name')
var oldNamed = named.level

describe('var log = require(\'ulog\')', function(){
	it('yields a function `log`', function(){
		expect(log).to.be.a('function')
	})
})

describe('log', function(){
	it('implements the Console API', function(){
		expect(log).to.have.a.property('error')
		expect(log.error).to.be.a('function')
		expect(log).to.have.a.property('warn')
		expect(log.warn).to.be.a('function')
		expect(log).to.have.a.property('info')
		expect(log.info).to.be.a('function')
		expect(log).to.have.a.property('log')
		expect(log.log).to.be.a('function')
		expect(log).to.have.a.property('trace')
		expect(log.trace).to.be.a('function')
		expect(log).to.have.a.property('dir')
		expect(log.dir).to.be.a('function')
		expect(log).to.have.a.property('time')
		expect(log.time).to.be.a('function')
		expect(log).to.have.a.property('timeEnd')
		expect(log.timeEnd).to.be.a('function')
		expect(log).to.have.a.property('assert')
		expect(log.assert).to.be.a('function')
	})

	it('has a method `assert` that does not throw', function(){
		expect(function(){log.assert(false, 'assert does not throw')}).to.not.throw()
	})

	it('has an additional logging method named `debug`', function(){
		expect(log).to.have.a.property('debug')
		expect(log.debug).to.be.a('function')
	})

	it('can log messages using methods `error`, `warn`, `info`, `log`, `debug` and `trace`', function(){
		testConsole.reset()
		log.level = log.INFO
		try {
			expect(log.level).to.equal(log.INFO)
			expect(testConsole.error.callCount).to.equal(0)
			log.error('Message logged with log.error')
			expect(testConsole.error.callCount).to.equal(1)

			log.warn('Message logged with log.warn')
			expect(testConsole.warn.callCount).to.equal(1)

			log.info('Message logged with log.info')
			expect(testConsole.info.callCount).to.equal(1)

			log.log('Message logged with log.log')
			expect(testConsole.log.callCount).to.equal(0) // below log level

			log.debug('Message logged with log.debug')
			expect(testConsole.debug.callCount).to.equal(0) // below log level

			log.trace('Message logged with log.trace')
			expect(testConsole.trace.callCount).to.equal(0) // below log level
		} finally {
			log.level = oldLevel
			testConsole.reset()
		}
	})

	it('has constants for the log levels `ERROR`, `WARN`, `INFO`, `LOG`, `DEBUG` and `TRACE`', function(){
		expect(log).to.have.a.property('ERROR')
		expect(log.ERROR).to.equal(1)
		expect(log).to.have.a.property('WARN')
		expect(log.WARN).to.equal(2)
		expect(log).to.have.a.property('INFO')
		expect(log.INFO).to.equal(3)
		expect(log).to.have.a.property('LOG')
		expect(log.LOG).to.equal(4)
		expect(log).to.have.a.property('DEBUG')
		expect(log.DEBUG).to.equal(5)
		expect(log).to.have.a.property('TRACE')
		expect(log.TRACE).to.equal(6)
	})

	it('has an additional constant for the special log level `NONE`, which suppresses all logging', function(){
		expect(log).to.have.a.property('NONE')
		expect(log.NONE).to.equal(0)
	})

	it('has a property `level`', function(){
		expect(log).to.have.a.property('level')
	})

	it('`level` can be assigned a different logging level', function(){
		testConsole.reset()
		try {
			log.level = log.ERROR
			expect(log.level).to.equal(log.ERROR)
			log.error('Message logged with log.error, after level was set to ERROR')
			expect(testConsole.error.callCount).to.equal(1)
			log.warn('Message logged with log.warn, after level was set to ERROR')
			expect(testConsole.warn.callCount).to.equal(0)
			log.info('Message logged with log.info, after level was set to ERROR')
			expect(testConsole.info.callCount).to.equal(0)
			log.log('Message logged with log.log, after level was set to ERROR')
			expect(testConsole.log.callCount).to.equal(0)
			log.debug('Message logged with log.debug, after level was set to ERROR')
			expect(testConsole.debug.callCount).to.equal(0)
			log.trace('Message logged with log.trace, after level was set to ERROR')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			log.level = log.WARN
			expect(log.level).to.equal(log.WARN)
			log.error('Message logged with log.error, after level was set to WARN')
			expect(testConsole.error.callCount).to.equal(1)
			log.warn('Message logged with log.warn, after level was set to WARN')
			expect(testConsole.warn.callCount).to.equal(1)
			log.info('Message logged with log.info, after level was set to WARN')
			expect(testConsole.info.callCount).to.equal(0)
			log.log('Message logged with log.log, after level was set to WARN')
			expect(testConsole.log.callCount).to.equal(0)
			log.debug('Message logged with log.debug, after level was set to WARN')
			expect(testConsole.debug.callCount).to.equal(0)
			log.trace('Message logged with log.trace, after level was set to WARN')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			log.level = log.INFO
			expect(log.level).to.equal(log.INFO)
			log.error('Message logged with log.error, after level was set to INFO')
			expect(testConsole.error.callCount).to.equal(1)
			log.warn('Message logged with log.warn, after level was set to INFO')
			expect(testConsole.warn.callCount).to.equal(1)
			log.info('Message logged with log.info, after level was set to INFO')
			expect(testConsole.info.callCount).to.equal(1)
			log.log('Message logged with log.log, after level was set to INFO')
			expect(testConsole.log.callCount).to.equal(0)
			log.debug('Message logged with log.debug, after level was set to INFO')
			expect(testConsole.debug.callCount).to.equal(0)
			log.trace('Message logged with log.trace, after level was set to INFO')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			log.level = log.LOG
			expect(log.level).to.equal(log.LOG)
			log.error('Message logged with log.error, after level was set to LOG')
			expect(testConsole.error.callCount).to.equal(1)
			log.warn('Message logged with log.warn, after level was set to LOG')
			expect(testConsole.warn.callCount).to.equal(1)
			log.info('Message logged with log.info, after level was set to LOG')
			expect(testConsole.info.callCount).to.equal(1)
			log.log('Message logged with log.log, after level was set to LOG')
			expect(testConsole.log.callCount).to.equal(1)
			log.debug('Message logged with log.debug, after level was set to LOG')
			expect(testConsole.debug.callCount).to.equal(0)
			log.trace('Message logged with log.trace, after level was set to LOG')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			log.level = log.DEBUG
			expect(log.level).to.equal(log.DEBUG)
			log.error('Message logged with log.error, after level was set to DEBUG')
			expect(testConsole.error.callCount).to.equal(1)
			log.warn('Message logged with log.warn, after level was set to DEBUG')
			expect(testConsole.warn.callCount).to.equal(1)
			log.info('Message logged with log.info, after level was set to DEBUG')
			expect(testConsole.info.callCount).to.equal(1)
			log.log('Message logged with log.log, after level was set to DEBUG')
			expect(testConsole.log.callCount).to.equal(1)
			log.debug('Message logged with log.debug, after level was set to DEBUG')
			expect(testConsole.debug.callCount).to.equal(1)
			log.trace('Message logged with log.trace, after level was set to DEBUG')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			log.level = log.TRACE
			expect(log.level).to.equal(log.TRACE)
			log.error('Message logged with log.error, after level was set to TRACE')
			expect(testConsole.error.callCount).to.equal(1)
			log.warn('Message logged with log.warn, after level was set to TRACE')
			expect(testConsole.warn.callCount).to.equal(1)
			log.info('Message logged with log.info, after level was set to TRACE')
			expect(testConsole.info.callCount).to.equal(1)
			log.log('Message logged with log.log, after level was set to TRACE')
			expect(testConsole.log.callCount).to.equal(1)
			log.debug('Message logged with log.debug, after level was set to TRACE')
			expect(testConsole.debug.callCount).to.equal(1)
			log.trace('Message logged with log.trace, after level was set to TRACE')
			expect(testConsole.trace.callCount).to.equal(1)
			testConsole.reset()
			log.level = log.NONE
			expect(log.level).to.equal(log.NONE)
			log.error('Message logged with log.error, after level was set to NONE')
			expect(testConsole.error.callCount).to.equal(0)
			log.warn('Message logged with log.warn, after level was set to NONE')
			expect(testConsole.warn.callCount).to.equal(0)
			log.info('Message logged with log.info, after level was set to NONE')
			expect(testConsole.info.callCount).to.equal(0)
			log.log('Message logged with log.log, after level was set to NONE')
			expect(testConsole.log.callCount).to.equal(0)
			log.debug('Message logged with log.debug, after level was set to NONE')
			expect(testConsole.debug.callCount).to.equal(0)
			log.trace('Message logged with log.trace, after level was set to NONE')
			expect(testConsole.trace.callCount).to.equal(0)
		} finally {
			log.level = oldLevel
			testConsole.reset()
		}
	})

	it('has a method `enabled`', function(){
		expect(log).to.have.a.property('enabled')
		expect(log.enabled).to.be.a('function')
	})

	it('has a method `enable`', function(){
		expect(log).to.have.a.property('enable')
		expect(log.enable).to.be.a('function')
	})

	it('has a method `disable`', function(){
		expect(log).to.have.a.property('disable')
		expect(log.disable).to.be.a('function')
	})
})

describe('var log = require(\'ulog\')(\'my-module-name\')', function(){
	it('yields a named log function', function(){
		expect(named).to.be.a('function')
		expect(named).to.have.a.property('name')
		expect(named.name).to.equal('my-module-name')
	})

	it('logs a message at level DEBUG when called', function(){
		testConsole.reset()
		try {
			named.level = named.DEBUG
			expect(named.level).to.equal(named.DEBUG)
			expect(testConsole.debug.callCount).to.equal(0)
			named('Message logged after level was set to DEBUG')
			expect(testConsole.debug.callCount).to.equal(1)
		} finally {
			named.level = oldNamed
			testConsole.reset()
		}
	})

	it('logs at the given level when given multiple arguments and first argument is a level string', function(){
		testConsole.reset()
		try {
			named.level = named.DEBUG
			expect(named.level).to.equal(named.DEBUG)
			expect(testConsole.info.callCount).to.equal(0)
			named('info', 'Message logged at level INFO after level was set to DEBUG')
			expect(testConsole.info.callCount).to.equal(1)
		} finally {
			named.level = oldNamed
			testConsole.reset()
		}
	})
})

describe('log (named)', function(){
	it('implements the Console API', function(){
		expect(named).to.have.a.property('error')
		expect(named.error).to.be.a('function')
		expect(named).to.have.a.property('warn')
		expect(named.warn).to.be.a('function')
		expect(named).to.have.a.property('info')
		expect(named.info).to.be.a('function')
		expect(named).to.have.a.property('log')
		expect(named.log).to.be.a('function')
		expect(named).to.have.a.property('trace')
		expect(named.trace).to.be.a('function')
		expect(named).to.have.a.property('dir')
		expect(named.dir).to.be.a('function')
		expect(named).to.have.a.property('time')
		expect(named.time).to.be.a('function')
		expect(named).to.have.a.property('timeEnd')
		expect(named.timeEnd).to.be.a('function')
		expect(named).to.have.a.property('assert')
		expect(named.assert).to.be.a('function')
	})

	it('has a method `assert` that does not throw', function(){
		expect(function(){named.assert(false, 'assert does not throw')}).to.not.throw()
	})

	it('has an additional logging method named `debug`', function(){
		expect(named).to.have.a.property('debug')
		expect(named.debug).to.be.a('function')
	})

	it('can log messages using methods `error`, `warn`, `info`, `log`, `debug` and `trace`', function(){
		testConsole.reset()
		try {
			named.level = named.TRACE
			named.error('Message logged with log.error')
			expect(testConsole.error.callCount).to.equal(1)
			named.warn('Message logged with log.warn')
			expect(testConsole.warn.callCount).to.equal(1)
			named.info('Message logged with log.info')
			expect(testConsole.info.callCount).to.equal(1)
			named.log('Message logged with log.log')
			expect(testConsole.log.callCount).to.equal(1)
			named.debug('Message logged with log.debug')
			expect(testConsole.debug.callCount).to.equal(1)
			named.trace('Message logged with log.trace')
			expect(testConsole.trace.callCount).to.equal(1)
		} finally {
			named.level = oldNamed
			testConsole.reset()
		}
	})

	it('has constants for the log levels `ERROR`, `WARN`, `INFO`, `LOG`, `DEBUG` and `TRACE`', function(){
		expect(named).to.have.a.property('ERROR')
		expect(named.ERROR).to.equal(1)
		expect(named).to.have.a.property('WARN')
		expect(named.WARN).to.equal(2)
		expect(named).to.have.a.property('INFO')
		expect(named.INFO).to.equal(3)
		expect(named).to.have.a.property('LOG')
		expect(named.LOG).to.equal(4)
		expect(named).to.have.a.property('DEBUG')
		expect(named.DEBUG).to.equal(5)
		expect(named).to.have.a.property('TRACE')
		expect(named.TRACE).to.equal(6)
	})

	it('has an additional constant for the special log level `NONE`, which suppresses all logging', function(){
		expect(named).to.have.a.property('NONE')
		expect(named.NONE).to.equal(0)
	})

	it('has a property `level`', function(){
		expect(named).to.have.a.property('level')
	})

	it('`level` defaults to the global log level', function(){
		expect(named.level).to.equal(log.level)
	})

	it('`level` can be assigned a different logging level', function(){
		testConsole.reset()
		try {
			log.level = log.INFO
			named.level = log.ERROR
			expect(named.level).to.equal(log.ERROR)
			named.error('Message logged with named.error, after named.level was set to ERROR')
			expect(testConsole.error.callCount).to.equal(1)
			named.warn('Message logged with named.warn, after named.level was set to ERROR')
			expect(testConsole.warn.callCount).to.equal(0)
			named.info('Message logged with named.info, after named.level was set to ERROR')
			expect(testConsole.info.callCount).to.equal(0)
			named.log('Message logged with named.log, after named.level was set to ERROR')
			expect(testConsole.log.callCount).to.equal(0)
			named.debug('Message logged with named.debug, after named.level was set to ERROR')
			expect(testConsole.debug.callCount).to.equal(0)
			named.trace('Message logged with named.trace, after named.level was set to ERROR')
			expect(testConsole.trace.callCount).to.equal(0)
			log.error('Message logged with log.error, after named.level was set to ERROR')
			expect(testConsole.error.callCount).to.equal(2)
			log.warn('Message logged with log.warn, after named.level was set to ERROR')
			expect(testConsole.warn.callCount).to.equal(1)
			log.info('Message logged with log.info, after named.level was set to ERROR')
			expect(testConsole.info.callCount).to.equal(1)
			log.log('Message logged with log.log, after named.level was set to ERROR')
			expect(testConsole.log.callCount).to.equal(0)
			log.debug('Message logged with log.debug, after named.level was set to ERROR')
			expect(testConsole.debug.callCount).to.equal(0)
			log.trace('Message logged with log.trace, after named.level was set to ERROR')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			named.level = log.WARN
			expect(named.level).to.equal(log.WARN)
			named.error('Message logged with named.error, after named.level was set to WARN')
			expect(testConsole.error.callCount).to.equal(1)
			named.warn('Message logged with named.warn, after named.level was set to WARN')
			expect(testConsole.warn.callCount).to.equal(1)
			named.info('Message logged with named.info, after named.level was set to WARN')
			expect(testConsole.info.callCount).to.equal(0)
			named.log('Message logged with named.log, after named.level was set to WARN')
			expect(testConsole.log.callCount).to.equal(0)
			named.debug('Message logged with named.debug, after named.level was set to WARN')
			expect(testConsole.debug.callCount).to.equal(0)
			named.trace('Message logged with named.trace, after named.level was set to WARN')
			expect(testConsole.trace.callCount).to.equal(0)
			log.error('Message logged with log.error, after named.level was set to WARN')
			expect(testConsole.error.callCount).to.equal(2)
			log.warn('Message logged with log.warn, after named.level was set to WARN')
			expect(testConsole.warn.callCount).to.equal(2)
			log.info('Message logged with log.info, after named.level was set to WARN')
			expect(testConsole.info.callCount).to.equal(1)
			log.log('Message logged with log.log, after named.level was set to WARN')
			expect(testConsole.log.callCount).to.equal(0)
			log.debug('Message logged with log.debug, after named.level was set to WARN')
			expect(testConsole.debug.callCount).to.equal(0)
			log.trace('Message logged with log.trace, after named.level was set to WARN')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			named.level = log.INFO
			expect(named.level).to.equal(log.INFO)
			named.error('Message logged with named.error, after named.level was set to INFO')
			expect(testConsole.error.callCount).to.equal(1)
			named.warn('Message logged with named.warn, after named.level was set to INFO')
			expect(testConsole.warn.callCount).to.equal(1)
			named.info('Message logged with named.info, after named.level was set to INFO')
			expect(testConsole.info.callCount).to.equal(1)
			named.log('Message logged with named.log, after named.level was set to INFO')
			expect(testConsole.log.callCount).to.equal(0)
			named.debug('Message logged with named.debug, after named.level was set to INFO')
			expect(testConsole.debug.callCount).to.equal(0)
			named.trace('Message logged with named.trace, after named.level was set to INFO')
			expect(testConsole.trace.callCount).to.equal(0)
			log.error('Message logged with log.error, after named.level was set to INFO')
			expect(testConsole.error.callCount).to.equal(2)
			log.warn('Message logged with log.warn, after named.level was set to INFO')
			expect(testConsole.warn.callCount).to.equal(2)
			log.info('Message logged with log.info, after named.level was set to INFO')
			expect(testConsole.info.callCount).to.equal(2)
			log.log('Message logged with log.log, after named.level was set to INFO')
			expect(testConsole.log.callCount).to.equal(0)
			log.debug('Message logged with log.debug, after named.level was set to INFO')
			expect(testConsole.debug.callCount).to.equal(0)
			log.trace('Message logged with log.trace, after named.level was set to INFO')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			log.level = log.DEBUG
			named.level = log.INFO
			expect(named.level).to.equal(log.INFO)
			named.error('Message logged with named.error, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.error.callCount).to.equal(1)
			named.warn('Message logged with named.warn, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.warn.callCount).to.equal(1)
			named.info('Message logged with named.info, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.info.callCount).to.equal(1)
			named.log('Message logged with named.log, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.log.callCount).to.equal(0)
			named.debug('Message logged with named.debug, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.debug.callCount).to.equal(0)
			named.trace('Message logged with named.trace, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.trace.callCount).to.equal(0)
			log.error('Message logged with log.error, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.error.callCount).to.equal(2)
			log.warn('Message logged with log.warn, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.warn.callCount).to.equal(2)
			log.info('Message logged with log.info, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.info.callCount).to.equal(2)
			log.log('Message logged with log.log, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.log.callCount).to.equal(1)
			log.debug('Message logged with log.debug, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.debug.callCount).to.equal(1)
			log.trace('Message logged with log.trace, after named.level was set to LOG and log.level was set to DEBUG')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			named.level = log.DEBUG
			expect(named.level).to.equal(log.DEBUG)
			named.error('Message logged with named.error, after named.level was set to DEBUG')
			expect(testConsole.error.callCount).to.equal(1)
			named.warn('Message logged with named.warn, after named.level was set to DEBUG')
			expect(testConsole.warn.callCount).to.equal(1)
			named.info('Message logged with named.info, after named.level was set to DEBUG')
			expect(testConsole.info.callCount).to.equal(1)
			named.log('Message logged with named.log, after named.level was set to DEBUG')
			expect(testConsole.log.callCount).to.equal(1)
			named.debug('Message logged with named.debug, after named.level was set to DEBUG')
			expect(testConsole.debug.callCount).to.equal(1)
			named.trace('Message logged with named.trace, after named.level was set to DEBUG')
			expect(testConsole.trace.callCount).to.equal(0)
			log.error('Message logged with log.error, after named.level was set to DEBUG')
			expect(testConsole.error.callCount).to.equal(2)
			log.warn('Message logged with log.warn, after named.level was set to DEBUG')
			expect(testConsole.warn.callCount).to.equal(2)
			log.info('Message logged with log.info, after named.level was set to DEBUG')
			expect(testConsole.info.callCount).to.equal(2)
			log.log('Message logged with log.log, after named.level was set to DEBUG')
			expect(testConsole.log.callCount).to.equal(2)
			log.debug('Message logged with log.debug, after named.level was set to DEBUG')
			expect(testConsole.debug.callCount).to.equal(2)
			log.trace('Message logged with log.trace, after named.level was set to DEBUG')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			named.level = log.TRACE
			expect(named.level).to.equal(log.TRACE)
			named.error('Message logged with named.error, after named.level was set to TRACE')
			expect(testConsole.error.callCount).to.equal(1)
			named.warn('Message logged with named.warn, after named.level was set to TRACE')
			expect(testConsole.warn.callCount).to.equal(1)
			named.info('Message logged with named.info, after named.level was set to TRACE')
			expect(testConsole.info.callCount).to.equal(1)
			named.log('Message logged with named.log, after named.level was set to TRACE')
			expect(testConsole.log.callCount).to.equal(1)
			named.debug('Message logged with named.debug, after named.level was set to TRACE')
			expect(testConsole.debug.callCount).to.equal(1)
			named.trace('Message logged with named.trace, after named.level was set to TRACE')
			expect(testConsole.trace.callCount).to.equal(1)
			testConsole.reset()
			log.error('Message logged with log.error, after named.level was set to TRACE')
			expect(testConsole.error.callCount).to.equal(1)
			log.warn('Message logged with log.warn, after named.level was set to TRACE')
			expect(testConsole.warn.callCount).to.equal(1)
			log.info('Message logged with log.info, after named.level was set to TRACE')
			expect(testConsole.info.callCount).to.equal(1)
			log.log('Message logged with log.log, after named.level was set to TRACE')
			expect(testConsole.log.callCount).to.equal(1)
			log.debug('Message logged with log.debug, after named.level was set to TRACE')
			expect(testConsole.debug.callCount).to.equal(1)
			log.trace('Message logged with log.trace, after named.level was set to TRACE')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			named.level = log.NONE
			expect(named.level).to.equal(log.NONE)
			expect(log.level).to.equal(log.DEBUG)
			named.error('Message logged with named.error, after named.level was set to NONE')
			expect(testConsole.error.callCount).to.equal(0)
			named.warn('Message logged with named.warn, after named.level was set to NONE')
			expect(testConsole.warn.callCount).to.equal(0)
			named.info('Message logged with named.info, after named.level was set to NONE')
			expect(testConsole.info.callCount).to.equal(0)
			named.log('Message logged with named.log, after named.level was set to NONE')
			expect(testConsole.log.callCount).to.equal(0)
			named.debug('Message logged with named.debug, after named.level was set to NONE')
			expect(testConsole.debug.callCount).to.equal(0)
			named.trace('Message logged with named.trace, after named.level was set to NONE')
			expect(testConsole.trace.callCount).to.equal(0)
			log.error('Message logged with log.error, after named.level was set to NONE')
			expect(testConsole.error.callCount).to.equal(1)
			log.warn('Message logged with log.warn, after named.level was set to NONE')
			expect(testConsole.warn.callCount).to.equal(1)
			log.info('Message logged with log.info, after named.level was set to NONE')
			expect(testConsole.info.callCount).to.equal(1)
			log.log('Message logged with log.log, after named.level was set to NONE')
			expect(testConsole.log.callCount).to.equal(1)
			log.debug('Message logged with log.debug, after named.level was set to NONE')
			expect(testConsole.debug.callCount).to.equal(1)
			log.trace('Message logged with log.trace, after named.level was set to NONE')
			expect(testConsole.trace.callCount).to.equal(0)
			testConsole.reset()
			named.level = undefined
			expect(named.level).to.equal(log.DEBUG) // inherit parent level
			named.error('Message logged with named.error, after named.level was reset')
			expect(testConsole.error.callCount).to.equal(1)
			named.warn('Message logged with named.warn, after named.level was reset')
			expect(testConsole.warn.callCount).to.equal(1)
			named.info('Message logged with named.info, after named.level was reset')
			expect(testConsole.info.callCount).to.equal(1)
			named.log('Message logged with named.log, after named.level was set reset')
			expect(testConsole.log.callCount).to.equal(1)
			named.debug('Message logged with named.debug, after named.level was reset')
			expect(testConsole.debug.callCount).to.equal(1)
			named.trace('Message logged with named.trace, after named.level was reset')
			expect(testConsole.trace.callCount).to.equal(0)
			log.error('Message logged with log.error, after named.level was reset')
			expect(testConsole.error.callCount).to.equal(2)
			log.warn('Message logged with log.warn, after named.level was reset')
			expect(testConsole.warn.callCount).to.equal(2)
			log.info('Message logged with log.info, after named.level was reset')
			expect(testConsole.info.callCount).to.equal(2)
			log.log('Message logged with log.log, after named.level was reset')
			expect(testConsole.log.callCount).to.equal(2)
			log.debug('Message logged with log.debug, after named.level was reset')
			expect(testConsole.debug.callCount).to.equal(2)
			log.trace('Message logged with log.trace, after named.level was reset')
			expect(testConsole.trace.callCount).to.equal(0)
		} finally {
			log.level = oldLevel
			named.level = oldNamed
			testConsole.reset()
		}
	})

	it('can be `enabled` by its name', function(){
		testConsole.reset()
		try {
			log.level = log.INFO
			named.level = log.INFO
			expect(log.enabled('my-module-name')).to.not.equal(true)
			log.log('Message logged with log.log before named module is enabled')
			expect(testConsole.log.callCount).to.equal(0)
			named.log('Message logged with named.log before named module is enabled')
			expect(testConsole.log.callCount).to.equal(0)
			log.enable('my-module-name')
			log.log('Message logged with log.log after named module is enabled')
			expect(testConsole.log.callCount).to.equal(0)
			named.log('Message logged with named.log after named module is enabled')
			expect(testConsole.log.callCount).to.equal(1)
		} finally {
			log.level = oldLevel
			named.level = oldNamed
			log.disable('my-module-name')
			testConsole.reset()
		}
	})
})
