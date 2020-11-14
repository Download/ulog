var test = require('tape')
var sinon = require('sinon');

var ulog = require('./')

test('ulog(name?: String, options?: Object): Object|Function', function(t) {
  t.equal(typeof ulog, 'function', 'is a function')
  t.ok('mods' in ulog, 'has a property `mods`')
  t.equal(typeof ulog.ext, 'function', 'has a method `ext()`')
  t.equal(typeof ulog.use, 'function', 'has a method `use()`')
  t.equal(typeof ulog('test'), 'function', 'returns a Logger when called with a name as argument')
  t.ok(typeof ulog() === 'object' && ('test' in ulog()), 'returns an object containing entries for all loggers when called without arguments')
  delete ulog().test

  t.test('ulog.mods', function(t){
    t.ok(Array.isArray(ulog.mods), 'is an array')
    t.end()
  })

  t.test('ulog.ext(logger: Function): Function', function(t){
    var mod = { ext: sinon.stub() }
    ulog.use(mod)
    var logger = ulog('test')
    t.equal(mod.ext.callCount, 1, 'calls the `ext` handler on all registered mods')
    delete ulog().test
    ulog.mods.splice(0, ulog.mods.length)
    t.end()
  })

  t.test('ulog.use(mod: Object|Array): Number', function (t) {
    var mod = {}
    var result = ulog.use(mod)
    t.equal(ulog.mods.indexOf(mod), 0, 'adds single mods to `ulog.mods`')
    t.equal(result, 1, 'returns 1 to indicate a single mod was added')
    var result = ulog.use(mod)
    t.equal(ulog.mods.length, 1, 'does not add the same mod twice')
    t.equal(result, 0, 'returns 0 to indicate no mods were added')
    ulog.mods.splice(0, ulog.mods.length)

    var anotherMod = {}
    result = ulog.use([ mod, anotherMod ])
    t.equal(ulog.mods.length, 2, 'adds arrays with mods to `ulog.mods`')
    t.equal(result, 2, 'returns 2 to indicate two mods were added')
    ulog.mods.splice(0, ulog.mods.length)

    var dependency = {}
    var modWithDeps = {
      use: [ dependency ]
    }
    result = ulog.use(modWithDeps)
    t.equal(ulog.mods.length, 2, 'adds dependencies for mods that have a `use` property')
    t.equal(ulog.mods.indexOf(dependency), 0, 'adds dependencies before dependants')
    t.equal(result, 2, 'returns 2 to indicate two mods were added')
    ulog.mods.splice(0, ulog.mods.length)

    var modWithExtensions = {
      extend: {
        test: 'test'
      }
    }
    ulog.use(modWithExtensions)
    t.equal(ulog.test, 'test', 'extends ulog for mods that have a `extend` property')
    ulog.mods.splice(0, ulog.mods.length)

    // ulog.add('mods', { stub: { add: sinon.stub() } })
    // t.equal(ulog.mods.stub.add.callCount, 1, 'when adding a mod with an `add()` method, that method is called')
    // ulog.add('whatever', { c:'component', b:'another', a:'yet another' })
    // t.equal(ulog.mods.stub.add.callCount, 2, 'when adding components, mods with an `add()` method are called')
    // delete ulog.whatever
    // delete ulog.mods.stub
    t.end()
  })

  // t.test('ulog.set(name: String, value: String)', function (t) {
  //   var mod = { set: sinon.spy() }
  //   ulog.add(mod)

  //   ulog.set('whatever', 'test')
  //   t.ok(mod.set.called, 'calls set on all registered mods')

  //   ulog.mods.splice(0, ulog.mods.length)
  //   t.end()
  // })

  // t.test('ulog.get(name: String, loggerName: String)', function (t) {
  //   var mod = { get: sinon.spy() }
  //   ulog.add(mod)

  //   ulog.get('whatever')
  //   t.ok(mod.get.called, 'calls get on all registered mods')

  //   ulog.mods.splice(0, ulog.mods.length)
  //   t.end()
  // })

  t.end()
})

// test('Logger(level?: String = \'log\', ...args)', function(t) {
//   var log = ulog('test')
//   t.equal(typeof log, 'function', 'is a function')
//   t.equal(log.name, 'test', 'has a property `name` that matches the given `name`')
//   t.equal(typeof log.error, 'function', 'has a method `error()`')
//   t.equal(typeof log.warn, 'function', 'has a method `warn()`')
//   t.equal(typeof log.info, 'function', 'has a method `info()`')
//   t.equal(typeof log.log, 'function', 'has a method `log()`')
//   t.equal(typeof log.debug, 'function', 'has a method `debug()`')
//   t.equal(typeof log.trace, 'function', 'has a method `trace()`')
//   var sandbox = sinon.createSandbox()
//   sandbox.stub(log, 'error')
//   sandbox.stub(log, 'warn')
//   sandbox.stub(log, 'info')
//   sandbox.stub(log, 'log')
//   sandbox.stub(log, 'debug')
//   sandbox.stub(log, 'trace')
//   try {
//     log('a log message')
//     t.equal(log.log.callCount, 1, 'when called without a level name as first argument, calls Logger.log()')
//     log('error', 'an error message')
//     t.equal(log.error.callCount, 1, 'when called with \'error\' as first argument, calls Logger.error()')
//     log('warn', 'a warning message')
//     t.equal(log.warn.callCount, 1, 'when called with \'warn\' as first argument, calls Logger.warn()')
//     log('info', 'an info message')
//     t.equal(log.info.callCount, 1, 'when called with \'info\' as first argument, calls Logger.info()')
//     log('log', 'a log message')
//     t.equal(log.log.callCount, 2, 'when called with \'log\' as first argument, calls Logger.log()')
//     log('debug', 'a debug message')
//     t.equal(log.debug.callCount, 1, 'when called with \'debug\' as first argument, calls Logger.debug()')
//     log('trace', 'a trace message')
//     t.equal(log.trace.callCount, 1, 'when called with \'trace\' as first argument, calls Logger.trace()')
//   }
//   finally {
//     sandbox.restore()
//   }
//   t.end()
// })
