var merge = require('./merge')

module.exports = function(ulog, name, result) {
	ulog.mods.reduce(function(r,mod){
		if (Array.isArray(r) && (name in mod)) {
			r.push(mod[name])
		} else {
			merge(r, mod[name])
		}
		return r
	}, result)
	return result
}
