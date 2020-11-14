var test = require('tape')
var sinon = require('sinon')
var ulog = require('../../core')
var formats = require('./')
var levels = require('../levels')

test('mod: formats', function(t) {
  t.equal(typeof formats, 'object', 'is an object')
  t.ok(Array.isArray(formats.use), 'has a `use` array')
  t.equal(typeof formats.settings, 'object', 'has a `settings` object')
  t.equal(typeof formats.formats, 'object', 'has a `formats` object')
//  t.equal(typeof formats.formatters, 'object', 'has a `formatters` object')
  t.equal(typeof formats.ext, 'function', 'has a method `ext`')
//  t.equal(typeof formats.record, 'function', 'has a method `record`')

  t.test('ulog.use(formats)', function(t){
    ulog.use([levels, formats])
    t.ok(ulog.mods.indexOf(formats) !== -1, 'adds mod `formats` to `ulog.mods`')
//     var fn = sinon.stub()
//     ulog.use({
//       formats: {
//         test: fn,
//       }
//     })
//     var logger = ulog('test')
//     t.equal(fn.callCount, 1, 'when a format is selected, it\'s function is called')
//     ulog.set('format', 'test')
//     t.equal(fn.callCount, 1, 'when a format is selected, it\'s function is called')
// //    delete ulog.get()['option']
    ulog.mods.splice(0, ulog.mods.length)
    delete ulog().test
    t.end()
  })



  t.end()
})
