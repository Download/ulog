var fs = require('fs')
var path = require('path')

var parse = require('./parse')
var watched = require('./watched')
var configure = require('./configure')

module.exports = function(ulog, callback) {
  var settings = ulog.grab('settings', {})
  var log_config = ulog.get('log_config') || 'log.config'
  var filename = path.resolve(log_config)
  if (callback) {
    fs.readFile(filename, 'utf8', function(e, data){
      callback(configure(watched(ulog, settings), data && parse(lines(data))))
    })
  } else {
    var data
    try {data = fs.readFileSync(filename, 'utf8')} catch(e){}
    return configure(watched(ulog, settings), data && parse(lines(data)))
  }
}

function lines(data) {
  return data.split(/(\r\n|\r|\n)/).map(function(line){
    // trim and skip comments
    return (line = line.trim()).indexOf('#') === 0 ? '' : line
  })
}
