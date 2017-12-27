var fs = require('fs')
var path = require('path')

var root = path.resolve(process.cwd())

var commonScript = fs.readFileSync(path.resolve(root, 'ulog.js'), 'utf8')
commonScript = commonScript.replace('module.exports = ulog', '')

var browserScript = fs.readFileSync(path.resolve(root, 'browser.js'), 'utf8')
browserScript = browserScript.replace("var log = require('./ulog')", '')
browserScript = browserScript.replace('module.exports = log', 'return log')

var combinedScript = commonScript + browserScript

var umdScript =
		"(function(u,m,d){\n" +
		"\ttypeof define == 'function' && define.amd ? define(m,[],d) : (u[m] = d())\n" +
		"})(this, \'ulog\', function(){'use strict'\n" +
		combinedScript + '\n' +
		"}) // umd\n"

fs.writeFile(path.resolve(root, 'ulog.umd.js'), umdScript, function(err) {
    if (err) console.log(err)
		else {
			var stats = fs.statSync("ulog.umd.js")
			console.info("Saved ulog.umd.js: " + stats.size + ' bytes.');
		}
});