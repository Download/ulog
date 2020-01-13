// ulog - microscopically small universal logging library
// © 2017 by Stijn de Witt, some rights reserved
// License: CC-BY-4.0

function log(n){
	return !n ? extend(log) : mods[n] || (mods[n] = extend(create(n), log))
}

log.formats = []
log.extends = []

log.enable = function(s) {
	var i, split = (s || '').split(/[\s,]+/);
	for (i=0; i<split.length; i++) {
		if (split[i]) {
			s = split[i].replace(/\*/g, '.*?')
			if (s[0] === '-') skipMods.push(new RegExp('^' + s.substr(1) + '$'))
			else dbgMods.push(new RegExp('^' + s + '$'))
		}
	}
	for (i in mods) patch(mods[i])
}

log.enabled = function(s) {
	var i;
	for (i=0; i<skipMods.length; i++)
		if (skipMods[i].test(s)) return
	for (i=0; i<dbgMods.length; i++)
		if (dbgMods[i].test(s)) {return true}
}

log.disable = log.enable.bind(log, '')

var LVL = {ERROR:1, WARN:2, INFO:3, LOG:4, DEBUG:5, TRACE:6},
		names = {error:1, warn:2, info:3, log:4, verbose:4, debug:5, trace:6, silly:6, dir:0, table:0, time:0, timeEnd:0, assert:0},
		mods = {}, dbgMods = [], skipMods = []

function create(n,r) {
	r = {};
	return Object.defineProperty(r, 'name', {get:function(){return n}})
}
		
function extend(o,p,l) {
	if (o.log) return
	o.NONE = 0
	o.ulog = {version:'2.0.0-beta.6'}
	for (var key in LVL) {o[key] = LVL[key]}
	Object.defineProperty(o, 'level', {
		get: function(){return l !== undefined ? l : p && p.level},
		set: function(n) {
			if ((n === undefined) && p) l = undefined
			else {
				var lvl = n && (Number(n)!==Number(n) ? o[n.toUpperCase()] : Number(n))
				if (lvl >= 0 && lvl <= 6) l = lvl
			}
			patch(o)
			if (!p) {for (var mod in mods) {patch(mods[mod])}}
		}
	})
	patch(o)
	for (var i=0; i<log.extends.length; i++) log.extends[i](o,p)
	return o
}

function patch(o) {
	var lvl = Math.max(o.name && log.enabled(o.name) && o.DEBUG || o.level, o.level)
	for (var n in names) {
		o[n] = lvl < names[n] ? nop : bnd(n) ||	(typeof print == 'function' && print) || nop
	}
}

function bnd(n,c){return (c = log.con()) && (c[n]||c.log).bind(c)}
function nop(){}

module.exports = log
