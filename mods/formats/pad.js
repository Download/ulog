var pad = module.exports = function(s, len, c, left){
  var s = s.substring(0, len)
  for (var i=len-s.length; i>0; i--)
    s = left ? (c || ' ') + s : s + (c || ' ')
  return s
}
pad.RIGHT = 0
pad.LEFT = 1
