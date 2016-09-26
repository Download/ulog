var expect = require('chai').expect
var fs = require('fs')
var node = typeof window != 'object'

describe('ulog', function(){
	it('is microscopically small (~2kB minified, ~1kB gzipped)', function(){
		var stats = fs.statSync("ulog.min.js")
		expect(stats.size).to.be.below(2000)
	})
})
