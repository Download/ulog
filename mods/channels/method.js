module.exports = function(out, rec) {
  return out[rec.level] || out.log || function(){}
}