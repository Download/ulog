(function(u,m,d){
	if (typeof define == 'function' && define.amd) define(m,[],d)
	else if (typeof module == 'object' && module.exports) module.exports = d()
	else u[m] = d()
})(this, 'ulog', function(){'use strict'

// ulog - microscopically small universal logging library
// © 2016 by Stijn de Witt, some rights reserved
// License: CC-BY-4.0

function log(name){
	return name
		? (mods[name] ? mods[name] : (mods[name] = enhance({name:name}, log)))
		: (log.debug ? log : enhance(log))
}

log.ulog = {version:'1.0.3'}

log.enable = function(str) {
	var i, split = (str || '').split(/[\s,]+/);
	for (i=0; i<split.length; i++) {
		if (split[i]) {
			str = split[i].replace(/\*/g, '.*?')
			if (str[0] === '-') skipMods.push(new RegExp('^' + str.substr(1) + '$'))
			else dbgMods.push(new RegExp('^' + str + '$'))
		}
	}
	for (i in mods) patch(mods[i])
}

log.enabled = function(name) {
	var i;
	for (i=0; i<skipMods.length; i++)
		if (skipMods[i].test(name)) return
	for (i=0; i<dbgMods.length; i++)
		if (dbgMods[i].test(name)) {return true}
}

log.disable = log.enable.bind(log, '')

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
			patch(o)
			if (!parent) {for (mod in mods) {patch(mods[mod])}}
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

function patch(o) {
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


var qs = location.search.substring(1),
		args = qs && qs.split('&'),
		lvl, dbg, i, m

for (i=0; m=args && args[i] && args[i].split('='); i++) {
	m[0] == 'log' ? lvl = m[1] : 0
	m[0] == 'debug' ? dbg = m[1] : 0
}

log.con = function(){return window.console && console}
dbg && log.enable(dbg)
var ulog = log()
log.level = lvl || log.WARN

return ulog

}) // umd
