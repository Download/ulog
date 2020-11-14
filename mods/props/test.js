var test = require('tape')
var sinon = require('sinon')

var ulog = require('../../core')
var settings = require('../settings')
var options = require('../options')
var props = require('./')

test('mod: props', function (t) {
  t.equal(typeof props, 'object', 'is an object')
  t.ok('use' in props, 'has a property `use`')
  t.equal(typeof props.ext, 'function', 'has a method `ext()')
  t.equal(typeof props.new, 'function', 'has a method `new()')

  t.test('props.use', function (t) {
    t.ok(Array.isArray(props.use), 'is an array')
    t.deepEqual(props.use, [ options ], 'contains a single dependency on mod `options`')
    t.end()
  })

  t.test('props.ext(logger: Function)', function (t) {
    var ulogStub = sinon.stub()
    ulogStub.mods = []
    ulogStub.mods.push({ settings: { level: { prop: {} } } })
    sinon.spy(props, 'new')
    props.ext.call(ulogStub, function(){})
    t.equal(props.new.callCount, 1, 'calls props.new for all props found in registered mods')
    t.end()
  })

  t.test('props.new(logger: Function, name: String, opts: Object): Function', function (t) {
    function stub(v){return v}
    var ulogStub = sinon.spy(stub)
    ulogStub.get = sinon.spy(stub)
    ulogStub.ext = sinon.spy(stub)
    var logger, given
    var fromStr = sinon.spy(stub)
    var toStr = sinon.spy(stub)
    var get = sinon.spy(stub)
    var set = sinon.spy(stub)

    logger = props.new.call(ulogStub, given = function given(){}, 'level', {})
    t.equal(logger, given, 'returns the given logger')
    t.ok('level' in logger, 'creates a property on the logger')

    logger = props.new.call(ulogStub, given = function given(){}, 'level', {})
    logger.level;
    t.equal(ulogStub.get.callCount, 1, 'calls `ulog.get` when the property is accessed')
    ulogStub.get.resetHistory()

    logger = props.new.call(ulogStub, given = function(){}, 'level', { fromStr: fromStr })
    logger.level;
    t.equal(fromStr.callCount, 1, 'calls `fromStr` handlers on the prop when the property is accessed')
    fromStr.resetHistory()

    logger = props.new.call(ulogStub, given = function(){}, 'level', { toStr: toStr })
    logger.level = 5
    t.equal(toStr.callCount, 1, 'calls `toStr` handlers on the prop when the property is set')
    toStr.resetHistory()
    ulogStub.ext.resetHistory()

    logger = props.new.call(ulogStub, given = function(){}, 'level', { get: get })
    logger.level;
    t.equal(get.callCount, 1, 'calls `get` handlers on the prop when the property is accessed')
    get.resetHistory()

    logger = props.new.call(ulogStub, given = function(){}, 'level', { set: set })
    logger.level;
    logger.level = 1
    t.equal(set.callCount, 1, 'calls `set` handlers on the prop when the property is set')
    t.equal(ulogStub.ext.callCount, 1, 'calls `ulog.ext` when the property is set and has a `set` handler that returns truthy')
    set.resetHistory()
    ulogStub.ext.resetHistory()

    t.end()
  })

  t.test('ulog.use(props)', function(t){
    ulog.use(props)
    t.equal(ulog.mods[0], settings, 'adds mod `settings` to `ulog.mods`, because it is used by mod `options`')
    t.equal(ulog.mods[1], options, 'adds mod `options` to `ulog.mods`, because it is used by mod `props`')
    t.equal(ulog.mods[2], props, 'adds mod `props` to `ulog.mods`')
    t.equal(typeof ulog.get, 'function', 'method `get` is added to ulog by mod `settings`')
    t.equal(typeof ulog.set, 'function', 'method `set` is added to ulog by mod `settings`')
    ulog.use({
      props: {
        level: {}
      }
    })

//    delete ulog.get()['option']
    ulog.mods.splice(0, ulog.mods.length)
    delete ulog.get
    delete ulog.set
    t.end()
  })

  t.end()
})

