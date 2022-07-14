import iso6393Info from './iso6393Info'

export const findLanguage = ({ searchStr, maxNumHits=10 }) => {
  const wordSplitRegex = / \(| |-/g
  const normalizedSearchStrArray = normalizeSearchStr({ str: searchStr }).split(wordSplitRegex)

  const hits = []

  for(let i=0; i<iso6393Info.length;) {
    const foundIdx = iso6393Info.slice(i).findIndex(info => {
      const nameWords = [ ...info[0].split(wordSplitRegex), ...(info[5] || '').split(wordSplitRegex) ].filter(Boolean)
      return (
        normalizedSearchStrArray
          .every(searchWord => (
            nameWords.some(nameWord => (
              normalizeSearchStr({ str: nameWord }).indexOf(searchWord) === 0
            ))
          ))
      )
    })

    if(foundIdx === -1) break

    const foundInfo = iso6393Info[i + foundIdx]
    hits.push({
      englishName: foundInfo[0],
      iso6393: foundInfo[1],
      nativeName: foundInfo[5] || foundInfo[0],
    })

    if(hits.length >= maxNumHits) break

    i += foundIdx + 1
  }

  return hits
}

export const getLanguageInfo = iso6393 => {
  const [
    englishName,
    x,
    iso6392b,
    iso6392t,
    iso6391,
    nativeName,
    definitionPreferencesForVerbs=[ "#infinitive-construct", "#infinitive", "#participle#1st#singular", "#present#1st#singular" ],
    standardWordDivider=' ',
    phraseDividerRegex=`[–,;—:\\(\\)\\[\\]\\{\\}\\|\\"\\'“”‘’~«»]`,
    sentenceDividerRegex=`[\\.\\?¿!]`,
  ] = iso6393Info.find(([ englishName, i3 ]) => i3 === iso6393) || []

  return {
    englishName,
    iso6393,
    iso6392b,
    iso6392t,
    iso6391,
    nativeName: nativeName || englishName,
    definitionPreferencesForVerbs,
    standardWordDivider,
    phraseDividerRegex,
    sentenceDividerRegex,
  }
}