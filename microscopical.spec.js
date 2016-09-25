var expect = require('chai').expect
var fs = require('fs')
var node = typeof window != 'object'

describe('ulog', function(){
	it('is microscopically small (less than 2000 bytes minified, about 1kB when gzipped)', function(){
		var stats = fs.statSync("ulog.min.js")
		expect(stats.size).to.be.below(2000)
	})
})
