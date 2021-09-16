var test = require('tape')
var sinon = require('sinon').createSandbox()

var ulog = require('../../core')
var settings = require('../settings')
var options = require('../options')
var props = require('../props')
var outputs = require('../outputs')
var levels = require('./')

test('mod: levels', function (t) {
  t.equal(typeof levels, 'object', 'is an object')
  t.ok('use' in levels, 'has a property `use`')
  t.ok('settings' in levels, 'has a property `settings`')
  t.equal(typeof levels.ext, 'function', 'has a method `ext()')

  t.test('levels.use', function(t){
//    t.deepEqual(levels.use, [ outputs ], 'contains a dependency on `outputs`')
    t.end()
  })

  t.test('levels.settings', function(t){
    t.equal(typeof levels.settings, 'object', 'is an object')
    t.ok('level' in levels.settings, 'contains a settings `level`')
    t.ok('prop' in levels.settings.level, 'setting `level` is a prop')
    t.equal(typeof levels.settings.level.prop.fromStr, 'function', 'the `level` prop has a `fromStr` handler')
    t.equal(typeof levels.settings.level.prop.toStr, 'function', 'the `level` prop has a `toStr` handler')
    t.equal(typeof levels.settings.level.prop.get, 'function', 'the `level` prop has a `get` handler')
//    t.equal(typeof levels.settings.level.prop.set, 'function', 'the `level` prop has a `set` handler')
    t.end()
  })

  t.test('levels.ext(logger: Function)', function (t) {
    ulog.use(levels)
    //simple workaround to fix test problem in pull request #58
    ulog.set('level', 'info')
    var logger = ulog('test')
    t.equal(logger.NONE, 0, 'creates a property `NONE`')
    for (lvl in ulog.levels) {
      var prop = lvl.toUpperCase()
      t.equal(logger[prop], ulog.levels[lvl], 'creates a property `' + prop + '`')
    }
    t.equal(logger.ALL, 7, 'creates a property `ALL`')
    t.equal(logger.error, logger.channels.output.fns.error, 'log methods that are within the logger\'s level lead to output')
    t.equal(logger.log, logger.channels.drain.fns.log, 'log methods that are outside the logger\'s level lead to the drain')

    ulog.mods.splice(0, ulog.mods.length)
    delete ulog().test
    t.end()
  })

  t.test('ulog.use(levels)', function(t){
    ulog.use(levels)
    t.ok(ulog.mods.indexOf(levels) !== -1, 'adds the `levels` mod')
    var logger = ulog('test')
    t.ok('level' in logger, 'adds a property `level` to loggers')
    t.equal(typeof logger.level, 'number', 'property `level` is a number')
    t.ok(!Number.isNaN(logger.level), 'property `level` is not NaN')
    logger.level = logger.LOG
    t.equal(logger.level, logger.LOG, 'property `level` can be assigned a level number')
    logger.level = 'info'
    t.equal(logger.level, logger.INFO, 'property `level` can be assigned a level name')
    logger.level = '' + logger.INFO
    t.equal(logger.level, logger.INFO, 'property `level` can be assigned a level number as a string')
    ulog.set('debug', 'test')
    t.equal(logger.level, logger.DEBUG, 'property `level` correctly reflects it when a logger is in debug mode')
    ulog.mods.splice(0, ulog.mods.length)
    delete ulog().test
    t.end()
  })

  t.end()
})

