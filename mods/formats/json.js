module.exports = function(ctx) {
  return function(rec) {
    return JSON.stringify(rec)
  }
}