var expect = require('chai').expect
var sinon = require('sinon')

var testConsole = require('./test/console')

var ulog = require('./debug')
var oldGlobalLevel = ulog.level
ulog.con = function(){return testConsole}
ulog.level = ulog.level // trigger patch, so testConsole is used

var debug = ulog('my-module-name')
var oldLevel = debug.level

describe('debug = require(\'ulog/debug\')(named)', function(){
	it('yields a function `debug`', function(){
		expect(debug).to.be.a('function')
	})

	it('uses a format by default', function(){
		expect(ulog.formats.length).to.equal(1)
		expect(ulog.con() === testConsole).to.equal(true)
	})

	it('adds the current time to the log call', function(){
		testConsole.reset()
		try {
			debug.level = ulog.DEBUG
			expect(debug.level).to.equal(debug.DEBUG)
			expect(testConsole.debug.callCount).to.equal(0)
			var message = 'Message'
			debug(message)
			expect(testConsole.debug.callCount).to.equal(1)
			expect(testConsole.debug.getCall(0).args[0]).to.be.a('string')
			expect(testConsole.debug.getCall(0).args[0].length).to.equal(8)
		} finally {
			debug.level = oldLevel
			testConsole.reset()
		}
	})

	it('adds the time elapsed since the previous call to the log call', function(){
		testConsole.reset()
		try {
			debug.level = ulog.DEBUG
			expect(debug.level).to.equal(debug.DEBUG)
			expect(testConsole.debug.callCount).to.equal(0)
			var message = 'Message'
			debug(message)
			expect(testConsole.debug.callCount).to.equal(1)
			expect(testConsole.debug.getCall(0).args[1]).to.be.a('string')
			expect(testConsole.debug.getCall(0).args[1].length).to.equal(5)
		} finally {
			debug.level = oldLevel
			testConsole.reset()
		}
	})

	it('adds the logger name to the log call', function(){
		testConsole.reset()
		try {
			debug.level = ulog.DEBUG
			expect(debug.level).to.equal(debug.DEBUG)
			expect(testConsole.debug.callCount).to.equal(0)
			var message = 'Message'
			debug(message)
			expect(testConsole.debug.callCount).to.equal(1)
			expect(testConsole.debug.getCall(0).args[2]).to.be.a('string')
			expect(testConsole.debug.getCall(0).args[2].length).to.equal(24)
			expect(testConsole.debug.getCall(0).args[2]).to.equal(debug.name.padEnd(24, ' '))
		} finally {
			debug.level = oldLevel
			testConsole.reset()
		}
	})
})
