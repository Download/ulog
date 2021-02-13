var ulog = require('anylogger')
var grab = require('./grab')

var ext = ulog.ext

/**
 * `ulog.ext(logger) => logger`
 *
 * Called when a logger needs to be extended, either because it was newly
 * created, or because it's configuration or settings changed in some way.
 *
 * This method must ensure that a log method is available on the logger
 * for each level in `ulog.levels`.
 *
 * This override calls `ext` on all mods when a logger is extended and
 * enables calling ext on all loggers by passing no arguments.
 */
ulog.ext = function(logger) {
	if (logger) {
		ext(logger)
		grab(ulog, 'ext', []).map(function(ext){
			ext.call(ulog, logger)
		})
		grab(ulog, 'after', []).map(function(ext){
			ext.call(ulog, logger)
		})
		return logger
	} else {
		for (logger in ulog()) {
			ulog.ext(ulog(logger))
		}
	}
}

ulog.mods = []

/**
 * ### `ulog.use(mod: Object|Array<Object>): Number`
 *
 * Makes ulog use `mod`.
 *
 * The mod(s) is/are added to `ulog.mods`. This function checks whether `mod`
 * is already in use and only adds it if needed. Checks whether `mod` has a key
 * `use` containing mods `mod` depends on and adding those first, guaranteeing
 * the order in which mods are added. Returns the total number of mods added,
 * including transitive dependencies.
 *
 * @param mod A single mod object or an array of mod objects.
 * @returns The number of mods that were added
 *
 * E.g.:
 * ```
 * var mod = require('./mod')
 * var solo = {} // the simplest mod is just an empty object
 * var using = {
 *   // you can declare a dependency on other mods
 *   use: [
 *     mod
 *   ]
 * }
 *
 * ulog.add(solo)  // returns 1
 * ulog.add(solo)  // returns 0, because mods are only added once
 * ulog.add(using) // returns 2, because `using` depends on `mod`
 * ulog.add(mod)   // returns 0, because `mod` was already added by `using`
 * ```
 */
ulog.use = function(mod) {
	// handle mod being an array of mods
	if (Array.isArray(mod)) {
		return mod.reduce(function(r,mod){return r + ulog.use(mod)}, 0)
	}
	// // handle mod being a single mod
	var result = ulog.mods.indexOf(mod) === -1 ? 1 : 0
	if (result) {
		if (mod.use) {
			// use dependencies
			result += ulog.use(mod.use)
		}
		if (mod.extend) {
			for (var name in mod.extend) {
				ulog[name] = mod.extend[name]
			}
		}
		ulog.mods.push(mod)
		if (mod.init) {
			mod.init.call(ulog)
		}
	}
	return result
}

// ulog.grab = function(name){
// 	return ulog.mods.reduce(function(r,mod){
// 		for (var o in mod[name]) {
// 			r[o] = mod[name][o]
// 		}
// 		return r
// 	}, {})
// }

// var recorders = []
// for (var i=0,mod; mod=ulog.mods[i]; i++) {
// 	if (mod.record) recorders.push(mod.record)
// }


// ulog.enabled = ulog.get.bind(ulog, 'debug')
// ulog.enable = ulog.set.bind(ulog, 'debug')
// ulog.disable = ulog.set.bind(ulog, 'debug', undefined)

module.exports = ulog
