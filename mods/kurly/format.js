var kurly = require('kurly')
var grab = require('../../core/grab')
var structured = require('../formats/structured')

module.exports = function(logger){
  var ast = kurly.parse(logger.format)
  var template = kurly.compile(ast, grab(this, 'formatters', {}))
  structured(this, logger, template)
}
