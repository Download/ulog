var fs = require('fs')
var path = require('path')

var gzipSize = require('gzip-size')
// be cool and use ulog to print the logging in the build of ulog :)
var log = require('./')('ulog:build')

var [ processName, script, command, ...args ] = process.argv
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
var v = pkg.version

;(function(){
  var data = fs.readFileSync(path.resolve(__dirname, pkg.unpkg), 'utf8')
  var gzip = (gzipSize.sync(data) / 1024).toFixed(1)
  log.info(`Built ${pkg.unpkg} (~${gzip} kB minified and gzipped)`)
  data = fs.readFileSync(path.resolve(__dirname, 'full.min.js'), 'utf8')
  var fullzip = (gzipSize.sync(data) / 1024).toFixed(1)
  log.info(`Built full.min.js (~${fullzip} kB minified and gzipped)`)
  var readme = fs.readFileSync('README.md', 'utf-8')
  readme = readme.replace(/ulog@\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?/g, `ulog@${v}`)
  readme = readme.replace(/\<sub\>\<sup\>v\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?/g, `<sub\><sup\>v${v}`)
  readme = readme.replace(/ulog@\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?\) \(~\d\.\dkB/g, `ulog@${v}) (~${gzip}kB`)
  readme = readme.replace(/just 2.7kB/g, `just ${gzip}kB`)
  readme = readme.replace(/ulog@\d(\d)?\.\d(\d)?\.\d(\d)?(-[a-z]+\.\d(\d)?)?\/full\.min\.js\) \(~\d\.\dkB/g, `ulog@${v}/full.min.js) (~${fullzip}kB`)
  fs.writeFileSync('README.md', readme, 'utf8')
  log.info(`Updated README.md`)
})()