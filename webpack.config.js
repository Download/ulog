var path = require('path')
var dir = path.resolve(__dirname)

module.exports = {
  node: false,
  context: dir,
  entry: {
    ulog: './ulog.bundle.js',
    full: './full.bundle.js',
  },
  output: {
    path: dir,
    filename: '[name].min.js',
  },
}
