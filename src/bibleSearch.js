const { getOriginalLocsFromRange, getCorrespondingRefs, getRefFromLoc, getLocFromRef } = require('@bibletags/bibletags-versification')

const { bibleSearchScopes } = require('./constants.js')
const { getQueryAndFlagInfo, mergeAndUniquifyArraysOfScopeKeys, getQueryArrayAndWords, clock } = require('./utils')

const FLAG_MAP = {
  in: {
    multiValue: true,
  },
  include: {
    multiValue: true,
  },
  same: {
    possibleValues: [
      'verse',
      'phrase',
      'sentence',
      'paragraph',
    ],
  },
}

const WILD_CARD_LIMIT = 100

const getLengthOfAllScopeMaps = wordAlts => (
  [ '*', '...' ].includes(wordAlts)
    ? Infinity
    : (
      wordAlts.scopeKeys
        ? wordAlts.scopeKeys.length
        : wordAlts.reduce((total, { scopeMap }) => total + Object.values(scopeMap).length, 0)
    )
)

export const bibleSearch = async ({
  query: queryWithFlags,
  hebrewOrdering,
  offset,
  limit,
  getVersions,
  getWords,
  getUnitRanges,
  getVerses,
  maxNumVersion=5,
  doClocking=false,
}) => {

  const { query, flags } = getQueryAndFlagInfo({ query: queryWithFlags, FLAG_MAP })

  const isOriginalLanguageSearch = /^\(?"?[#=]/.test(query)

  doClocking && clock(`Query prep`)

  // TODO: make sure the query does not exceed maximum complexity

  // get versionIds, bookIds, and includeVariants
  let versionIds = []
  const bookIds = {}
  flags.in.forEach(val => {
    if(bibleSearchScopes[val]) {
      bibleSearchScopes[val].forEach(bookId => {
        bookIds[bookId] = true
      })
    } else {
      versionIds.push(val)
    }
  })
  if(isOriginalLanguageSearch) {
    versionIds = flags.include.map(versionId => versionId !== 'variants')
  }
  const includeVariants = flags.include.includes('variants')

  if(versionIds.length > maxNumVersion) throw `exceeded maximum number of versions`

  const versions = await getVersions(versionIds)

  if(versionIds.length !== versions.length) throw `one or more invalid versions`

  const { same="verse" } = flags

  if(!isOriginalLanguageSearch && versionIds.length > 1 && same !== "verse") throw `forbidden to search multiple versions when not using same:verse for the range`

  const { queryArray, queryWords } = getQueryArrayAndWords(query)

  const stackedResultsByBookId = Array(1+66).fill().map(() => [])
  const stackedResultsIdxByScopeKey = {}
  const versionById = {}
  const resultCountByVersionId = {}
  const wordResultsByVersionId = {}
  let totalHits = null

  doClocking && clock(`Get words for all versions`)

  const allRows = []
  await Promise.all(versions.map(async version => {

    versionById[version.id] = version
    resultCountByVersionId[version.id] = 0

    // get a row with scope map for each word
    wordResultsByVersionId[version.id] = {}
    await Promise.all(queryWords.map(async word => {
      const wordRows = await getWords({
        versionId: version.id,
        id: `${same}:${word}`,
        limit: WILD_CARD_LIMIT,
      })
      if(wordRows.length === WILD_CARD_LIMIT) throw `Word with wildcard character (*) matches too many different words`
      wordRows.forEach(row => {
        row.scopeMap = JSON.parse(row.scopeMap)
        if(Object.values(bookIds).length > 0) {
          for(let scopeKey in row.scopeMap) {
            if(
              (
                same === 'verse'
                && !bookIds[scopeKey.slice(0,2).replace(/^0/, '')]
              )
              || (
                same !== 'verse'
                && !bookIds[scopeKey.split(':')[0]]
              )
            ) {
              delete row.scopeMap[scopeKey]
            }
          }
        }
      })
      wordResultsByVersionId[version.id][word] = wordRows
      allRows.push(...wordRows)
    }))

  }))

  if(getLengthOfAllScopeMaps(allRows) > 100000) {
    throw `Search exceeds maximum complexity`
  }

  // for each version, in order
  versionIds.forEach(versionId => {

    const evaluateGroup = group => {

      const isExactPhrase = group[0] === '"'
      const isOr = /^[0-9]+\+$/.test(group[0])
      const minimumNumHits = isOr && parseInt(group[0].slice(0, -1), 10)

      // run subqueries
      const subqueryAndWordResults = group.slice((isExactPhrase || isOr) ? 1 : 0).map(item => (
        item instanceof Array
          ? evaluateGroup(item)
          : (wordResultsByVersionId[versionId][item] || item)
      ))

      doClocking && clock(`Get scopeKeys for eval of group: ${group.map(i => typeof i === 'string' ? i : '[]').join(" ")} (${versionId})`)

      let scopeKeysToExamine

      if(isOr) {

        scopeKeysToExamine = mergeAndUniquifyArraysOfScopeKeys(
          ...(
            subqueryAndWordResults
              .map(rowsOrResultObj => (
                rowsOrResultObj.scopeKeys
                  ? [ rowsOrResultObj.scopeKeys ]
                  : rowsOrResultObj.map(({ scopeMap }) => Object.keys(scopeMap))
              ))
              .flat()
          )
        )

      } else {  // it is a normal AND or an exact phrase

        const shortestSubqueryAndWordResult = subqueryAndWordResults.slice(1).reduce(
          (a, b) => getLengthOfAllScopeMaps(a) < getLengthOfAllScopeMaps(b) ? a : b,
          subqueryAndWordResults[0],
        )
        scopeKeysToExamine = (
          shortestSubqueryAndWordResult.scopeKeys
          || (
            shortestSubqueryAndWordResult.length <= 1
              ? Object.keys((shortestSubqueryAndWordResult[0] || {}).scopeMap || [])
              : mergeAndUniquifyArraysOfScopeKeys(...shortestSubqueryAndWordResult.map(({ scopeMap }) => Object.keys(scopeMap)))
          )
        )

      }

      doClocking && clock(`Evaluate group: ${group.map(i => typeof i === 'string' ? i : '[]').join(" ")} (${versionId})`)

      // loop through the scope keys of the shortest
      const scopeKeys = []
      const hitsByScopeKey = {}
      const numHitsByScopeKey = {}
      scopeKeysToExamine.forEach(scopeKey => {

        // find hits, noting result info
        let hits = []
        let minPossibleHitsOfAnyWord = Infinity
        let exactPhrasePlaceholderSpotsToShift = 0
        let doExactPhraseFollowedBy = true
        const numWordsInGroup = subqueryAndWordResults.length
        subqueryAndWordResults.forEach((subqueryOrWordResult, idx) => {

          if(subqueryOrWordResult === '*') {
            exactPhrasePlaceholderSpotsToShift++
            return
          }

          if(subqueryOrWordResult === '...') {
            doExactPhraseFollowedBy = true
            return
          }

          const isFirstItemInGroup = idx === 0
          let updatedHits = []
          let numPossibleHitsForThisWord = 0

          if(isOr) {
            const remainingNumWordsInGroupAfterThisOne = numWordsInGroup - idx - 1
            updatedHits.push(...hits.filter(hit => hit.length + remainingNumWordsInGroupAfterThisOne >= minimumNumHits))
          }

          if(subqueryOrWordResult.hitsByScopeKey) {
            if(subqueryOrWordResult.hitsByScopeKey[scopeKey]) {

              if(isFirstItemInGroup) {
                if(isOr) {
                  updatedHits = subqueryOrWordResult.hitsByScopeKey[scopeKey].map(subqueryHits => [ subqueryHits ])
                } else {
                  updatedHits = subqueryOrWordResult.hitsByScopeKey[scopeKey]
                  numPossibleHitsForThisWord += subqueryOrWordResult.numHitsByScopeKey[scopeKey]
                }
              } else {
                subqueryOrWordResult.hitsByScopeKey[scopeKey].forEach(subqueryHit => {
                  let thisWordNumberIsPossibleHit = false
                  if(isOr) {
                    updatedHits.push(...hits.filter(hit => hit.length < minimumNumHits).map(hit => [ ...hit, subqueryHit ]))
                    if(numWordsInGroup - idx >= minimumNumHits) updatedHits.push([ subqueryHit ])
                  } else if(isExactPhrase) {
                    hits.forEach(hit => {
                      if(
                        subqueryHit[0] === hit[1] + 1 + exactPhrasePlaceholderSpotsToShift
                        || (
                          doExactPhraseFollowedBy
                          && subqueryHit[0] > hit[1]
                        )
                      ) {
                        updatedHits.push([ hit[0], subqueryHit[1] ])
                        thisWordNumberIsPossibleHit = true
                      }
                    })
                  } else {
                    hits.forEach(hit => {
                      updatedHits.push([ Math.min(subqueryHit[0], hit[0]), Math.max(subqueryHit[1], hit[1]) ])
                      thisWordNumberIsPossibleHit = true
                    })
                  }
                  if(thisWordNumberIsPossibleHit) numPossibleHitsForThisWord++
                })
              }

            }

          } else {
            subqueryOrWordResult.forEach(({ scopeMap }) => {

              if(scopeMap[scopeKey]) {
                if(isFirstItemInGroup) {
                  if(isOr) {
                    updatedHits.push(...scopeMap[scopeKey].map(wordNumber => [ wordNumber ]))
                  } else {
                    updatedHits.push(...scopeMap[scopeKey].map(wordNumber => [ wordNumber, wordNumber ]))
                    numPossibleHitsForThisWord += scopeMap[scopeKey].length
                  }
                } else {
                  scopeMap[scopeKey].forEach(wordNumber => {
                    let thisWordNumberIsPossibleHit = false
                    if(isOr) {
                      updatedHits.push(...hits.filter(hit => hit.length < minimumNumHits).map(hit => [ ...hit, wordNumber ]))
                      if(numWordsInGroup - idx >= minimumNumHits) updatedHits.push([ wordNumber ])
                    } else if(isExactPhrase) {
                      hits.forEach(hit => {
                        if(
                          wordNumber === hit[1] + 1 + exactPhrasePlaceholderSpotsToShift
                          || (
                            doExactPhraseFollowedBy
                            && wordNumber > hit[1]
                          )
                        ) {
                          updatedHits.push([ hit[0], wordNumber ])
                          thisWordNumberIsPossibleHit = true
                        }
                      })
                    } else {
                      hits.forEach(hit => {
                        updatedHits.push([ Math.min(wordNumber, hit[0]), Math.max(wordNumber, hit[1]) ])
                        thisWordNumberIsPossibleHit = true
                      })
                    }
                    if(thisWordNumberIsPossibleHit) numPossibleHitsForThisWord++
                  })
                }
              }
            })
          }

          hits = updatedHits
          exactPhrasePlaceholderSpotsToShift = 0
          doExactPhraseFollowedBy = 0
          minPossibleHitsOfAnyWord = Math.min(minPossibleHitsOfAnyWord, numPossibleHitsForThisWord)

        })

        if(hits.length > 0) {

          if(isOr) {
            // transform hits into proper length-2 min/max wordNumber array
            hits = hits.map(hit => {
              if(hit.length !== minimumNumHits) throw `buggy 'OR' query; hit length (${JSON.stringify(hit)}) !== min number of hits for the group (${minimumNumHits})`
              return [ Math.min(...hit.flat()), Math.max(...hit.flat()) ]
            })
          }

          scopeKeys.push(scopeKey)
          hitsByScopeKey[scopeKey] = hits
          numHitsByScopeKey[scopeKey] = (isExactPhrase || group.length === 1) ? minPossibleHitsOfAnyWord : 1
        }

      })

      return {
        scopeKeys,
        hitsByScopeKey,
        numHitsByScopeKey,
      }

    }

    const { scopeKeys, numHitsByScopeKey } = evaluateGroup(queryArray)

    doClocking && clock(`Add results to stack (${versionId})`)

    scopeKeys.forEach(scopeKey => {

      const bookId = (
        same === 'verse'
          ? parseInt(scopeKey.split('-')[0].slice(0,-6), 10)
          : parseInt(scopeKey.split(':')[0], 10)
      )

      resultCountByVersionId[versionId]++

      if(resultCountByVersionId[versionId] > offset + limit || stackedResultsIdxByScopeKey[scopeKey] === true) {  // this block solely for performance reasons
        if(stackedResultsIdxByScopeKey[scopeKey] === undefined) {
          stackedResultsByBookId[bookId].push(true)
          stackedResultsIdxByScopeKey[scopeKey] = true
        }
      } else {
        if(stackedResultsIdxByScopeKey[scopeKey] !== undefined) {
          stackedResultsByBookId[bookId][stackedResultsIdxByScopeKey[scopeKey]].versionResults.push({ versionId })
        } else {
          const newStackedResultsRow = {
            scopeKey,
            versionResults: [{ versionId, usfm: [] }],  // first one gets usfm
          }
          if(same === 'verse') {
            newStackedResultsRow.originalLoc = scopeKey.replace(/-$/, '')
          }
          stackedResultsByBookId[bookId].push(newStackedResultsRow)
          stackedResultsIdxByScopeKey[scopeKey] = stackedResultsByBookId[bookId].length - 1
        }
      }

    })

    if(
      versionIds.length === 1  // not stacked
      && (
        queryArray[0] === '"'  // exact phrase at base level
        || queryArray.length === 1  // only one unit at base level
      )
    ) {
      totalHits = Object.values(numHitsByScopeKey).reduce((a, b) => a + b, 0)
    }

  })

  doClocking && clock(`Get count and arrange ordering`)

  const countByBookId = stackedResultsByBookId.map(a => a.length)

  if(hebrewOrdering) {
    // TODO: reorder stackedResultsByBookId
  }

  doClocking && clock(`Sort result for books within the return range`)

  let resultCountForSort = 0
  const bookIdsInReturnRange = (
    stackedResultsByBookId
      .map((stackedResults, bookId) => {
        resultCountForSort += stackedResults.length
        if(
          resultCountForSort > offset
          && resultCountForSort - stackedResults.length < offset + limit
          && stackedResults.length > 0
        ) return bookId
      })
      .filter(Boolean)
  )

  bookIdsInReturnRange.forEach(bookId => {
    if(same === 'verse') {
      // scopeKey is originalLoc
      stackedResultsByBookId[bookId].sort((a, b) => (a.originalLoc || 'x') > (b.originalLoc || 'x') ? 1 : -1)  // the 'x' is greater than all originalLoc
    } else {
      stackedResultsByBookId[bookId].sort((a, b) => {
        const unitNumberA = parseInt((a.scopeKey || "").split(':')[1], 10) || Infinity
        const unitNumberB = parseInt((b.scopeKey || "").split(':')[1], 10) || Infinity
        return unitNumberA > unitNumberB ? 1 : -1
      })
    }
  })

  doClocking && clock(`Get result subset to return`)

  const results = stackedResultsByBookId.flat().slice(offset, offset + limit)

  if(same !== 'verse') {

    doClocking && clock(`Get originalLoc for result being returned`)

    const ids = []
    const resultNeedingOriginalLocById = {}
    results.forEach(result => {
      const id = `${same}:${result.scopeKey}`
      ids.push(id)
      resultNeedingOriginalLocById[id] = result
    })

    const unitRanges = await getUnitRanges({ versionId: versionIds[0], ids })

    unitRanges.forEach(({ id, originalLoc }) => {
      resultNeedingOriginalLocById[id].originalLoc = originalLoc
    })

  }

  doClocking && clock(`Get usfm for result being returned`)

  const resultsByVersionIdNeedingUsfm = []
  results.forEach(result => {
    const { versionId } = result.versionResults[0]
    resultsByVersionIdNeedingUsfm[versionId] = resultsByVersionIdNeedingUsfm[versionId] || []
    resultsByVersionIdNeedingUsfm[versionId].push(result)
  })

  await Promise.all(Object.keys(resultsByVersionIdNeedingUsfm).map(async versionId => {

    const resultsNeedingUsfm = resultsByVersionIdNeedingUsfm[versionId]
    const versionResultNeedingUsfmByLoc = {}

    const locs = (
      resultsNeedingUsfm
        .map(({ originalLoc, versionResults }) => {
          let [ originalFromLoc, originalToLoc ] = originalLoc.split('-')

          const originalLocsForThisResult = (
            (!originalToLoc || originalFromLoc === originalToLoc)
              ? [ originalFromLoc ]
              : getOriginalLocsFromRange(originalFromLoc, originalToLoc)
          )

          const locsForThisResult = (
            originalLocsForThisResult
              .map(originalLoc => {

                const refs = getCorrespondingRefs({
                  baseVersion: {
                    info: {
                      versificationModel: 'original',
                    },
                    ref: getRefFromLoc(originalLoc),
                  },
                  lookupVersionInfo: versionById[versionId],
                })
                const locs = refs.map(ref => getLocFromRef(ref).split(':')[0])

                locs.forEach(loc => {
                  versionResultNeedingUsfmByLoc[loc] = versionResults[0]
                })

                return locs
              })
              .flat()
          )

          return locsForThisResult
        })
        .flat()
    )

    const verses = await getVerses({ versionId, locs })

    verses.forEach(({ loc, usfm }) => {
      versionResultNeedingUsfmByLoc[loc].usfm.push(usfm)
    })

  }))

  results.forEach(result => {
    result.versionResults[0].usfm = result.versionResults[0].usfm.join("\n")
  })

  doClocking && clock(``)

  // if total count <= limit, get otherSuggestedQueries
    // for multi-word search without quotes... when few/no results, also do searches with one word left out of each, telling the user how many results would be available if they scratched that word
    // for multi-word search with quotes... when few/no results, also do non-quoted search, telling the user how many results would be available if they scratched that word

  // const otherSuggestedQueries = [{
  //   suggestedQuery,
  //   resultCount,
  // }]

  return {
    results,
    countByBookId,
    totalHits,
    otherSuggestedQueries: [],
  }

}

/*

  Example result rows:

    {
      originalLoc: `${fromLoc}-${toLoc}`,
      versionResults: [
        {
          versionId: "esv",
          usfm: "...",
        },
        {
          versionId: "nasb",
        },
        {
          versionId: "net",
        },
      ],
    }

    {
      originalLoc: `${fromLoc}-${toLoc}`,
      versionResults: [
        {
          versionId: "uhb",
          usfm: "...",
        },
        {
          versionId: "nasb",
          usfm: "...",
          tagSets: [
            ...
          ],
        },
      ],
    }

*/