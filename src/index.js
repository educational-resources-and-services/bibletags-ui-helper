import md5 from 'md5'
import { getRefFromLoc, getNumberOfChapters, numberOfVersesPerChapterPerBook, getLocFromRef } from "@bibletags/bibletags-versification"
import { Buffer } from 'buffer'

import i18n, { i18nNumber } from './i18n'
import { getHebrewPOSTerm, getHebrewMorphPartDisplayInfo } from './hebrewMorph'
import { getGreekPOSTerm, getGreekMorphPartDisplayInfo, getNormalizedGreekPOSCode } from './greekMorph'
import { splitVerseIntoWords } from './splitting'
import { findAutoCompleteSuggestions } from './bibleSearchUtils'

export * from './greekMorph'
export * from './hebrewMorph'
export * from './splitting'
export * from './i18n'
export * from './constants'
export * from './utils'
export * from './bibleSearch'
export * from './bibleSearchUtils'
export * from './originalWordConversion'
export * from './language'

export const getOrigLangVersionIdFromRef = ref => ref.bookId <= 39 ? 'uhb' : 'ugnt'

export const getOrigLangAndLXXVersionInfo = () => ({
  uhb: {
    id: 'uhb',
    name: 'unfoldingWord Hebrew Bible',
    languageId: 'heb',
    partialScope: 'ot',
    versificationModel: 'original',
    isOriginal: true,
  },
  ugnt: {
    id: 'ugnt',
    name: 'unfoldingWord Greek New Testament',
    languageId: 'grc',
    partialScope: 'nt',
    versificationModel: 'original',
    isOriginal: true,
  },
  lxx: {
    id: 'lxx',
    name: 'Rahlfs Septuagint',
    languageId: 'grc',
    partialScope: 'ot',
    versificationModel: 'lxx',
  },
})

export const getOrigLanguageText = languageId => {
  return {
    heb: i18n("Hebrew"),
    grc: i18n("Greek"),
  }[languageId]
}

export const getVersionStr = versionId => {
  const origLangAndLXXVersionInfo = getOrigLangAndLXXVersionInfo()

  return origLangAndLXXVersionInfo[versionId]
    ? `${getOrigLanguageText(origLangAndLXXVersionInfo[versionId].languageId)} (${versionId.toUpperCase()})`
    : versionId.toUpperCase()
}

export const getRefsInfo = ({ refs, skipBookName, abbreviated, usfmBookAbbr }) => {
  const info = {}

  const getBaseLoc = ref => (ref.loc || getLocFromRef(ref)).split(':')[0]
  const isStartAndEndWithSameBaseLoc = refs.length === 2 && getBaseLoc(refs[0]) === getBaseLoc(refs[1])
  const fromRefHasWordRangeStartingFrom1 = ((refs[0].wordRanges || [])[0] || ``).split('-')[0] === '1'

  refs.forEach((ref, idx) => {
    const { wordRanges } = ref
    const { bookId, chapter, verse } = ref.loc ? getRefFromLoc(ref.loc) : ref

    if(info.book === undefined) {
      info.book = skipBookName
        ? ""
        : (
          usfmBookAbbr
            ? getUsfmBibleBookAbbr(bookId)
            : (
              abbreviated
                ? getBibleBookAbbreviatedName(bookId)
                : getBibleBookName(bookId)
            )
        )
    }
      
    if(chapter != null) {
      if(!info.chapter && !info.start_chapter) {
        info.chapter = chapter
      } else if((info.chapter || info.start_chapter) !== chapter) {
        info.start_chapter = info.start_chapter || info.chapter
        info.end_chapter = chapter
        delete info.chapter
      }
    }

    if(verse != null) {
      let verseText
      if(wordRanges || isStartAndEndWithSameBaseLoc) {
        if(
          // fromRef and starts from 1
          (idx === 0 && fromRefHasWordRangeStartingFrom1)
          // toRef and not isStartAndEndWithSameBaseLoc
          || (idx === 1 && !isStartAndEndWithSameBaseLoc)
        ) {
            verseText = i18n("{{verse}}a", { verse })
        } else if(
          // fromRef and does not start from 1
          (idx === 0 && !fromRefHasWordRangeStartingFrom1)
          // toRef and isStartAndEndWithSameBaseLoc and fromRef starts from 1
          || (idx === 1 && isStartAndEndWithSameBaseLoc && fromRefHasWordRangeStartingFrom1)
        ) {
          verseText = i18n("{{verse}}b", { verse })
        } else {  // toRef and isStartAndEndWithSameBaseLoc and fromRef does not start from 1
          verseText = i18n("{{verse}}c", { verse })
        }
      } else {
        verseText = verse
      }
      if(info.verse == null && info.start_verse == null) {
        info.verse = verseText
      } else {
        info.start_verse = info.start_verse != null ? info.start_verse : info.verse
        info.end_verse = verseText
        delete info.verse
      }
    }
  })

  return info
}

