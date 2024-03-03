import align from './align/utils.js'

export default function(rec: any, r: any){
  var a = align.hasAlign(rec.logger.output) && rec.logger.align && align
  r[0] = ((a && a.specifier && a.specifier[rec.level]) || '') + r[0]
  r.splice.apply(r, [1, 0].concat((a && a.args && a.args[rec.level]) || []))
  return r
}
