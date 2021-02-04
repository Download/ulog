"lvl name:22 date:yy/mm/dd perf"

"console file:./log.output url:https://deze-auto-kopen.nl component:( with nested components )"


function parse(str) {
  var tag, result = []
  if (str || (str === '')) {
    while (tag = nextTag(str)) {
      var before = str.substring(0, tag.index)
      if (before) result.push(before)
      result.push({
        name: tag.name,
        text: tag.text,
        ast: parse(tag.text)
      })
      str = str.substring(tag.end + 1)
    }
    if (str) result.push(str)
  }
  return result
}

function nextTag(str) {
  var match = str.match(/\{[_a-zA-Z][_a-zA-Z0-9]*([^_a-zA-Z0-9].*)?\}/)
  var result
  if (match) {
    var name = match[1] ? match[0].substring(1, match[0].indexOf(match[1])) : match[0].substring(1, match[0].indexOf('}'))
    result = { name: name, index: match.index, end: -1, text: '' }
    // loop through the string, parsing it as we go through it
    var esc = false
    var open=1 // we already found one open brace
    for (var i=match.index+name.length+1; i<str.length; i++) {
      var token = str[i]
      if (esc) {
        token = (token == 'n') ? '\n' :
                (token == 't') ? '\t' :
                (token == '{') ||
                (token == '}') ||
                (token == '\\') ? token :
                '\\' + token // unrecognized escape sequence is ignored
      }
      else {
        if (token === '{') {
          open++
        }
        if (token === '}') {
          open--
          if (!open) {
            result.end = i
            break
          }
        }
        if (token === '\\') {
          esc = true
          continue
        }
        if (!result.text && (token.search(/\s/)===0)) {
          continue
        }
      }
      result.text += token
      esc = false
    }
  }
  return result
}

/**
 * Compiles an abstract syntax tree into a function
 *
 * @param {Array<String|Object>} ast An abstract syntax tree created with `parse`
 * @param {Object} tags An object of tags keyed by tag name
 * @param {Function} parent Optionally, a compiled parent function for the ast
 *
 * @returns An array, possibly empty but never null or undefined.
 */
function compile(ast, tags, parent) {
  if (process.env.NODE_ENV != 'production') {
    log.debug('compile', ast, tags, parent)
    if ((ast === undefined) || (ast === null)) throw new Error('parameter `ast` is required')
    if (! Array.isArray(ast)) throw new Error('parameter `ast` must be an array')
    if ((tags === undefined) || (tags === null)) throw new Error('parameter `tags` is required')
    if (typeof tags != 'object') throw new Error('parameter `tags` must be an object')
  }

  // recursively compile the ast
  var nodes = ast.map(function(n){
    return typeof n == 'string'
        ? n :
        compile(n.ast, tags,
          tags[n.name] ? tags[n.name](n) :
          tags['*'] ? tags['*'](n) :
          undefined
        )
  })

  // create the result function
  var result = function(rec) {
    // clone rec into res
    var res = {}
    for (k in rec) res[k] = rec[k]
    // get the result children
    res.children = nodes.reduce(function(r, n){
      if (typeof n == 'function') n = n(rec)
      r.push.apply(r, Array.isArray(n) ? n : [n])
      return r
    }, [])
    // invoke parent if we have it
    return parent ? parent(res) : res.children
  }
  if (process.env.NODE_ENV != 'production') {
    log('compile', ast, tags, parent, '=>', '[Function]')
  }
  return result;
}


