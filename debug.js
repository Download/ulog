var ulog = require('./')

ulog.formats.push(format);

module.exports = ulog;

function format(logger, method, args) {
  var t = new Date().getTime(),
      p = format.prev && format.prev.t || t
  format.prev = { t }
  args.unshift(
    time(t,1,1,1), 
    diff(t,p),
    name(logger.name)
  )
}

function time(t,h,m,s){
  var d = new Date(t)
  return '' +
      (h ? pad(LEFT, d.getHours(), 2, '0') + (m || s ? ':' : '') : '') +
      (m ? pad(LEFT, d.getMinutes(), 2, '0') + (s ? ':' : '') : '') + 
      (s ? pad(LEFT, d.getSeconds(), 2, '0') : '')
}

function diff(t,p) {
  var d = new Date(t - p), 
      days = d.getUTCDate() - 1, 
      h = d.getUTCHours(), 
      m = d.getUTCMinutes(), 
      s = d.getUTCSeconds(),
      f = Math.floor,
      ms = (t - p - s*1000)
  return pad(LEFT, (
    t-p<1000?(t-p>10? '.' + pad(LEFT, f((t-p)/10), 2, '0') : '') : // ms
    days ? days + 'd' + pad(LEFT, h, 2, '0') :
    h ? h + 'h' + pad(LEFT, m, 2, '0') :  
    m ? m + 'm' + pad(LEFT, s, 2, '0') :  
    s ? s + '.' + pad(LEFT, f(ms/10), 2, '0') : 
    ''
  ), 5)
}

function name(n) {
  return pad(RIGHT, n.substring(0, 24), 24)
}

var LEFT=1, 
    RIGHT=0

function pad(s,x,l,p) {
  x = String(x)
  p = p || ' '
  if (x.length > l || (s && x.length == l)) return x
  l -= x.length
  p = (p + repeat(p, l / p.length)).slice(0,l)
  return (s?p:'') + x + (s?'':p);
}

function repeat(x,c,s) {
  if (!x.length || !c) return ''
  s = ''
  while(c>0) {s+=x; c--}
  return s;  
}
