// var test = require('tape')
// var sinon = require('sinon')

require('./core/test')
require('./mods/test')

// var ulog = require('./main')

// test('ulog', function (t) {
//   t.ok('levels' in ulog, 'has a property `levels`')
//   t.ok('mods' in ulog, 'has a property `mods`')

//   t.test('ulog.levels: Object', function (t) {
//     t.equal(typeof ulog.levels, 'object', 'is an object')
//     t.ok('error' in ulog.levels, 'contains a key `error`')
//     t.ok('warn' in ulog.levels, 'contains a key `warn`')
//     t.ok('info' in ulog.levels, 'contains a key `info`')
//     t.ok('log' in ulog.levels, 'contains a key `log`')
//     t.ok('debug' in ulog.levels, 'contains a key `debug`')
//     t.ok('trace' in ulog.levels, 'contains a key `trace`')
//     t.end()
//   })

//   t.test('Logger(level?: String = \'log\', ...args)', function(t) {
//     var log = ulog('test')
//     t.equal(typeof log, 'function', 'is a function')
//     t.equal(log.name, 'test', 'has a property `name` that matches the given `name`')
//     t.ok('level' in log, 'has a property `level`')
//     t.equal(log.NONE, 0, 'has a property `NONE` set to 0')
//     t.equal(log.ERROR, ulog.levels.error, 'has a property `ERROR` set to the value of `ulog.levels.error`')
//     t.equal(log.WARN, ulog.levels.warn, 'has a property `WARN` set to the value of `ulog.levels.warn`')
//     t.equal(log.INFO, ulog.levels.info, 'has a property `INFO` set to the value of `ulog.levels.info`')
//     t.equal(log.LOG, ulog.levels.log, 'has a property `LOG` set to the value of `ulog.levels.log`')
//     t.equal(log.DEBUG, ulog.levels.debug, 'has a property `DEBUG` set to the value of `ulog.levels.debug`')
//     t.equal(log.TRACE, ulog.levels.trace, 'has a property `TRACE` set to the value of `ulog.levels.trace`')
//     t.equal(log.ALL, Number.MAX_SAFE_INTEGER, 'has a property `ALL` set to Number.MAX_SAFE_INTEGER')
//     t.equal(typeof log.error, 'function', 'has a method `error()`')
//     t.equal(typeof log.warn, 'function', 'has a method `warn()`')
//     t.equal(typeof log.info, 'function', 'has a method `info()`')
//     t.equal(typeof log.log, 'function', 'has a method `log()`')
//     t.equal(typeof log.debug, 'function', 'has a method `debug()`')
//     t.equal(typeof log.trace, 'function', 'has a method `trace()`')
//     t.equal(typeof log.trace, 'function', 'has a method `trace()`')
//     var sandbox = sinon.createSandbox()
//     // var lvl = ulog.get().level // bypass env
//     // ulog.set('level', 'trace')
//     sandbox.stub(log, 'error')
//     sandbox.stub(log, 'warn')
//     sandbox.stub(log, 'info')
//     sandbox.stub(log, 'log')
//     sandbox.stub(log, 'debug')
//     sandbox.stub(log, 'trace')
//     try {
//       log('a log message')
//       t.equal(log.log.callCount, 1, 'when called without a level name as first argument, calls Logger.log()')
//       log('error', 'an error message')
//       t.equal(log.error.callCount, 1, 'when called with \'error\' as first argument, calls Logger.error()')
//       log('warn', 'a warning message')
//       t.equal(log.warn.callCount, 1, 'when called with \'warn\' as first argument, calls Logger.warn()')
//       log('info', 'an info message')
//       t.equal(log.info.callCount, 1, 'when called with \'info\' as first argument, calls Logger.info()')
//       log('log', 'a log message')
//       t.equal(log.log.callCount, 2, 'when called with \'log\' as first argument, calls Logger.log()')
//       log('debug', 'a debug message')
//       t.equal(log.debug.callCount, 1, 'when called with \'debug\' as first argument, calls Logger.debug()')
//       log('trace', 'a trace message')
//       t.equal(log.trace.callCount, 1, 'when called with \'trace\' as first argument, calls Logger.trace()')
//     }
//     finally {
//       sandbox.restore()
//     }

//     t.test('Logger.level: Number', function(t) {
//       var log = ulog('test')
//       t.equal(typeof log.level, 'number', 'is a number')
//       log.level = 'debug'
//       t.equal(log.level, log.DEBUG, 'can be set with a level string like \'debug\'')
//       log.level = '5'
//       t.equal(log.level, log.DEBUG, 'can be set with a level string like \'5\'')
//       log.level = 5
//       t.equal(log.level, log.DEBUG, 'can be set with a level number like 5')
//       log.level == 'warn'
//       ulog.enable('test')
//       t.equal(log.level, log.DEBUG, 'reflects it when debug mode is enabled')
//       ulog.disable()
//       t.end()
//     })

//     t.end()
//   })

//   var log = ulog('test')
//   t.test('Logging at level error', function(t){
//     log.level = 'error'
//     t.equal(log.level, ulog.levels.error, 'log level is set to error')
//     for (m in ulog.levels) {
//       log[m](m + ' message')
//     }
//     t.end()
//   })
//   t.test('Logging at level warn', function(t){
//     log.level = 2
//     t.equal(log.level, ulog.levels.warn, 'log level is set to warn')
//     for (m in ulog.levels) {
//       log[m](m + ' message')
//     }
//     t.end()
//   })
//   t.test('Logging at level info', function(t){
//     log.level = 'info'
//     t.equal(log.level, ulog.levels.info, 'log level is set to info')
//     for (m in ulog.levels) {
//       log[m](m + ' message')
//     }
//     t.end()
//   })
//   t.test('Logging at level log', function(t){
//     log.level = 'log'
//     t.equal(log.level, ulog.levels.log, 'log level is set to log')
//     for (m in ulog.levels) {
//       log[m](m + ' message')
//     }
//     t.end()
//   })
//   t.test('Logging at level debug', function(t){
//     log.level = 'debug'
//     t.equal(log.level, ulog.levels.debug, 'log level is set to debug')
//     for (m in ulog.levels) {
//       log[m](m + ' message')
//     }
//     t.end()
//   })
//   t.test('Logging at level trace', function(t){
//     log.level = 'trace'
//     t.equal(log.level, ulog.levels.trace, 'log level is set to trace')
//     for (m in ulog.levels) {
//       log[m](m + ' message')
//     }
//     t.end()
//   })

//   t.end()
// })
