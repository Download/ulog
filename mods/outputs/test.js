var test = require('tape')
var sinon = require('sinon').createSandbox()

var ulog = require('../../core')
var mod = require('./')
var levels = require('../levels')

test('mods.outputs: Object', function (t) {
  t.equal(typeof mod, 'object', 'is an object')
  t.equal(typeof mod.ext, 'function', 'has a method `ext()')
  t.equal(typeof mod.settings, 'object', 'has an object `settings`')
  t.equal(typeof mod.settings.output, 'object', 'defines an `output` setting')


  t.test('outputs.set(name: String, value: String)', function (t) {
    ulog.use(mod)
    sinon.spy(ulog, 'ext')
    ulog.set('log_output', 'test')
    t.equal(!!ulog.ext.called, true, 're-extends all loggers when the output option is set')
    ulog.set('log_output', undefined)
    ulog.mods.splice(0, ulog.mods.length)
    sinon.restore()
    t.end()
  })

  t.test('outputs.ext(logger: Function)', function (t) {
    var fn = sinon.stub()
    ulog.use([
      levels,
      {
        outputs: {
          test: { log: fn }
        }
      }
    ])
    var logger = ulog('test')
    logger.output = 'test'

    logger.info('test message')
    t.ok(fn.called, 'Makes the given logger use the specified output')
    ulog.mods.splice(0, ulog.mods.length)
    for (var logger in ulog()) delete ulog()[logger]
    sinon.restore()
    t.end()
  })

  ulog.mods.splice(0, ulog.mods.length)
  t.end()
})

