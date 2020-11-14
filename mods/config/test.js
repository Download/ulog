var test = require('tape')
var path = require('path')
var fs = require('fs')

var ulog = require('../../core')
var config = require('./')
var filename = 'test.config'

test('mod: config', function(t) {
  t.equal(typeof config, 'object', 'is an object')
  t.equal(typeof config.get, 'function', 'has a method `get`')

  t.test('config.get(result: String, name?: String)', function(t){
    ulog.use(config)
    ulog.set('log_config', path.resolve(__dirname, filename))
    t.equal(typeof config.get.call(ulog), 'undefined', 'when called without arguments, returns undefined')
    t.equal(config.get.call(ulog, 'test', 'test'), 'test', 'when called with a truthy result, returns that result')
    ulog.use({
      settings: {
        test: { }
      }
    })
    t.equal(config.get.call(ulog, undefined, 'test'), 'pass', 'returns the value configured in the config file')
    ulog.use({
      settings: {
        level: {
          config: 'log'
        }
      }
    })
    t.equal(config.get.call(ulog, undefined, 'level'), 'pass', 'when the setting has a config key, uses that key')
    ulog.mods.splice(0, ulog.mods.length)
    t.end()
  })

  t.test('ulog.use(config)', function(t){
    ulog.use(config)
    ulog.set('log_config', path.resolve(__dirname, filename))
    t.ok(ulog.mods.indexOf(config) !== -1, 'adds mod `config` to `ulog.mods`')
    ulog.use({
      settings: {
        test: { }
      }
    })
    t.equal(ulog.get('test'), 'pass', 'reads in the config automatically')
    var data = fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
    fs.writeFileSync(path.resolve(__dirname, filename), 'test=ok', 'utf8')
    // allow ulog 250 ms to process the settings change
    setTimeout(function(){
      t.equal(ulog.get('test'), 'ok', 'watches the config and updates automatically')
      fs.writeFileSync(path.resolve(__dirname, filename), data, 'utf8')
      ulog.mods.splice(0, ulog.mods.length)
      t.end()
    }, 250)
  })

  t.end()
})
