import { hebrewPrefixSuffixMap, grammaticalDetailMap } from "./constants"

export const mergeAndUniquifyArraysOfScopeKeys = (...arrays) => {
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
}

export const getQueryArrayAndWords = query => {
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
          .replace(/([0-9]),([0-9]{3}),([0-9]{3})/g, "$1ESCAPEDCOMMA$2ESCAPEDCOMMA$3")
          .replace(/([0-9]),([0-9]{3})/g, "$1ESCAPEDCOMMA$2")
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
        .replace(/ESCAPEDCOMMA/g, ",")
      )

    const furtherParseQueryArray = (array, withinExactPhrase) => {

      // handle parentheses
      array.forEach((item, idx) => {
        while(item instanceof Array && item.filter(i => i !== '"').length === 1) {
          // remove meaningless parenthesis
          array[idx] = item = item.filter(i => i !== '"')[0]
        }
        if(item instanceof Array) {
          furtherParseQueryArray(item, withinExactPhrase || array.some(i => i === '"'))
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

      // first word of exact phrase cannot be #not:__ without any positive detail
      if(
        array[0] === '"'
        && /^(?:#not:[^#]+)+$/.test(array[1])
      ) throw `first word of exact phrase cannot be #not:__ without any positive detail`

      // subqueries of exact phrases cannot contain word represented by #not:__ without any positive detail
      if(
        withinExactPhrase
        && array.some(item => /^(?:#not:[^#]+)+$/.test(item))
      ) throw `exact phrases cannot contain groups with words represented by #not:__ without any positive detail`

    }
    furtherParseQueryArray(queryArray)

    if(queryWords.length === 0) throw `invalid query: no searchable words`

    return {
      queryArray,
      queryWords,
    }

  } catch(e) { throw typeof e === 'string' ? e : `invalid groupings` }
}

let lastClockTime = 0
let descriptionOfCurrentClockTimeSection = ``

export const clock = descriptionOfNextSection => {
  const newClockTime = Date.now()
  if(descriptionOfCurrentClockTimeSection) {
    console.log(descriptionOfCurrentClockTimeSection, `${newClockTime - lastClockTime}ms`)
  }
  lastClockTime = newClockTime
  descriptionOfCurrentClockTimeSection = descriptionOfNextSection
}

export const getWordDetails = ({ queryWords, isOriginalLanguageSearch }) => {

  let wordDetailsArray = []
  let getWordNumbersMatchingAllWordDetails

  if(isOriginalLanguageSearch) {

    const matchesAddlDetailsByWord = {}

    queryWords.forEach(word => {

      if(word[0] === '#') {

        const wordDetails = (
          word.slice(1).split('#')
            .map(rawDetails => {
              // convert form of details

              const isNot = /^not:/.test(rawDetails)
              rawDetails = rawDetails.replace(/^not:/, '')
              rawDetails = rawDetails.replace(/^suffix$/, 'suffix:s/p')
              const [ x, colonDetailType ] = rawDetails.match(/^([^:]+):/) || []
              const returnObjs = rawDetails.replace(/^[^:]+:/, '').split('/').map(rawDetail => {

                if(colonDetailType === 'lemma') {
                  return {
                    detail: `lemma:${rawDetail}`,
                    matches: wordInfo => wordInfo[3] === rawDetail,
                    avgRowSizeInKB: 7,
                  }
                }

                if(colonDetailType === 'form') {
                  return {
                    detail: `form:${rawDetail}`,
                    matches: wordInfo => wordInfo[1] === rawDetail,
                    avgRowSizeInKB: 5,
                  }
                }

                if(colonDetailType === 'suffix') {
                  let detail
                  const valuesToMatchByType = {}
                  rawDetail.split("").forEach(suffixDetail => {
                    if(/[123]/.test(suffixDetail)) {
                      detail = `suffixPerson:${suffixDetail}`
                      valuesToMatchByType.person = suffixDetail
                    } else if(/[mfbc]/.test(suffixDetail)) {
                      detail = `suffixGender:${suffixDetail}`
                      valuesToMatchByType.gender = suffixDetail
                    } else if(/[spd]/.test(suffixDetail)) {
                      detail = `suffixNumber:${suffixDetail}`
                      valuesToMatchByType.number = suffixDetail
                    }
                  })
                  return {
                    // Suffix is different than the other criteria in that we need items to match ALL of up to three elements.
                    // To faciliate this, we just get one of the scopeMaps via `detail` and then force a check on all details.
                    detail,
                    matches: wordInfo => (
                      (!valuesToMatchByType.person || (wordInfo[6] || "")[0] === valuesToMatchByType.person)
                      && (!valuesToMatchByType.gender || (wordInfo[6] || "")[1] === valuesToMatchByType.gender)
                      && (!valuesToMatchByType.number || (wordInfo[6] || "")[2] === valuesToMatchByType.number)
                    ),
                    avgRowSizeInKB: 0, //Infinity,  // preference against this since suffix needs to be included in getWordNumbersMatchingAllWordDetails no matter what
                    forceMatchOnWordDetails: true,
                  }
                }

                if(/^[GH][0-9]{5}$/.test(rawDetail)) {
                  return {
                    detail: `definitionId:${rawDetail}`,
                    matches: wordInfo => (
                      rawDetail[0] === wordInfo[4][0]  // matches H or G
                      && wordInfo[2] === parseInt(rawDetail.slice(1), 10)  // int form of strongs number matches
                    ),
                    avgRowSizeInKB: 7,
                  }
                }

                if(hebrewPrefixSuffixMap[rawDetail]) {
                  return hebrewPrefixSuffixMap[rawDetail]
                }

                if(grammaticalDetailMap[rawDetail]) {
                  return grammaticalDetailMap[rawDetail]
                }

                throw `unknown search token detail: ${colonDetailType ? `${colonDetailType}:` : ``}${rawDetail}`

              })

              if(returnObjs.length === 1) {
                return {
                  ...returnObjs[0],
                  isNot,
                }

              } else {
                return {
                  detail: returnObjs.map(({ detail }) => detail).flat(),
                  matches: wordInfo => returnObjs.some(({ matches }) => matches(wordInfo)),
                  avgRowSizeInKB: returnObjs.map(({ avgRowSizeInKB }) => avgRowSizeInKB).reduce((a,b) => a+b, 0) / returnObjs.length,
                  forceMatchOnWordDetails: returnObjs.some(({ forceMatchOnWordDetails }) => forceMatchOnWordDetails),
                  isNot,
                }
              }

            })
        )

        // extract the wordDetail with the fewest likely hits; the rest should be used in getWordNumbersMatchingAllWordDetails
        wordDetails.sort((a, b) => (a.isNot || a.avgRowSizeInKB > b.avgRowSizeInKB) ? 1 : -1)
        wordDetailsArray.push({ word, primaryDetail: wordDetails[0].detail, isNot: wordDetails[0].isNot })
        const wordDetailsToCheck = (
          wordDetails[0].forceMatchOnWordDetails
            ? wordDetails
            : wordDetails.slice(1)
        )
        const wordDetailsToCheckLength = wordDetailsToCheck.length
        matchesAddlDetailsByWord[word] = wordInfo => (
          wordDetailsToCheckLength > 1
            ? wordDetailsToCheck.every(({ matches, isNot }) => matches(wordInfo) === !isNot)
            : (
              wordDetailsToCheckLength === 0
                ? !wordDetails[0].isNot
                : wordDetailsToCheck[0].matches(wordInfo) === !wordDetailsToCheck[0].isNot
            )
        )

      } else if(word[0] === '=') {
        // TODO
        throw `"Words translated to..." search not yet available`

      } else {
        throw `Invalid search word: ${word}`
      }

    })

    getWordNumbersMatchingAllWordDetails = ({ word, infoObjOrWordNumbers, includeVariants }) => (
      infoObjOrWordNumbers
        .filter(wordInfo => (
          (
            includeVariants
            || wordInfo[0] !== null  // i.e. it is not a variant
          )
          && matchesAddlDetailsByWord[word](wordInfo)
        ))
        .map(wordInfo => wordInfo[0])
    )

  } else {  // translation search

    wordDetailsArray = queryWords.map(word => ({ word, primaryDetail: word }))
    getWordNumbersMatchingAllWordDetails = ({ infoObjOrWordNumbers }) => infoObjOrWordNumbers

  }

  return { wordDetailsArray, getWordNumbersMatchingAllWordDetails }

}

export const getLengthOfAllScopeMaps = (wordAlts, lookForIsNot) => (
  (
    [ '*', '...' ].includes(wordAlts)
    || (
      lookForIsNot
      && (wordAlts[0] || {}).isNot
    )
  )
    ? Infinity
    : (
      wordAlts.scopeKeys
        ? wordAlts.scopeKeys.length
        : wordAlts.reduce((total, { scopeMap }) => total + Object.values(scopeMap).length, 0)
    )
)