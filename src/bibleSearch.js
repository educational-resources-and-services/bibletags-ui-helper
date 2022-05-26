import "regenerator-runtime/runtime.js"  // needed to build-for-node given async functions

import { bibleSearchScopes, allVerseNumberScopeKeysByBookId } from './constants'
import { mergeAndUniquifyArraysOfScopeKeys, getQueryArrayAndWords, clock, getWordDetails, getLengthOfAllScopeMaps } from './utils'
import { getInfoOnResultLocs } from './bibleSearchUtils'
import { getWordsHash } from "./index"

const WILD_CARD_LIMIT = 100

export const bibleSearch = async ({
  query,
  flags,
  hebrewOrdering,
  offset,
  limit,
  getVersions,
  getUnitWords,
  getUnitRanges,
  getVerses,
  getTagSetsByIds,
  maxNumVersion=5,
  doClocking=false,
}) => {

  doClocking && clock(`Query prep`)

  // TODO: make sure the query does not exceed maximum complexity

  // get versionIds, bookIds, and includeVariants
  let versionIds = []
  const bookIds = {}
  ;(flags.in || []).forEach(val => {
    if(bibleSearchScopes[val]) {
      bibleSearchScopes[val].forEach(bookId => {
        bookIds[bookId] = true
      })
    } else {
      versionIds.push(val)
    }
  })

  const includeVariants = (flags.include || []).includes('variants')

  const originalVersionIds = [ 'uhb', 'ugnt', 'lxx' ]
  const isOriginalLanguageSearch = versionIds.some(versionId => originalVersionIds.includes(versionId))

  if(isOriginalLanguageSearch && !versionIds.every(versionId => originalVersionIds.includes(versionId))) throw `in flag contains mixed original and translation versionIds`

  if(includeVariants && !isOriginalLanguageSearch) throw `include:variants only allowed for original language searches`

  if(versionIds.length > maxNumVersion) throw `exceeded maximum number of versions`

  const versions = await getVersions(versionIds)

  if(versionIds.length !== versions.length) throw `one or more invalid versions`

  let { same="verse" } = flags
  if(isOriginalLanguageSearch && same === "verse") {
    same = "verseNumber"
  }

  if(!isOriginalLanguageSearch && versionIds.length > 1 && same !== "verse") throw `forbidden to search multiple versions when not using same:verse for the range`

  const { queryArray, queryWords } = getQueryArrayAndWords(query)

  const stackedResultsByBookId = Array(1+66).fill().map(() => [])
  const stackedResultsIdxByScopeKey = {}
  const versionById = {}
  const resultCountByVersionId = {}
  const wordResultsByVersionId = {}
  let hitsByBookId = Array(1+66).fill(0)

  doClocking && clock(`Get words for all versions`)

  const { wordDetailsArray, getWordNumbersMatchingAllWordDetails } = getWordDetails({ queryWords, isOriginalLanguageSearch })

  const allRows = []
  await Promise.all(versions.map(async version => {

    versionById[version.id] = version
    resultCountByVersionId[version.id] = 0

    // get a row with scope map for each word
    wordResultsByVersionId[version.id] = {}
    await Promise.all(wordDetailsArray.map(async ({ word, primaryDetail, isNot }) => {

      const unitWordRows = await getUnitWords({
        versionId: version.id,
        id: (
          primaryDetail instanceof Array
            ? primaryDetail.map(detail => `${same}:${detail}`)
            : `${same}:${primaryDetail}`
        ),
        limit: WILD_CARD_LIMIT,
      })

      if(unitWordRows.length === WILD_CARD_LIMIT) throw `Word with wildcard character (*) matches too many different words`

      unitWordRows.forEach(row => {
        row.scopeMap = JSON.parse(row.scopeMap)
        row.word = word
        row.isNot = isNot
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

      wordResultsByVersionId[version.id][word] = unitWordRows
      allRows.push(...unitWordRows)

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
      const noWordsHavePositiveDetails = subqueryAndWordResults.every(rowsOrResultObj => (rowsOrResultObj[0] || {}).isNot)
      const someWordsHaveNoPositiveDetails = subqueryAndWordResults.some(rowsOrResultObj => (rowsOrResultObj[0] || {}).isNot)

      if(noWordsHavePositiveDetails || (isOr && someWordsHaveNoPositiveDetails)) {

        scopeKeysToExamine = (
          allVerseNumberScopeKeysByBookId
            .filter((scopeKeys, bookId) => (
              (
                Object.values(bookIds).length === 0
                || bookIds.includes(bookId)
              )
              && (
                !versionById[versionId].partialScope
                || (
                  versionById[versionId].partialScope === 'ot'
                  && bookId <= 39
                )
                || (
                  versionById[versionId].partialScope === 'nt'
                  && bookId >= 40
                )
              )
            ))
            .flat()
        )

      } else if(isOr) {

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
          (a, b) => getLengthOfAllScopeMaps(a, true) < getLengthOfAllScopeMaps(b, true) ? a : b,
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
            subqueryOrWordResult.forEach(({ scopeMap, word, isNot }) => {

              if(isNot || scopeMap[scopeKey]) {
                const wordNumbersMatchingAllWordDetails = (
                  scopeMap[scopeKey]
                    ? getWordNumbersMatchingAllWordDetails({ word, infoObjOrWordNumbers: scopeMap[scopeKey], includeVariants })
                    : [ 0 ]  // this is a hit, but its wordNumber doesn't matter
                )

                if(isFirstItemInGroup) {
                  if(isOr) {
                    updatedHits.push(...wordNumbersMatchingAllWordDetails.map(wordNumber => [ wordNumber ]))
                  } else {
                    updatedHits.push(...wordNumbersMatchingAllWordDetails.map(wordNumber => [ wordNumber, wordNumber ]))
                    numPossibleHitsForThisWord += wordNumbersMatchingAllWordDetails.length
                  }
                } else {
                  wordNumbersMatchingAllWordDetails.forEach(wordNumber => {
                    let thisWordNumberIsPossibleHit = false
                    if(isOr) {
                      updatedHits.push(...hits.filter(hit => hit.length < minimumNumHits).map(hit => [ ...hit, wordNumber ]))
                      if(numWordsInGroup - idx >= minimumNumHits) updatedHits.push([ wordNumber ])
                    } else if(isExactPhrase) {
                      hits.forEach(hit => {
                        const soughtWordNumber = hit[1] + 1 + exactPhrasePlaceholderSpotsToShift
                        if(
                          wordNumber === 0  // i.e. is #not:__ hit
                          || wordNumber === soughtWordNumber
                          || (
                            doExactPhraseFollowedBy
                            && wordNumber > hit[1]
                          )
                        ) {
                          updatedHits.push([ hit[0], wordNumber || soughtWordNumber ])
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

      hitsByBookId[bookId] += numHitsByScopeKey[scopeKey]

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

  })

  if(
    !(
      (
        versionIds.length === 1  // not stacked
        || isOriginalLanguageSearch
      )
      && (
        queryArray[0] === '"'  // exact phrase at base level
        || queryArray.length === 1  // only one unit at base level
      )
    )
  ) {
    hitsByBookId = null
  }

  doClocking && clock(`Get count and arrange ordering`)

  const rowCountByBookId = stackedResultsByBookId.map(a => a.length)

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

  if(!isOriginalLanguageSearch && versionIds.length > 1) {
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
  }

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

    const versionIdsToGetUnitRangesFrom = isOriginalLanguageSearch ? versionIds : versionIds.slice(0, 1)
    await Promise.all(versionIdsToGetUnitRangesFrom.map(async versionId => {
      const unitRanges = await getUnitRanges({ versionId, ids })
      unitRanges.forEach(({ id, originalLoc }) => {
        resultNeedingOriginalLocById[id].originalLoc = originalLoc
      })
    }))

  }

  doClocking && clock(`Get usfm for result being returned`)

  const resultsByVersionIdNeedingUsfm = []
  results.forEach(result => {
    const { versionId } = result.versionResults[0]
    resultsByVersionIdNeedingUsfm[versionId] = resultsByVersionIdNeedingUsfm[versionId] || []
    resultsByVersionIdNeedingUsfm[versionId].push(result)
  })
  const tagSetIds = []
  const versionResultsNeedingUsfmByVersionIdAndLoc = {}

  await Promise.all(Object.keys(resultsByVersionIdNeedingUsfm).map(async versionId => {

    const resultsNeedingUsfm = resultsByVersionIdNeedingUsfm[versionId]
    const { locs, versionResultsNeedingUsfmByLoc } = getInfoOnResultLocs({ resultsNeedingUsfm, lookupVersionInfo: versionById[versionId] })
    versionResultsNeedingUsfmByVersionIdAndLoc[versionId] = versionResultsNeedingUsfmByLoc

    const verses = await getVerses({ versionId, locs })

    verses.forEach(({ loc, usfm }) => {
      versionResultsNeedingUsfmByLoc[loc][0].usfm.push(usfm)
      if(!isOriginalLanguageSearch) {
        tagSetIds.push(`${loc}-${versionId}-${getWordsHash({ usfm, wordDividerRegex: versionById[versionId].wordDividerRegex })}`)
      }
    })

  }))

  results.forEach(result => {
    result.versionResults[0].usfm = result.versionResults[0].usfm.join("\n")
  })

  if(!isOriginalLanguageSearch && tagSetIds.length > 0) {

    doClocking && clock(`Get tagSets for result being returned`)

    const tagSets = await getTagSetsByIds(tagSetIds)

    tagSets.forEach(tagSet => {
      const [ loc, versionId ] = tagSet.id.split('-')
      const resultObj = versionResultsNeedingUsfmByVersionIdAndLoc[versionId][loc][0]
      resultObj.tagSets = resultObj.tagSets || []
      resultObj.tagSets.push(tagSet)
    })

  }

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
    rowCountByBookId,
    hitsByBookId,
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
          tagSets: [
            ...
          ],
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