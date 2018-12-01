var sinon = require('sinon')

function nop(){}
var testConsole = module.exports = {
	error: sinon.spy(nop), 
	warn: sinon.spy(nop), 
	info: sinon.spy(nop), 
	log: sinon.spy(nop), 
	debug: sinon.spy(nop), 
	trace: sinon.spy(nop), 
	reset: function(){
		testConsole.error.resetHistory()
		testConsole.warn.resetHistory()
		testConsole.info.resetHistory()
		testConsole.log.resetHistory()
		testConsole.debug.resetHistory()
		testConsole.trace.resetHistory()
	}
}
