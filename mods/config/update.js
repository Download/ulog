module.exports = function(cfg, newCfg) {
  var name, changes = []
  for (name in cfg) {
    if (! (name in newCfg)) {
      changes.push({ name: name, old: cfg[name] })
      delete cfg[name]
    }
  }
  for (name in newCfg) {
    if ((! (name in cfg)) || (cfg[name] !== newCfg[name])) {
      if (! (name in cfg)) {
        changes.push({ name: name, new: newCfg[name] })
      } else {
        changes.push({ name: name, old: cfg[name], new: newCfg[name] })
      }
      cfg[name] = newCfg[name]
    }
  }
  return changes
}
