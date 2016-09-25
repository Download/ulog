(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var log = __webpack_require__(1),
			qs = location.search.substring(1),
			args = qs && qs.split('&'),
			lvl, dbg, i, m
	
	for (i=0; m=args && args[i] && args[i].split('='); i++) {
		(m[0] == 'log') && (lvl = m[1])
		(m[0] == 'debug') && (dbg = m[1])
	}
	
	log.con = function(){return window.console && console}
	dbg && log.enable(dbg)
	module.exports = log()
	log.level = lvl || log.WARN


/***/ },
/* 1 */
/***/ function(module, exports) {

	function log(name){
		return name
			? (mods[name] ? mods[name] : (mods[name] = enhance({name:name}, log)))
			: (log.debug ? log : enhance(log))
	}
	
	log.ulog = {version:'0.1.0'}
	
	log.enable = function(str) {
		var i, split = (str || '').split(/[\s,]+/);
		for (i=0; i<split.length; i++) {
			if (split[i]) {
				str = split[i].replace(/\*/g, '.*?')
				if (str[0] === '-') skipMods.push(new RegExp('^' + str.substr(1) + '$'))
				else dbgMods.push(new RegExp('^' + str + '$'))
			}
		}
		for (i in mods) patch(mods[i], log)
	}
	
	log.enabled = function(name) {
		var i;
		for (i=0; i<skipMods.length; i++)
			if (skipMods[i].test(name)) return
		for (i=0; i<dbgMods.length; i++)
			if (dbgMods[i].test(name)) {return true}
	}
	
	log.disable = log.enable.bind(log, '')
	
	module.exports = log
	
	var LVL = {ERROR:1, WARN:2, INFO:3, LOG:4, DEBUG:5, TRACE:6},
			names = Object.keys(LVL).map(function(x){return x.toLowerCase()}),
			mods = {}, dbgMods = [], skipMods = []
	
	function enhance(o, parent, level) {
		o.NONE = 0
		for (var key in LVL) {o[key] = LVL[key]}
		Object.defineProperty(o, 'level', {
			get: function(){return level !== undefined ? level : parent && parent.level},
			set: function(n) {
				if ((n === undefined) && parent) {level = undefined}
				else {
					var lvl = n && (Number(n)!==Number(n) ? o[n.toUpperCase()] : Number(n))
					if (lvl >= 0 && lvl <= 6) {level = lvl}
				}
				patch(o, parent)
				if (!parent) {for (mod in mods) {patch(mods[mod], o)}}
			}
		})
		patch(o, parent)
		o.dir = bnd('dir') || nop
		o.time = bnd('time') || nop
		o.timeEnd = bnd('timeEnd') || nop
		o.assert = function(){
			var a=[].concat.apply([], arguments), ok=a.shift()
			if (!ok) {o.error.apply(o, a)}
		}
		return o
	}
	
	function patch(o, parent) {
		var lvl = Math.max(o.name && log.enabled(o.name) && o.DEBUG || o.level, o.level)
		for (var i=0,name; name=names[i]; i++) {
			o[name] = lvl <= i
				? nop
				: (
					bnd(name) ||
					(typeof print == 'function' && print) ||
					function(){
						if (log.con()) {
							patch(o)
							o[name].apply(o, arguments)
						}
					}
				)
		}
	}
	
	function bnd(n,c){return (c = log.con()) && (c[n]||c.log).bind(c)}
	function nop(){}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=ulog.umd.js.map