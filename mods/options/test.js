var test = require('tape')

var ulog = require('../../core')
var settings = require('../settings')
var options = require('./')

test('mod: options', function (t) {
  t.equal(typeof options, 'object', 'is an object')
  t.equal(typeof options.get, 'function', 'has a method `get()')
  t.equal(typeof options.parse, 'function', 'has a method `parse()')
  t.equal(typeof options.eval, 'function', 'has a method `eval()')

  t.test('options.get(result: Any, name: String, loggerName: String)', function (t) {
    t.equal(options.get.call(ulog, 'result'), 'result', 'when called without a `loggerName`, returns the result unchanged')
    t.equal(options.get.call(ulog, 'Hello World; test=OK', 'message', 'test'), 'OK', 'when called with a `loggerName`, returns the effective setting for that logger')
    t.equal(options.get.call(ulog, 'SUCCESS; -test,*=FAILURE', 'message', 'test'), 'SUCCESS', 'after the option has been set, re-calculates the effective settings')
    t.equal(options.get.call(ulog, 'test', 'debug', 'test'), 'debug', 'Parses the option named `debug` using debug-style parsing')
    t.end()
  })

  t.test('options.parse(value: String, name?: String): Object[]', function (t) {
    var given = 'ALL; many,-some=TRY; test=OK; '
    var expected = [
      {
        value: 'TRY',
        incl: [/^many$/],
        excl: [/^some$/],
      },{
        value: 'OK',
        incl: [/^test$/],
        excl: [],
      },{
        value: 'ALL',
        incl: [/^.*?$/],
        excl: [],
      }
    ]
    var actual = options.parse(given, 'test')
    t.deepEqual(actual, expected, 'returns an abstract syntax tree (ast)')
    t.end()
  })

  t.test('options.eval(ast: Object[], name?: String): String', function (t) {
    var AST = [
      {
        value: 'TRY',
        incl: [/^many$/],
        excl: [/^some$/],
      },{
        value: 'OK',
        incl: [/^test$/],
        excl: [],
      },{
        value: 'ALL',
        incl: [/^.*?$/],
        excl: [],
      }
    ]
    t.equal(options.eval(AST), 'ALL', 'when no logger name is given, returns the effective global option value')
    t.equal(options.eval(AST, ''), 'ALL', 'when an empty logger name is given, returns the effective global option value')
    t.equal(options.eval(AST, 'many'), 'TRY', 'when \'many\' is given as `loggerName`, returns \'TRY\'')
    t.equal(options.eval(AST, 'some'), 'ALL', 'when \'some\' is given as `loggerName` returns \'ALL\'')
    t.equal(options.eval(AST, 'test'), 'OK', 'when \'test\' is given as `loggerName`, returns \'OK\'')
    t.pass('does not throw')
    t.end()
  })

  t.test('ulog.use(options)', function(t){
    ulog.use(options)
    t.deepEqual(ulog.mods[0], settings, 'adds mod `settings` to `ulog.mods`, because it is used by mod `options`')
    t.deepEqual(ulog.mods[1], options, 'adds mod `options` to `ulog.mods`')
    t.equal(typeof ulog.get, 'function', 'method `get` is added to ulog by mod `settings`')
    t.equal(typeof ulog.set, 'function', 'method `set` is added to ulog by mod `settings`')
    ulog.use({
      settings: {
        option: {

        }
      }
    })
    ulog.set('option', 'ALL; many,-some=TRY; test=OK; ')
    t.equal(ulog.get('option'), 'ALL; many,-some=TRY; test=OK; ', '`ulog.get` returns the setting when no `loggerName` is given')
    t.equal(ulog.get('option', ''), 'ALL', '`ulog.get` returns \'ALL\' when an empty `loggerName` is given')
    t.equal(ulog.get('option', 'unknown'), 'ALL', '`ulog.get` returns \'ALL\' when an unknown `loggerName` is given')
    t.equal(ulog.get('option', 'many'), 'TRY', '`ulog.get` returns \'TRY\' when \'many\' is given as `loggerName`')
    t.equal(ulog.get('option', 'test'), 'OK', '`ulog.get` returns \'OK\' when \'test\' is given as `loggerName`')
    delete ulog.get()['option']
    ulog.mods.splice(0, ulog.mods.length)
    delete ulog.get
    delete ulog.set
    t.end()
  })

  t.end()
})

