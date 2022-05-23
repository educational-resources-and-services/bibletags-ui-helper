import md5 from 'md5'
import { getRefFromLoc } from "@bibletags/bibletags-versification"
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
export * from './bibleSearch'
export * from './bibleSearchUtils'

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

  refs.forEach(ref => {
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
      if(wordRanges) {
        verseText = wordRanges[0].substr(0,1) === '1'
          ? i18n("{{verse}}a", { verse })
          : i18n("{{verse}}b", { verse })
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

export const getRefsFromPassageStr = passageStr => {

  const normalizedPassageStr = (
    passageStr
      .replace(/  +/g, ' ')
      .trim()
  )

  const indicateBookId = (book, bookId) => ({
    suggestedQuery: book,
    bookId,
  })
  const bookSuggestionOptions = (
    [
      ...getBibleBookNames().map(indicateBookId),
      ...getBibleBookAbbreviatedNames().map(indicateBookId),
    ].filter(({ suggestedQuery }) => suggestedQuery)
  )

  // split off potential versionId

  const passageStrSets = [
    {
      passageStr: normalizedPassageStr,
    },
  ]

  const [ x, passageStrWithoutVersionId, versionId ] = normalizedPassageStr.match(/^(.*?)(?: ([a-z0-9]{2,9}))?$/i)
  passageStrSets.push({
    passageStr: passageStrWithoutVersionId,
    versionId: versionId && versionId.toLowerCase(),
  })

  for(let passageStrSet of passageStrSets) {
    const { passageStr, versionId } = passageStrSet

    const [ x, book, nonBookPart='' ] = passageStr.match(/^(.+?)(?: ([-–—0-9:]+))?$/)

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

    if(!bookId) continue

    const [ nonBookPartFirstHalf, nonBookPartSecondHalf, x1 ] = nonBookPart.split(/[-–—]/g)
    if(!nonBookPartFirstHalf || x1) continue
    const [ startChapter, startVerse, x2 ] = nonBookPartFirstHalf.split(':')
    if(!startChapter || x2) continue

    let endChapter = startChapter
    let endVerse = startVerse
    if(nonBookPartSecondHalf) {
      const [ nonBookPartSecondHalfPiece1, nonBookPartSecondHalfPiece2, x3 ] = nonBookPartSecondHalf.split(':')
      if(!nonBookPartSecondHalfPiece1 || x3) continue
      if(nonBookPartSecondHalfPiece2) {
        endChapter = nonBookPartSecondHalfPiece1
        endVerse = nonBookPartSecondHalfPiece2
      } else {
        endVerse = nonBookPartSecondHalfPiece1
      }
    }

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

    if(refs.length > 0) {
      return {
        refs,
        versionId,
      }
    }

    // TODO: make this work with i18n!

    // get i18n ref signatures

    // determine book

    // if has start_chapter and end_chapter

      // determine start_chapter
      // determine end_chapter

    // else 

      // determine chapter

    // if has start_verse and end_verse

      // determine start_verse
      // determine end_verse

    // else 

      // determine verse

  }

  return null
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
  const [ startChapter, startVerse ] = startChapterAndVerse.split(':')

  const refs = [
    getRefFromLoc(
      `${(`0${getBookIdFromUsfmBibleBookAbbr(usfmBibleBookAbbr)}`).substr(-2)}${(`00${startChapter}`).substr(-3)}${(`00${startVerse === undefined ? 1 : startVerse}`).substr(-3)}`
    )
  ]

  let endChapter, endVerse

  if(endChapterAndVerse) {
    const endChapterAndVerseSplit = endChapterAndVerse.split(':')

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
      .map(({ word }) => word.toLowerCase())
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
      .map(({ word }) => word.toLowerCase())
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