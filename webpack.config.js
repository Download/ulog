var path = require('path')
var dir = path.resolve(__dirname)

module.exports = {
  node: false,
  context: dir,
  entry: {
    ulog: './main.bundle.js',
    full: './full.bundle.js',
  },
  output: {
    path: dir,
    filename: '[name].min.js',
  },
}
