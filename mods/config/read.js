var fs = require('fs')
var path = require('path')
var parse = require('./parse')

module.exports = function(ulog, callback) {
  var filename = path.resolve(ulog.get('log_config') || 'log.config')
  if (callback) {
    fs.readFile(filename, 'utf8', function(e, data){
      if (e) return {}
      else callback(parse(lines(data)))
    })
  } else {
    try {
      var data = fs.readFileSync(filename, 'utf8')
      return parse(lines(data))
    } catch(e) {return {}}
  }
}

function lines(data) {
  return data.split(/(\r\n|\r|\n)/).map(function(line){
    // trim and skip comments
    return (line = line.trim()).indexOf('#') === 0 ? '' : line
  })
}
