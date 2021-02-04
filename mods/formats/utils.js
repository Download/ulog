module.exports.makeStatic = function(fmt){
  fmt.toString = fmt
  return fmt
}

module.exports.makeStaticPipe = function(output, method, rec, args) {
  return method.bind.apply(method, [output].concat(args))
}
