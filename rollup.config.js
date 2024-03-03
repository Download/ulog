import pkg from './package.json' assert { type: "json" };

const external = [
	'anylogger',
	'kurly',
	'kurly/pipe.js',
]

export default Object.keys(pkg.exports).reduce((results, name) => {
	results.push({
		input: pkg.exports[name].import,
		output: {
			file: pkg.exports[name].require,
			name: name == '.' ? pkg.name : name.match(/[^/]+$/)[0],
			format: 'cjs',
			strict: false,
			exports: 'default'
		},
		external,
	})
	if (pkg.browser[pkg.exports[name].import]) {
		console.info('adding browser bundle', pkg.browser[pkg.exports[name].import])
		// also add browser file, for commonjs modules using bundlers
		results.push({
			input: pkg.browser[pkg.exports[name].import],
			output: {
				file: pkg.browser[pkg.exports[name].import].replace(/\.js$/, '.cjs'),
				name: name.match(/[^/]+$/)[0],
				format: 'cjs',
				strict: false,
				exports: 'default'
			},
			external,
		})
	}
	return results
}, [])
