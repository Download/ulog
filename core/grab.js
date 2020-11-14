module.exports = function(ulog, name, result) {
	ulog.mods.reduce(function(r,item){
		if (Array.isArray(r) && (name in item)) {
			r.push(item[name])
		} else {
			for (var o in item[name])
        r[o] = item[name][o]
		}
		return r
  }, result)
  return result
}