export const getPassageStr = params => {
  const info = getRefsInfo(params)

  // modify chapter and verse numeric representation
  if(info.chapter) {
    info.chapter = i18nNumber({ num: info.chapter, type: 'chapter' })
  }
  if(info.start_chapter) {
    info.start_chapter = i18nNumber({ num: info.start_chapter, type: 'chapter' })
  }
  if(info.end_chapter) {
    info.end_chapter = i18nNumber({ num: info.end_chapter, type: 'chapter' })
  }
  if(info.verse != null) {
    info.verse = i18nNumber({ num: info.verse, type: 'verse' })
  }
  if(info.start_verse != null) {
    info.start_verse = (
      info.start_verse === 0
        ? i18n("[title]", "", "represents a psalm title")
        : i18nNumber({ num: info.start_verse, type: 'verse' })
    )
  }
  if(info.end_verse != null) {
    info.end_verse = i18nNumber({ num: info.end_verse, type: 'verse' })
  }

  if(info.start_chapter && info.start_verse != null) {
    return i18n("{{book}} {{start_chapter}}:{{start_verse}}–{{end_chapter}}:{{end_verse}}", info).trim()
  }

  if(info.chapter && info.start_verse != null) {
    return i18n("{{book}} {{chapter}}:{{start_verse}}–{{end_verse}}", info).trim()
  }

  if(info.start_chapter) {
    return i18n("{{book}} {{start_chapter}}–{{end_chapter}}", info).trim()
  }

  if(info.verse != null) {
    return i18n("{{book}} {{chapter}}:{{verse}}", info).trim()
  }

  if(info.chapter) {
    return i18n("{{book}} {{chapter}}", info).trim()
  }

  return info.book || ""
}

export const getBookSuggestionOptions = () => {

  const indicateBookId = (book, bookId) => ({
    suggestedQuery: book,
    bookId,
  })

  let bookSuggestionOptions = (
    [
      ...getBibleBookNames().map(indicateBookId),
      ...getBibleBookAbbreviatedNames().map(indicateBookId),
    ].filter(({ suggestedQuery }) => suggestedQuery)
  )

  const digitWithSpaceAfterRegex = /^([1-4]) /
  bookSuggestionOptions = [
    ...bookSuggestionOptions,
    ...(
      bookSuggestionOptions
        .map(({ suggestedQuery, bookId }) => (
          digitWithSpaceAfterRegex.test(suggestedQuery)
            ? {
              suggestedQuery: suggestedQuery.replace(digitWithSpaceAfterRegex, '$1'),
              bookId,
            }
            : null
        ))
        .filter(Boolean)
    ),
    {
      suggestedQuery: i18n("Psalm", "", "book"),
      bookId: 19,
    },
    {
      suggestedQuery: i18n("Song of Solomon", "", "book"),
      bookId: 22,
    },
  ]

  return bookSuggestionOptions
}

