import fs from 'node:fs'
import path from 'node:path'
import * as url from 'node:url';

import { gzipSizeSync } from 'gzip-size'
// be cool and use ulog to print the logging in the build of ulog :)
import ulog from 'ulog'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

var log = ulog('ulog:build')

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
var v = pkg.version

;(function(){
  var file = path.resolve(__dirname, pkg.unpkg)
  log('Reading ' + file)
  let data = fs.readFileSync(file, 'utf8')
  log('Estimating gzipped size')
  var gzip = (gzipSizeSync(data) / 1024).toFixed(1)
  log.info(`${pkg.unpkg} (~${(data.length / 1024).toFixed(1)} kB, ${gzip} kB gzipped)`)

  file = path.resolve(__dirname, 'ulog.lazy.min.js')
  log('Reading ' + file)
  data = fs.readFileSync(file, 'utf8')
  log('Estimating gzipped size')
  var lazy = (gzipSizeSync(data) / 1024).toFixed(1)
  log.info(`ulog.lazy.min.js (~${(data.length / 1024).toFixed(1)} kB, ${lazy} kB gzipped)`)

  file = path.resolve(__dirname, 'full.min.js')
  log('Reading ' + file)
  data = fs.readFileSync(file, 'utf8')
  log('Estimating gzipped size')
  var full = (gzipSizeSync(data) / 1024).toFixed(1)
  log.info(`full.min.js (~${(data.length / 1024).toFixed(1)} kB, ${full} kB gzipped)`)

  file = path.resolve(__dirname, 'README.md')
  log(`Reading ${file}`)
  data = fs.readFileSync(file, 'utf-8')
  log(`Updating version to ${v} and gzip size to ${gzip}...`)
  data = data.replace(/ulog@\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?/g, `ulog@${v}`)
  data = data.replace(/\<sub\>\<sup\>v\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?/g, `<sub\><sup\>v${v}`)
  data = data.replace(/ulog@\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?\/ulog.min.js\) \(~\d\.\dkB/g, `ulog@${v}/ulog.min.js) (~${gzip}kB`)
  data = data.replace(/ulog@\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?\/ulog.lazy.min.js\) \(~\d\.\dkB/g, `ulog@${v}/ulog.lazy.min.js) (~${lazy}kB`)
  data = data.replace(/ulog@\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?\/full.min.js\) \(~\d\.\dkB/g, `ulog@${v}/full.min.js) (~${full}kB`)
  log(`Writing ${file}`)
  fs.writeFileSync(file, data, 'utf8')
  log.info(`README.md (~${(data.length / 1024).toFixed(1)} kB)`)

  file = path.resolve(__dirname, 'tutorial', 'index.html')
  log(`Reading ${file}`)
  data = fs.readFileSync(file, 'utf-8')
  data = data.replace(/ulog@\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?/g, `ulog@${v}`)
  log(`Writing ${file}`)
  fs.writeFileSync(file, data, 'utf8')
  log.info(`tutorial/index.html (~${(data.length / 1024).toFixed(1)} kB)`)
})()
