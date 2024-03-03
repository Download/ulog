function pad(s: string, len: number, c: string, left: 0 | 1){
  var s = s.substring(0, len)
  for (var i=len-s.length; i>0; i--)
    s = left ? (c || ' ') + s : s + (c || ' ')
  return s
}
pad.RIGHT = 0 as const
pad.LEFT = 1 as const

export default pad
