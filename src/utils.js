let lastClockTime = 0
let descriptionOfCurrentClockTimeSection = ``

module.exports = {

  getQueryAndFlagInfo: ({ query, FLAG_MAP={} }) => {

    // extract special query flags
    const flags = {}
    const flagRegex = /(\s|^)([-a-z]+:(?:[:-\w,/]+))(?=\s|$)/i

    query = (query || "")
      .split(flagRegex)
      .filter(piece => {

        if(flagRegex.test(piece)) {
          let [ flag, ...flagValuePieces ] = piece.split(':')
          let flagValue = flagValuePieces.join(':')

          if(FLAG_MAP[flag]) {
            const { multiValue, possibleValues } = FLAG_MAP[flag]
            const flagValues = flagValue.split(/[\/,]/g)

            if(
              !possibleValues
              || flagValues.every(val => (
                val instanceof RegExp
                  ? val.test(val)
                  : val.includes(val)
              ))
            ) {
              if(flags[flag] && multiValue) {
                flags[flag].push(...flagValues)
              } else {
                flags[flag] = multiValue ? flagValues : flagValue
              }
              return false
            }
          }
        }

        return true

      })
      .join('')
      .replace(/  +/g, ' ')
      .trim()

    return { query, flags }
  },

  mergeAndUniquifyArraysOfScopeKeys: (...arrays) => {
    // NOTE: Built to be as fast as possible on large arrays

    const findSmallestScopeKey = scopeKeys => {
      if(scopeKeys.length === 0) return scopeKeys[0]

      let smallestScopeKey, smallestPart1, smallestPart2

      scopeKeys.forEach(scopeKey => {
        const [ part1, part2=0 ] = scopeKey.split(/[-:]/g).map(part => parseInt(part, 10))

        if(
          !smallestScopeKey
          || part1 < smallestPart1
          || (
            part1 === smallestPart1
            && part2 < smallestPart2
          )
        ) {
          smallestPart1 = part1
          smallestPart2 = part2
          smallestScopeKey = scopeKey
        }
      })

      return smallestScopeKey
    }

    let merged = []
    let indexes = Array(arrays.length).fill(0)

    while(true) {
      const nextValue = findSmallestScopeKey(arrays.map((array, idx) => indexes[idx] >= array.length ? '99999999' : array[indexes[idx]]))
      if(nextValue === '99999999') break

      merged.push(nextValue)

      arrays.forEach((array, idx) => {
        while(array[indexes[idx]] === nextValue) indexes[idx]++
      })
    }

    return merged
  },

  getQueryArrayAndWords: query => {
    try {

      // Example
        // query: `a b (c / "d* ... e" / ("(f "g h") ... i * (2+ j k l)" m))`
        // queryWords: ["a","b","c","d*","e","f","g","h","i","j","k","l","m"]
        // queryArray:
          // [
          //   "a",
          //   "b",
          //   [
          //     "1+",
          //     "c",
          //     [
          //       "\"",
          //       "d*",
          //       "...",
          //       "e",
          //     ],
          //     [
          //       [
          //         "\"",
          //         [
          //           "f",
          //           [
          //             "\"",
          //             "g",
          //             "h",
          //           ]
          //         ],
          //         "...",
          //         "i",
          //         "*",
          //         [
          //           "2+",
          //           "j",
          //           "k",
          //           "l"
          //         ],
          //       ],
          //       "m"
          //     ]
          //   ]
          // ]

      if(/[\\\[]#=…]/.test(query)) throw `illegal character(s) in search query`
      if(query.replace(/ \.\.\. /g, '').indexOf('.') !== -1) throw `illegal period(s) in search query`

      const queryWords = []
      const queryArray = JSON.parse(
        `[${
          query
            // next line: put space around chinese and japanese characters to treat them as separate words
            .replace(/([\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f])/g, ' $1 ')
            .replace(/"/g, ',"\\"",')
            .replace(/([^ ()",\\]+)/g, '"$1"')
            .replace(/\(\)]/g, "")
            .replace(/ +/g, ",")
            .replace(/,,+/g, ",")
            .replace(/\(/g, "[")
            .replace(/\)/g, "]")
        }]`
          .replace(/\[,/g, "[")
          .replace(/,]/g, "]")
      )

      const furtherParseQueryArray = array => {

        // handle parentheses
        array.forEach((item, idx) => {
          while(item instanceof Array && item.filter(i => i !== '"').length === 1) {
            // remove meaningless parenthesis
            array[idx] = item = item.filter(i => i !== '"')[0]
          }
          if(item instanceof Array) {
            furtherParseQueryArray(item)
          }
          if(
            typeof item === 'string'
            && /^[^".+*]+[*+~]?$/.test(item)
            && item !== '/'
            && !queryWords.includes(item)
          ) {
            queryWords.push(item)
          }
        })

        // handle quotes
        const quoteIndexes = array.reduce((a, e, i) => ([ ...a, ...(e === '"' ? [i] : []) ]), [])
        if(quoteIndexes.length === 2) {
          if(quoteIndexes[1] - quoteIndexes[0] === 2) {
            // single word is quoted, which is meaningless; removing quotation marks
            array.splice(quoteIndexes[1], 1)
            array.splice(quoteIndexes[0], 1)
          } else if(quoteIndexes[0] === 0 && quoteIndexes[1] === array.length - 1) {
            // no need to put it is subarray; just remove last quotation mark
            array.pop()
          } else {
            // move to subarray
            const quotedSection = array.splice(quoteIndexes[0], quoteIndexes[1] - quoteIndexes[0] + 1)
            array.splice(quoteIndexes[0], 0, quotedSection.slice(0,-1))
          }
        } else if(quoteIndexes.length !== 0) {
          throw `unmatching quotation marks`
        }

        // handle slashes
        const hasProperSlashesForOr = (
          array.length > 1
          && array.length % 2 === 1
          && array.every((item, idx) => (idx % 2 === 0 || item === '/'))
          && array[0] !== '"'
        )
        if(hasProperSlashesForOr) {
          array.splice(0, array.length, '1+', ...array.filter(i => i !== '/'))
        } else if(array.indexOf("/") !== -1) {
          throw `invalid slashes`
        }

        // check 2+ syntax
        if(array.some((item, idx) => (
          typeof item === 'string'
          && /^[0-9]+\+$/.test(item)
          && !(
            idx === 0
            && parseInt(item.slice(0, -1), 10) < array.length - 1
          )
        ))) throw `misuse of 2+`

        // check * syntax
        if(array.some(item => (
          typeof item === 'string'
          && /\*/.test(item)
          && !/^[^*]*\*$/.test(item)
        ))) throw `misuse of *`

        // check ..., * placement (cannot be at beginning/end or back-to-back)
        const ellipsisAndAsteriskIndexes = array.reduce((a, e, i) => ([ ...a, ...([ '...', '*' ].includes(e) ? [i] : []) ]), [])
        if(
          ellipsisAndAsteriskIndexes[0] === 0
          || ellipsisAndAsteriskIndexes.pop() === array.length - 1
          || ellipsisAndAsteriskIndexes.some((arrayIdx, idx) => arrayIdx === ellipsisAndAsteriskIndexes[idx - 1] + 1)
        ) throw `misplacement of ... or *`

        // check ..., * only with exact segment
        if(
          array.find(item => [ '*', '...' ].includes(item))
          && array[0] !== '"'
        ) throw `* and ... can only be used within quotation marks`

      }
      furtherParseQueryArray(queryArray)

      if(queryWords.length === 0) throw `invalid query: no searchable words`

      return {
        queryArray,
        queryWords,
      }

    } catch(e) { throw typeof e === 'string' ? e : `invalid groupings` }
  },

  clock: descriptionOfNextSection => {
    const newClockTime = Date.now()
    if(descriptionOfCurrentClockTimeSection) {
      console.log(descriptionOfCurrentClockTimeSection, `${newClockTime - lastClockTime}ms`)
    }
    lastClockTime = newClockTime
    descriptionOfCurrentClockTimeSection = descriptionOfNextSection
  },

  getWordDetails: ({ queryWords, isOriginalLanguageSearch }) => {

    let wordDetailsArray = []
    let getWordNumbersMatchingAllWordDetails

    if(isOriginalLanguageSearch) {

      queryWords.forEach(word => {

        if(word[0] === '#') {

          const wordDetails = (
            word.slice(1).split('#')
              .map(wordDetail => {
                // convert form of details

                if(/^[GH][0-9]{5}$/.test(wordDetail)) {
                  return `definitionId:${wordDetail}`
                }

                // TODO: all the parsing values need to be converted (eg. #noun => #pos:N)

                // TODO: This is wrong due to the reality of the / operator
                // if(/^suffix:/.test(wordDetail)) {
                //   return (
                //     wordDetail
                //       .split(':')[1]
                //       .split("/")
                //       .map(suffixOption => (
                //         suffixOption
                //           .split("")
                //           .map(suffixDetail => {
                //             let suffixType = "Person"
                //             if(/[msbc]/.test(suffixDetail)) {
                //               suffixType = "Gender"
                //             }
                //             if(/[spd]/.test(suffixDetail)) {
                //               suffixType = "Number"
                //             }
                //             return `suffix${suffixType}:${suffixDetail}`
                //           })
                //       ))
                //   )
                // }

                return wordDetail

              })
              // .flat(2)
          )
          
          // TODO: extract the wordDetail with the fewest likely hits; the rest should go into addlWordDetails
          // wordDetails.slice(1)
          wordDetailsArray.push({ word, primaryDetail: wordDetails[0] })

        } else if(word[0] === '=') {
          // TODO
          throw `"Words translated to..." search not yet available`

        } else {
          throw `Invalid search word: ${word}`
        }

      })

      getWordNumbersMatchingAllWordDetails = ({ word, infoObjOrWordNumbers }) => infoObjOrWordNumbers.map(wordInfo => wordInfo[0])

    } else {  // translation search

      wordDetailsArray = queryWords.map(word => ({ word, primaryDetail: word }))
      getWordNumbersMatchingAllWordDetails = ({ infoObjOrWordNumbers }) => infoObjOrWordNumbers

    }

    return { wordDetailsArray, getWordNumbersMatchingAllWordDetails }

  },

}