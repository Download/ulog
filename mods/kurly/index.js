module.exports = {
  use: [
    require('../formats'),
  ],

  formats: {
    // this will override the default wildcard format with the kurly format
    '*': require('./format'),
  },

  // some default formatters
  formatters: {
    name: require('./name'),
    lvl: require('./lvl'),
    date: require('./date'),
    time: require('./time'),
    perf: require('./perf'),
    '*': function(ctx){
      return function(rec){
        return rec[ctx.name]
      }
    }
  },
}
