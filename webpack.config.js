import path from 'path'
import TerserPlugin from "terser-webpack-plugin"
import { fileURLToPath } from 'url';
const dir = path.resolve(fileURLToPath(new URL('.', import.meta.url)))

const configuration = {
  node: false,
  context: dir,
  entry: {
    ulog: './ulog.bundle.js',
    full: './full.bundle.js',
  },
  externals: {
    anylogger: 'anylogger',
  },
  output: {
    path: dir,
    filename: '[name].min.js',
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: true,
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

export default configuration
