module.exports = function(cfg, newCfg) {
  var prop, changes = 0
  for (prop in cfg) {
    if (! (prop in newCfg)) {
      delete cfg[prop]
      changes++
    }
  }
  for (prop in newCfg) {
    if ((! (prop in cfg)) || (cfg[prop] !== newCfg[prop])) {
      cfg[prop] = newCfg[prop]
      changes++
    }
  }
  return changes
}
