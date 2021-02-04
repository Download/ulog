var path = require('path')
var dir = path.resolve(__dirname)
const TerserPlugin = require("terser-webpack-plugin");

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
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: false,
    }
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
}
