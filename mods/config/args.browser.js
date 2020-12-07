var parse = require('./parse')

module.exports = parse(typeof location == 'undefined' ? [] : location.search.replace(/^(\?|#|&)/, '').split('&'),
  /\+/g, ' ', decodeURIComponent
)