export const getPassageInfoArrayFromText = ({
  text,
  contextRef,  // TODO: use this to parse things like `vs 3`, `ch 2-4`, `vs. 2,3`, `v2,3`, `verses 3-5`, `verse 3`, etc (consider i18n)
  allowApproximateBookNames,
  mustIncludeEntirety,
  // TODO: make this function generally work with i18n!
  // TODO: also accept languageIds or the like and find refs in any listed languages
}) => {

  const infoArray = []

  const bookSuggestionOptions = getBookSuggestionOptions()
  const chapterAndVersePartRegexStr = `([0-9]{1,3})(?:[:.]([0-9]{1,3}))?([a-c]|ff?)?(?:[-–]([0-9]{1,3})(?:[:.]([0-9]{1,3}))?([a-c]|ff?)?)?(?!\\p{Letter}|[0-9-–:_+&/%])`

  let matchArr
  const bookPortionOfRegex = (
    allowApproximateBookNames
      ? `((?:\\p{Letter}|[0-9-–:_+&/%])+(?: (?:\\p{Letter}|[0-9-–:_+&/%])+){0,3})`  // assumes maximum of four-word book names
      : `(${bookSuggestionOptions.map(({ suggestedQuery }) => suggestedQuery).join('|')})`
  )
  const searchRegex = new RegExp(`${mustIncludeEntirety ? `^` : ``}${bookPortionOfRegex} ${chapterAndVersePartRegexStr}`, `giu`)

  while((matchArr = searchRegex.exec(text)) !== null) {

    if(matchArr.index > 0 && /(?:\p{Letter}|[0-9-–:_+&/%])/u.test(text[matchArr.index-1])) continue

    let [
      entirety,
      book,
      startChapter,
      startVerse,
      startIgnoreText=``,
      endChapter,
      endVerse,
      endIgnoreText=``,
    ] = matchArr

    let versionId
    const refSets = []

    const bookId = (
      parseInt(
        (
          findAutoCompleteSuggestions({
            str: book,
            suggestionOptions: bookSuggestionOptions,
            max: 1,
          })[0] || {}
        ).bookId,
        10,
      )
    )

    if(!bookId) {
      if(/ /.test(book) && allowApproximateBookNames && !mustIncludeEntirety) {
        // remove first word and see if it now is a passage ref
        searchRegex.lastIndex = matchArr.index + book.indexOf(' ')
      }
      continue
    }

    // if ignore texts are uppercase at all, then this is not a match
    if(/[A-Z]/.test(`${startIgnoreText}${endIgnoreText}`)) continue

    // get comma add-ons if they exist; try all separately and increase lastIndex on regex
    const negativeLookaheadBookPortionOfRegex = bookPortionOfRegex.replace(/^\(/, '(?!')
    const [ commaAddOnStr=`` ] = text.slice(searchRegex.lastIndex).match(new RegExp(`^(?:[,;] ?${negativeLookaheadBookPortionOfRegex}${chapterAndVersePartRegexStr})+`, `u`)) || []
    const commaAddOns = commaAddOnStr.match(/[,;] ?[^,;]+/g) || []
    if(commaAddOns.length) {
      entirety += commaAddOnStr
      searchRegex.lastIndex += commaAddOnStr.length
    }

    // get version abbr add-ons if it exists; increase lastIndex on regex
    const [ versionAbbrPlus=`` ] = text.slice(searchRegex.lastIndex).match(/^ (?:[A-Z0-9]{2,9}|\([A-Z0-9]{2,9}\)|\[[A-Z0-9]{2,9}\]|\{[A-Z0-9]{2,9}\})(?!\p{Letter}|[0-9-–:_+&/%])/u) || []
    if(versionAbbrPlus) {
      entirety += versionAbbrPlus
      searchRegex.lastIndex += versionAbbrPlus.length
      versionId = versionAbbrPlus.replace(/[[\](){} ]/g, '').toLowerCase()
    }

    if(mustIncludeEntirety && searchRegex.lastIndex !== entirety.length) break


    const addRefIfValid = ({
      startChapter,
      startVerse,
      endChapter,
      endVerse,
    }) => {

      // 1 [ch OR vs (if single chapter book)]
      // 1-2 [ch-ch OR vs-vs (if single chapter book)]
      // 1:1 [ch:vs]
      // 1:1-2 [ch:vs-vs]
      // 1:1-2:2 [ch:vs-ch:vs]
      // 1-2:2 [ch-ch:vs]

      // if(!startVerse && endVerse) return  // i.e. 1-2:2 (invalid)
      if(!startVerse && endVerse) {  // i.e. 1-2:2 [ch-ch:vs]
        startVerse = 1
      }

      if(startChapter && startVerse && endChapter && !endVerse) {  // i.e. 1:1-2
        endVerse = endChapter
        endChapter = startChapter
      }

      if(numberOfVersesPerChapterPerBook[bookId-1].length === 1 && !startVerse) {  // i.e 1 OR 1-2
        startVerse = startChapter
        startChapter = `1`
        if(endChapter) {
          endVerse = endChapter
          endChapter = `1`
        }
      }

      endChapter = endChapter || (endVerse ? startChapter : undefined)

      if(parseInt(endChapter || startChapter, 10) > (bookId === 39 ? 4 : numberOfVersesPerChapterPerBook[bookId-1].length)) return

      let refs = [{
        bookId,
        chapter: parseInt(startChapter, 10),
        ...(!startVerse ? {} : { verse: parseInt(startVerse, 10) }),
      }]

      if(startVerse !== endVerse || startChapter !== endChapter) {
        refs.push({
          bookId,
          chapter: parseInt(endChapter, 10),
          ...(!endVerse ? {} : { verse: parseInt(endVerse, 10) }),
        })
      }

      refs = refs.filter(({ chapter, verse }) => chapter && verse !== NaN)

      if(
        refs.length > 1
        && (
          refs[0].chapter > refs[1].chapter
          || (
            refs[0].chapter === refs[1].chapter
            && refs[0].verse !== undefined
            && refs[0].verse > (refs[1].verse || 0)
          )
        )
      ) return  // from and to portions out of order

      if(refs.length > 0) {
        refSets.push(refs)
      }

    }

    addRefIfValid({
      startChapter,
      startVerse,
      endChapter,
      endVerse,
    })

    if(refSets.length > 0) {

      commaAddOns.forEach(commaAddOn => {

        const [ x, connector, addOn ] = commaAddOn.match(/^([,;]) ?([^,;]+)$/)

        let [
          entireAddOn,
          startChapter,
          startVerse,
          startIgnoreText,
          endChapter,
          endVerse,
          endIgnoreText,
        ] = addOn.match(new RegExp(chapterAndVersePartRegexStr, 'u'))

        if(
          connector === `,`
          && refSets.at(-1).at(-1).verse !== undefined
          && !startVerse
        ) {
          startVerse = startChapter
          startChapter = `${refSets.at(-1).at(-1).chapter}`
        }

        addRefIfValid({
          startChapter,
          startVerse,
          endChapter,
          endVerse,
        })

      })

      infoArray.push({
        startCharacterIndex: matchArr.index,
        endCharacterIndex: matchArr.index + entirety.length,
        refSets,
        versionId,
      })

    }

  }

  return infoArray

}

export const getRefsFromPassageStr = passageStr => {

  const normalizedPassageStr = (
    passageStr
      .replace(/  +/g, ' ')
      .trim()
  )

  const info = getPassageInfoArrayFromText({
    text: normalizedPassageStr,
    allowApproximateBookNames: true,
    mustIncludeEntirety: true,
  })[0]

  if(!info) return null

  return {
    refs: info.refSets[0],
    versionId: info.versionId,
  }

}

export const getBibleBookNames = () => ([
  "",
  i18n("Genesis", "", "book"),
  i18n("Exodus", "", "book"),
  i18n("Leviticus", "", "book"),
  i18n("Numbers", "", "book"),
  i18n("Deuteronomy", "", "book"),
  i18n("Joshua", "", "book"),
  i18n("Judges", "", "book"),
  i18n("Ruth", "", "book"),
  i18n("1 Samuel", "", "book"),
  i18n("2 Samuel", "", "book"),
  i18n("1 Kings", "", "book"),
  i18n("2 Kings", "", "book"),
  i18n("1 Chronicles", "", "book"),
  i18n("2 Chronicles", "", "book"),
  i18n("Ezra", "", "book"),
  i18n("Nehemiah", "", "book"),
  i18n("Esther", "", "book"),
  i18n("Job", "", "book"),
  i18n("Psalms", "", "book"),
  i18n("Proverbs", "", "book"),
  i18n("Ecclesiastes", "", "book"),
  i18n("Song of Songs", "", "book"),
  i18n("Isaiah", "", "book"),
  i18n("Jeremiah", "", "book"),
  i18n("Lamentations", "", "book"),
  i18n("Ezekiel", "", "book"),
  i18n("Daniel", "", "book"),
  i18n("Hosea", "", "book"),
  i18n("Joel", "", "book"),
  i18n("Amos", "", "book"),
  i18n("Obadiah", "", "book"),
  i18n("Jonah", "", "book"),
  i18n("Micah", "", "book"),
  i18n("Nahum", "", "book"),
  i18n("Habakkuk", "", "book"),
  i18n("Zephaniah", "", "book"),
  i18n("Haggai", "", "book"),
  i18n("Zechariah", "", "book"),
  i18n("Malachi", "", "book"),
  i18n("Matthew", "", "book"),
  i18n("Mark", "", "book"),
  i18n("Luke", "", "book"),
  i18n("John", "", "book"),
  i18n("Acts", "", "book"),
  i18n("Romans", "", "book"),
  i18n("1 Corinthians", "", "book"),
  i18n("2 Corinthians", "", "book"),
  i18n("Galatians", "", "book"),
  i18n("Ephesians", "", "book"),
  i18n("Philippians", "", "book"),
  i18n("Colossians", "", "book"),
  i18n("1 Thessalonians", "", "book"),
  i18n("2 Thessalonians", "", "book"),
  i18n("1 Timothy", "", "book"),
  i18n("2 Timothy", "", "book"),
  i18n("Titus", "", "book"),
  i18n("Philemon", "", "book"),
  i18n("Hebrews", "", "book"),
  i18n("James", "", "book"),
  i18n("1 Peter", "", "book"),
  i18n("2 Peter", "", "book"),
  i18n("1 John", "", "book"),
  i18n("2 John", "", "book"),
  i18n("3 John", "", "book"),
  i18n("Jude", "", "book"),
  i18n("Revelation", "", "book"),
])

export const getBibleBookName = bookId => getBibleBookNames()[bookId]

const usfmBookAbbr = [
  "",
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
  "MAT",
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
]

export const getUsfmBibleBookAbbr = bookId => usfmBookAbbr[bookId]
export const getBookIdFromUsfmBibleBookAbbr = abbr => usfmBookAbbr.indexOf(abbr)

export const getRefsFromUsfmRefStr = usfmRefStr => {
  const [ usfmBibleBookAbbr, chaptersAndVerses ] = usfmRefStr.split(' ')
  const [ startChapterAndVerse, endChapterAndVerse ] = chaptersAndVerses.split('-')
  let [ startChapter, startVerse ] = startChapterAndVerse.split(':')

  const bookId = getBookIdFromUsfmBibleBookAbbr(usfmBibleBookAbbr)

  const isSingleChapterBook = (
    getNumberOfChapters({
      versionInfo: {
        versificationModel: 'original',  // since single-chapter books are version specific, just use this
      },
      bookId,
    }) === 1
  )

  if(isSingleChapterBook && startVerse === undefined) {
    startVerse = startChapter
    startChapter = 1
  }

  const refs = [
    getRefFromLoc(
      `${(`0${bookId}`).substr(-2)}${(`00${startChapter}`).substr(-3)}${(`00${startVerse === undefined ? 1 : startVerse}`).substr(-3)}`
    )
  ]

  let endChapter, endVerse

  if(endChapterAndVerse) {
    const endChapterAndVerseSplit = endChapterAndVerse.split(':')

    if(isSingleChapterBook && endChapterAndVerseSplit.length === 1) {
      endChapterAndVerseSplit.unshift(1)
    }

    if(startVerse === undefined) {
      endChapter = endChapterAndVerseSplit[0]
      endVerse = 999
    } else if(endChapterAndVerseSplit.length > 1) {
      endChapter = endChapterAndVerseSplit[0]
      endVerse = endChapterAndVerseSplit[1]
    } else {
      endChapter = startChapter
      endVerse = endChapterAndVerseSplit[0]
    }

  } else if(startVerse === undefined) {

    endChapter = startChapter
    endVerse = 999
  
  }

  if(endChapter) {
    refs.push(
      getRefFromLoc(
        `${(`0${getBookIdFromUsfmBibleBookAbbr(usfmBibleBookAbbr)}`).substr(-2)}${(`00${endChapter}`).substr(-3)}${(`00${endVerse}`).substr(-3)}`
      )  
    )
  }

  return refs
}  

export const getUsfmRefStrFromLoc = loc => {

  const refs = loc.split('-').map(l => getRefFromLoc(l))

  const { book, chapter, verse, start_chapter, start_verse, end_chapter, end_verse } = getRefsInfo({
    refs,
    usfmBookAbbr: true,
  })

  if(start_chapter && start_verse) {
    return `${book} ${start_chapter}:${start_verse}–${end_chapter}:${end_verse}`
  }

  if(chapter && start_verse) {
    return `${book} ${chapter}:${start_verse}–${end_verse}`
  }

  if(start_chapter) {
    return `${book} ${start_chapter}–${end_chapter}`
  }

  if(verse) {
    return `${book} ${chapter}:${verse}`
  }

}

export const getBibleBookAbbreviatedNames = () => ([
  "",
  i18n("Gen", "Abbreviation for Genesis", "book"),
  i18n("Ex", "Abbreviation for Exodus", "book"),
  i18n("Lev", "Abbreviation for Leviticus", "book"),
  i18n("Num", "Abbreviation for Numbers", "book"),
  i18n("Dt", "Abbreviation for Deuteronomy", "book"),
  i18n("Jsh", "Abbreviation for Joshua", "book"),
  i18n("Jdg", "Abbreviation for Judges", "book"),
  i18n("Rth", "Abbreviation for Ruth", "book"),
  i18n("1Sa", "Abbreviation for 1 Samuel", "book"),
  i18n("2Sa", "Abbreviation for 2 Samuel", "book"),
  i18n("1Ki", "Abbreviation for 1 Kings", "book"),
  i18n("2Ki", "Abbreviation for 2 Kings", "book"),
  i18n("1Ch", "Abbreviation for 1 Chronicles", "book"),
  i18n("2Ch", "Abbreviation for 2 Chronicles", "book"),
  i18n("Ezr", "Abbreviation for Ezra", "book"),
  i18n("Neh", "Abbreviation for Nehemiah", "book"),
  i18n("Est", "Abbreviation for Esther", "book"),
  i18n("Job", "Abbreviation for Job", "book"),
  i18n("Ps", "Abbreviation for Psalms", "book"),
  i18n("Prv", "Abbreviation for Proverbs", "book"),
  i18n("Ecc", "Abbreviation for Ecclesiastes", "book"),
  i18n("Sng", "Abbreviation for Song", "book"),
  i18n("Is", "Abbreviation for Isaiah", "book"),
  i18n("Jer", "Abbreviation for Jeremiah", "book"),
  i18n("Lam", "Abbreviation for Lamentations", "book"),
  i18n("Ezk", "Abbreviation for Ezekiel", "book"),
  i18n("Dan", "Abbreviation for Daniel", "book"),
  i18n("Hos", "Abbreviation for Hosea", "book"),
  i18n("Jl", "Abbreviation for Joel", "book"),
  i18n("Amo", "Abbreviation for Amos", "book"),
  i18n("Ob", "Abbreviation for Obadiah", "book"),
  i18n("Jon", "Abbreviation for Jonah", "book"),
  i18n("Mic", "Abbreviation for Micah", "book"),
  i18n("Nah", "Abbreviation for Nahum", "book"),
  i18n("Hab", "Abbreviation for Habakkuk", "book"),
  i18n("Zph", "Abbreviation for Zephaniah", "book"),
  i18n("Hag", "Abbreviation for Haggai", "book"),
  i18n("Zch", "Abbreviation for Zechariah", "book"),
  i18n("Mal", "Abbreviation for Malachi", "book"),
  i18n("Mt", "Abbreviation for Matthew", "book"),
  i18n("Mrk", "Abbreviation for Mark", "book"),
  i18n("Lk", "Abbreviation for Luke", "book"),
  i18n("Jhn", "Abbreviation for John", "book"),
  i18n("Act", "Abbreviation for Acts", "book"),
  i18n("Rom", "Abbreviation for Romans", "book"),
  i18n("1Co", "Abbreviation for 1 Corinthians", "book"),
  i18n("2Co", "Abbreviation for 2 Corinthians", "book"),
  i18n("Gal", "Abbreviation for Galatians", "book"),
  i18n("Eph", "Abbreviation for Ephesians", "book"),
  i18n("Php", "Abbreviation for Philippians", "book"),
  i18n("Col", "Abbreviation for Colossians", "book"),
  i18n("1Th", "Abbreviation for 1 Thessalonians", "book"),
  i18n("2Th", "Abbreviation for 2 Thessalonians", "book"),
  i18n("1Ti", "Abbreviation for 1 Timothy", "book"),
  i18n("2Ti", "Abbreviation for 2 Timothy", "book"),
  i18n("Tts", "Abbreviation for Titus", "book"),
  i18n("Phm", "Abbreviation for Philemon", "book"),
  i18n("Heb", "Abbreviation for Hebrews", "book"),
  i18n("Jam", "Abbreviation for James", "book"),
  i18n("1Pe", "Abbreviation for 1 Peter", "book"),
  i18n("2Pe", "Abbreviation for 2 Peter", "book"),
  i18n("1Jn", "Abbreviation for 1 John", "book"),
  i18n("2Jn", "Abbreviation for 2 John", "book"),
  i18n("3Jn", "Abbreviation for 3 John", "book"),
  i18n("Jud", "Abbreviation for Jude", "book"),
  i18n("Rev", "Abbreviation for Revelation", "book"),
])

export const getBibleBookAbbreviatedName = bookId => getBibleBookAbbreviatedNames()[bookId]

export const getNormalizedPOSCode = ({ morphLang, morphPos }) => (
  ['He','Ar'].includes(morphLang) ? morphPos : getNormalizedGreekPOSCode(morphPos)
)

export const getPOSTerm = ({ languageId, posCode }) => (
  languageId === 'heb' ? getHebrewPOSTerm(posCode) : getGreekPOSTerm(posCode)
)

export const getMorphPartDisplayInfo = ({ morphLang, morphPart, isPrefixOrSuffix, wordIsMultiPart }) => (
  ['He','Ar'].includes(morphLang) ? getHebrewMorphPartDisplayInfo({ morphLang, morphPart, isPrefixOrSuffix, wordIsMultiPart }) : getGreekMorphPartDisplayInfo({ morphPart })
)

// same as in bibletags-data/scripts/importUHBFromUsfm.js
export const getMainWordPartIndex = wordParts => {
  if(!wordParts) return null

  for(let idx = wordParts.length - 1; idx >= 0; idx--) {
    if(!wordParts[idx].match(/^S/)) {
      return idx
    }
  }
}
export const getStrongs = wordInfo => (wordInfo ? (wordInfo.strong || '').replace(/^[a-z]+:|\+$/, '') : '')

export const getIsEntirelyPrefixAndSuffix = wordInfo => (wordInfo && !getStrongs(wordInfo))

export const toBase64 = typeof btoa === 'undefined' ? (str => Buffer.from(str, 'binary').toString('base64')) : btoa

const hexToBase64 = hex => toBase64(hex.match(/\w{2}/g).map(a => String.fromCharCode(parseInt(a, 16))).join(""))

// FYI: maximum length of 32-digit base16 (hex) is 22-digits, though it is buffered to 24 digits with ='s
export const hash64 = str => hexToBase64(md5(str))

export const getWordsHash = ({ usfm, wordDividerRegex }) => {

  const words = (
    splitVerseIntoWords({
      usfm,
      wordDividerRegex,
    })
      .map(({ text }) => text.toLowerCase())
  )

  // After importing the full ESV, I found only 1 redundancy in the 
  // wordHashesSubmission.hash with 4 characters (out of 13k distinct words).
  // Thus, it is inconcievable that a matching verse ref in the same designated
  // version would have the same 4-char hash if there was any difference.

  return hash64(JSON.stringify(words)).slice(0,4)
}

export const getWordHashes = ({ usfm, wordDividerRegex }) => {

  const words = (
    splitVerseIntoWords({
      usfm,
      wordDividerRegex,
    })
      .map(({ text }) => text.toLowerCase())
  )

  // After importing the full ESV, I found only 1 redundancy in the 
  // wordHashesSubmission.hash with 4 characters (out of 13k distinct words).
  // Thus, it is more than sufficient to use 6 chars for the hash (which we
  // do not want ANY invalid matches with) and 3 chars for the
  // secondary hashes (since those only are checked when the main
  // hash matches).

  return words.map((word, index) => ({
    wordNumberInVerse: index + 1,
    hash: hash64(word).slice(0,6),
    withBeforeHash: hash64(`${words[index-1]}\n${words[index]}`).slice(0,3),
    withAfterHash: hash64(`${words[index]}\n${words[index+1]}`).slice(0,3),
    withBeforeAndAfterHash: hash64(`${words[index-1]}\n${words[index]}\n${words[index+1]}`).slice(0,3),
  }))
}

export const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const isOriginalLanguageSearch = searchText => /^\(?"?[#=]/.test(searchText)

export const getTextLanguageId = ({ languageId, bookId }) => (
  languageId === `heb+grc`
    ? (bookId <= 39 ? 'heb' : 'grc')
    : languageId
)

export const isRTLStr = str => {           
  const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF'
  const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC'
  const rtlDirCheck = new RegExp(`^[^${ltrChars}]*[${rtlChars}]`)
  return rtlDirCheck.test(str)
}

const getFirstWordFromPieces = pieces => {
  for(let piece of pieces) {
    if(piece.type === `word`) {
      return piece.text
    } else if(piece.children instanceof Array) {
      const wordFromChildren = getFirstWordFromPieces(piece.children)
      if(wordFromChildren) {
        return wordFromChildren
      }
    }
  }
}

export const isRTLText = ({ languageId, bookId, searchString, pieces }) => (
  !languageId
    ? isRTLStr(getFirstWordFromPieces(pieces || []))
    : (
      languageId === 'heb+grc'
        ? (
          bookId
            ? bookId <= 39 ? true : false
            : /^[\u0590-\u05FF ]*$/g.test(searchString)
        )
        : [
          'heb',
          'hbo',
          'yid',
          'per',
          'fas',
          'urd',
          'pus',
          'syc',
          'syr',
          'sam',
          'snd',
          'prs',
          'prd',
          'gbz',
          'ckb',
          'kmr',
          'kur',
          'sdh',
    
          // Arabic + its dialects follow
          'ara',
          'aao',
          'abh',
          'abv',
          'acm',
          'acq',
          'acw',
          'acx',
          'acy',
          'adf',
          'aeb',
          'aec',
          'afb',
          'ajp',
          'aju',
          'apc',
          'apd',
          'arb',
          'arq',
          'ars',
          'ary',
          'arz',
          'auz',
          'avl',
          'ayh',
          'ayl',
          'ayn',
          'ayp',
          'jrb',
          'jye',
          'mxi',
          'pga',
          'shu',
          'sqr',
          'ssh',
          'xaa',
          'yhd',
          'yud',
        ].includes(languageId)
    )
)

export const getCopyVerseText = ({ pieces, ref, versionAbbr }) => {
  let selectedTextContent = ''

  pieces.forEach(({ tag, text, nextChar }) => {
    if(!text) {
      if(nextChar === ' ') {
        selectedTextContent += nextChar
      }
      return
    }

    selectedTextContent += [ 'nd', 'sc' ].includes(tag) ? text.toUpperCase() : text
  })

  return i18n("{{verse}} ({{passage_reference}} {{version}})", {
    verse: selectedTextContent.trim(),
    passage_reference: getPassageStr({
      refs: [ ref ],
    }),
    version: versionAbbr,
  })
}

export const getMorphInfo = morph => {

  const morphLang = morph.substr(0,2)
  let morphParts
  let mainPartIdx
  let morphPos

  if(['He','Ar'].includes(morphLang)) {
    morphParts = morph.substr(3).split(':')
    mainPartIdx = getMainWordPartIndex(morphParts)
    morphPos = morphParts[mainPartIdx].substr(0,1)
  } else {
    morphParts = [ morph.substr(3) ]
    mainPartIdx = 0
    morphPos = getNormalizedPOSCode({ morphLang, morphPos: morph.substr(3,2) })
  }

  return {
    morphLang,
    morphParts,
    mainPartIdx,
    morphPos,
  }
}

export const getColorWithOpacity = (color='rgba(0,0,0,1)', opacity) => (
  color
    .replace(/^#([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b)  // if it is short form hex E.g. #CCC
    .replace(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, (x, r, g, b) => `rgba(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)},1)`)  // if it is hex
    .replace(/^rgb\( *([0-9]+) *, *([0-9]+) *, *([0-9]+) *\)$/i, `rgba($1,$2,$3,1)`)  // if it is rgb()
    .replace(/^rgba\( *([0-9]+) *, *([0-9]+) *, *([0-9]+) *, *[0-9]+ *\)$/i, `rgba($1,$2,$3,${opacity})`)
)
