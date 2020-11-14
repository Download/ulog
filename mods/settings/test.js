var test = require('tape')

var ulog = require('../../core')
var settings = require('./')

test('mod: settings', function(t) {
  t.equal(typeof settings, 'object', 'is an object')
  t.ok('extend' in settings, 'has a property `extend`')

  t.test(`settings.extend`, function(t){
    t.equal(typeof settings.extend, 'object', 'is an object')
    t.equal(typeof settings.extend.get, 'function', 'has a method `get`')
    t.equal(typeof settings.extend.set, 'function', 'has a method `set`')
    t.end()
  })

  t.test('ulog.use(settings)', function(t){
    ulog.use(settings)
    t.deepEqual(ulog.mods, [ settings ], 'adds mod `settings` to `ulog.mods`')
    t.equal(typeof ulog.get, 'function', 'adds method `ulog.get`')
    t.equal(typeof ulog.set, 'function', 'adds method `ulog.set`')
    ulog.mods.splice(0, ulog.mods.length)
    delete ulog.get
    delete ulog.set
    t.end()
  })

  t.test('ulog.get(name?: String, loggerName?: String): String|Object', function(t){
    ulog.use(settings)
    t.deepEqual(ulog.get(), {}, 'when called without arguments, returns an object with all settings')
    t.equal(ulog.get('name'), undefined, 'when called with an unknown `name`, returns undefined')
    ulog.set('name', 'ok')
    t.equal(ulog.get('name'), 'ok', 'when called with a known `name`, returns the setting for `name`')
    delete ulog.get()['name']
    ulog.mods.splice(0, ulog.mods.length)
    delete ulog.get
    delete ulog.set
    t.end()
  })

  t.test('ulog.set', function(t){
    ulog.use(settings)
    ulog.set('name')
    t.deepEqual(ulog.get(), { name: undefined }, 'when called with only a `name`, sets the setting for `name` to undefined')
    ulog.set('name', 'ok')
    t.deepEqual(ulog.get(), { name: 'ok' }, 'when called with a `name` and `value`, sets the setting for `name` to `value`')
    delete ulog.get()['name']
    ulog.mods.splice(0, ulog.mods.length)
    delete ulog.get
    delete ulog.set
    t.end()
  })

  t.end()
})
