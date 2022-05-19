import usfmJS from 'usfm-js'
// import rewritePattern  from 'regexpu-core'

import i18n from './i18n'
import { defaultWordDividerRegex } from './constants'
import { getMainWordPartIndex, getIsEntirelyPrefixAndSuffix, getMorphPartDisplayInfo } from './index'

export const wordPartDividerRegex = /\u2060/g

export const blockUsfmMarkers = [
  // see http://ubsicap.github.io/usfm/index.html

  // // Identification
  // "id",
  // "usfm",
  // "ide",
  // "sts",
  // "rem",
  // "h",
  // "toc#",
  // "toca#",

  // // Introductions
  // "imt#",
  // "is#",
  // "ip",
  // "ipi",
  // "im",
  // "imi",
  // "ipq",
  // "imq",
  // "ipr",
  // "iq#",
  // "ib",
  // "ili#",
  // "iot",
  // "io#",
  // "iex",
  // "imte#",
  // "ie",

  // Titles, Headings, and Labels
  "mt#",
  // "mte#",
  "ms#",
  // "mr",
  "s#",
  // "sr",
  // "r",
  "d",
  // "sp",
  // "sd#",

  // Chapters and Verses
  // "cl",
  // "cd",

  // Paragraphs
  "p",
  // "m",
  // "po",
  // "pr",
  // "cls",
  // "pmo",
  // "pm",
  // "pmc",
  // "pmr",
  // "pi#",
  // "mi",
  "nb",
  // "pc",
  // "ph#",
  "b",

  // Poetry
  "q#",
  "qr",
  "qc",
  "qa",
  // "qm#",
  "qd",

  // Lists
  // "lh",
  // "li#",
  // "lf",
  // "lim#",

  // Tables
  // "tr",

  // Special Text
  // "lit",

  // Special Features
  // "fig",

  // Milestones
  // "qt#-s",
  // "qt#-e",
  // "ts#-s",
  // "ts#-e",

  // Extended Study Content
  // "esb",
  // "esbe",

]

export const headingBlockUsfmMarkers = [

  "mt#",
  "mte#",
  "ms#",
  "mr",
  "s#",
  "sr",
  "r",
  // "d",  - since this is actual translated content, it is not a heading block
  "sp",
  "sd#",

  "qa",

]

export const inlineUsfmMarkers = [
  // see http://ubsicap.github.io/usfm/index.html

  // // Introductions
  // "ior",
  // "iqt",

  // Titles, Headings, and Labels
  // "rq",

  // Chapters and Verses
  "v",
  // "va",
  "vp",

  // Poetry
  // "qs",
  // "qac",

  // Lists
  // "litl",
  // "lik",
  // "liv#",

  // Tables
  // "th#",
  // "thr#",
  // "tc#",
  // "tcr#",

  // Footnotes
  "f",
  "fe",
  // "fr",
  "fq",
  "fqa",
  "fk",
  "fl",
  "fw",
  "fp",
  "fv",
  "ft",
  // "fdc",
  // "fm",

  // Cross References
  "x",
  // "xo",
  // "xk",
  "xq",
  "xt",
  // "xta",
  // "xop",
  // "xot",
  // "xnt",
  // "xdc",
  // "rq",

  // Apparatus
  "zApparatusJson",

  // Special Text
  // "add",
  // "bk",
  // "dc",
  // "k",
  "nd",
  // "ord",
  // "pn",
  // "png",
  // "addpn",
  // "qt",
  // "sig",
  // "sls",
  // "tl",
  "wj",

  // Character Styling
  "em",
  "bd",
  "it",
  "bdit",
  "no",
  "sc",
  "sup",

  // Special Features
  // "rb",
  // "pro",
  // "wg",
  // "wh",
  // "wa",

  // Linking Attributes
  // "jmp",

  // Extended Study Content
  // "ef",
  // "ex",
  // "cat",

]

export const specialUsfmMarkers = [
  // see http://ubsicap.github.io/usfm/index.html

  // Chapters and Verses
  "c",
  // "ca",
  "cp",

]

export const tagInList = ({ tag, list }) => (
  tag
  && (
    list.includes(tag.replace(/[0-9]+/, '#'))
    || list.includes(`${tag}#`)
  )
)

const getFilteredVerseObjects = ({ unitObjs, inlineMarkersOnly }) => {
  let inHeadingBlock = false

  return unitObjs.filter(unitObj => {
    const { tag, text, type, children } = unitObj

    // It seems that usfmMarkersWithContentToDiscard is not needed, since usfm-js distinguishes between content and text,
    // and so if something is not in usfmMarkers and has no text, we just get rid of it.
    
    const isBlock = tagInList({ tag, list: blockUsfmMarkers })

    if(isBlock) {
      inHeadingBlock = tagInList({ tag, list: headingBlockUsfmMarkers })
    }

    // get rid of tags in heading block if inline markers only
    if(inlineMarkersOnly && inHeadingBlock) return false

    // deal with blocks when getting inline markers only and filter out unsupported tags without content
    if(
      !tagInList({ tag, list: inlineUsfmMarkers })
      && !tagInList({ tag, list: specialUsfmMarkers })
      && !text
      && !children
    ) {

      if(inlineMarkersOnly && isBlock) {
        unitObj.text = i18n(" ", "word separator")

      } else if(inlineMarkersOnly || !isBlock) {
        return false
      }

    }

    // change all .text to .children
    if(text && children) {
      children.unshift({
        // type: "text",
        text,
      })
      delete unitObj.text

    // swap out special spacing strings
    } else if(text) {
      unitObj.text = text
        .replace(/~/g, "\u00A0")
        .replace(/ \/\/ /g, " ")
        .replace(/\/\//g, "")
    }

    // make consistent with marker objects to be created
    if(type === 'text') {
      delete unitObj.type
    }

    if(children) {
      unitObj.children = getFilteredVerseObjects({ unitObjs: children, inlineMarkersOnly })
    }

    return true
  })
}

const wrapVerseObjects = verseObjects => {

  // If there is content prior to a block marker, add in a paragraph marker just before the content.
  verseObjects.some((verseObj, idx) => {
    const { tag } = verseObj
    if(tagInList({ tag, list: blockUsfmMarkers })) {
      return true  // all is well - a block marker was found; exit the loop
    } else if(tagInList({ tag, list: specialUsfmMarkers })) {
      // still okay, though we need to keep looking
    } else {
      // hitting content before a block marker; add a simple paragraph in here
      verseObjects = [
        ...verseObjects.slice(0, idx),
        {
          tag: 'p',
        },
        ...verseObjects.slice(idx),
      ]
      return true
    }
  })

  let currentBlockMarkerObj, currentVerseContainerObj, inHeadingBlock, chapter, verse

  return verseObjects.filter(verseObj => {

    const { tag, text, content, children } = verseObj


    if(tag === "c") {
      chapter = parseInt(content)
      return false

    } else if(tagInList({ tag, list: blockUsfmMarkers })) {

      currentBlockMarkerObj = verseObj
      currentVerseContainerObj = undefined
      inHeadingBlock = tagInList({ tag, list: headingBlockUsfmMarkers })

      if(tag === "d") {
        verse = 0

        if([ undefined, NaN ].includes(chapter)) {
          console.log(`Unexpected \\d tag without chapter.`, verseObj)
          return false
        }

        currentVerseContainerObj = {
          type: "text",
          children: [],
          chapter,
          verse,
        }

        if(!currentBlockMarkerObj.children) {
          currentBlockMarkerObj.children = []
        }
  
        currentBlockMarkerObj.children.push(currentVerseContainerObj)
      }

      return true

    } else {

      if(!currentBlockMarkerObj) {
        if(tagInList({ tag, list: specialUsfmMarkers })) return true
        // Should no longer get here, given the pre-loop at the start of this function.
        console.log(`Missing block USFM marker.`, currentBlockMarkerObj)
        return false
      }

      if(currentBlockMarkerObj.text) {
        if(tagInList({ tag, list: specialUsfmMarkers })) return true
        // Should no longer get here, given the loop near modifiedVerseObjects
        console.log(`Unexpected block USFM marker with text.`, currentBlockMarkerObj)
        return false
      }

      if(currentBlockMarkerObj.content) {
        if(tagInList({ tag, list: specialUsfmMarkers })) return true
        // Should no longer get here, given the loop near modifiedVerseObjects
        console.log(`Unexpected block USFM marker with content.`, currentBlockMarkerObj)
        return false
      }

      if(!currentBlockMarkerObj.children) {
        currentBlockMarkerObj.children = []
      }

      if(inHeadingBlock) {
        currentBlockMarkerObj.children.push(verseObj)
        return false
      }

      if(tag === "v" || !currentVerseContainerObj) {
        if(tag === "v") {
          verse = parseInt(content)
        }

        if([ undefined, NaN ].includes(verse)) {
          console.log(`Unexpected USFM without verse.`, verseObj)
          return false
        }

        if([ undefined, NaN ].includes(chapter)) {
          console.log(`Unexpected USFM without chapter.`, verseObj)
          return false
        }

        currentVerseContainerObj = {
          type: "text",
          children: [],
          chapter,
          verse,
        }

        currentBlockMarkerObj.children.push(currentVerseContainerObj)
      }

      currentVerseContainerObj.children.push(verseObj)
      return false

    }

  })
}

const splitOnWords = ({ text, regexes }) => {

  return text

    // escape apostraphes
    .replace(/(\w)’(\w)/g, "$1ESCAPEDAPOSTRAPHE$2")

    // escape large numbers with commas
    .replace(/([0-9]),([0-9]{3}),([0-9]{3})/g, "$1ESCAPEDCOMMA$2ESCAPEDCOMMA$3")
    .replace(/([0-9]),([0-9]{3})/g, "$1ESCAPEDCOMMA$2")

    // split to words
    .split(regexes.wordDividerInGroupGlobal)

    // unescape apostraphes and commas
    .map(word => word.replace(/ESCAPEDAPOSTRAPHE/g, "’"))
    .map(word => word.replace(/ESCAPEDCOMMA/g, ","))

    // filter out empties
    .filter(word => word !== "")
}

const reduceLevels = unitObjs => (
  unitObjs.map(unitObj => {
    if(unitObj.children) {
      unitObj.children = reduceLevels(unitObj.children)
      if(unitObj.children.length === 1) {
        const onlyChild = unitObj.children[0]
        if(Object.keys(unitObj).every(key => onlyChild[key] === unitObj[key] || typeof onlyChild[key] === 'undefined')) {
          delete unitObj.children
          return {
            ...unitObj,
            ...onlyChild,
          }
        }
      }
    }
    return unitObj
  })
)

const filterOutEmptyObjects = unitObjs => (
  unitObjs.filter(unitObj => {
    const { text, children, content, apparatusJson } = unitObj

    if(!text && (!children || !children.length) && !content && !apparatusJson) {
      return false
    }

    if(children) {
      unitObj.children = filterOutEmptyObjects(children)
    }

    return true
  })
)

const getNewTagObjWithUnlistedChildrenFilterOut = ({ unitObj, list }) => ({
  ...unitObj,
  ...(unitObj.children
    ? {
      children: (
        unitObj.children
          .filter(child => list.includes(child))
          .map(child => getNewTagObjWithUnlistedChildrenFilterOut({ unitObj: child, list }))
      ),
    }
    : {}
  )
})

const getGroupedVerseObjects = ({ verseObjects, regexes }) => {

  const includesEmptyWordDividers = regexes.wordDividerStartToEnd.test("")
  const splitWordFixesInfo = []
  let wordNumberInVerse = 1

  const getGroupedVerseObjectsRecursive = ({ unitObjs, ancestorLine: passedInAncestorLine, splitWordInfo }) => {

    unitObjs.forEach((unitObj, unitObjIndex) => {
      const { text, children, tag } = unitObj
      const ancestorLine = [ ...(passedInAncestorLine || []), unitObjs, unitObj ]

      if(tag === "v") {
        wordNumberInVerse = 1
      }

      if(text || tag === "w") {

        if(text) {
          const textSplitOnWords = splitOnWords({ text, regexes })

          unitObj.children = textSplitOnWords.map((wordOrWordDivider, idx) => {
            const doesNotHaveWord = regexes.wordDividerStartToEnd.test(wordOrWordDivider)
            return {
              text: wordOrWordDivider,
              ...(doesNotHaveWord ? {} : { type: "word" }),
              ...((doesNotHaveWord || (splitWordInfo && idx === 0)) ? {} : { wordNumberInVerse: wordNumberInVerse++ }),
            }
          })

          delete unitObj.text
        }

        if(splitWordInfo) {

          const firstChild = unitObj.children[0]

          if(firstChild.type === "word") {
            const {
              arrayWhichEndsWithWord,
              ancestorLineWhichEndsWithWord,
              commonAncestorArray,
              indexOfChildOfCommonAncestor,
            } = splitWordInfo

            const word1Obj = arrayWhichEndsWithWord[arrayWhichEndsWithWord.length-1]
            const word1PartInfo = {
              obj: word1Obj,
              arrayContainingObj: arrayWhichEndsWithWord,
              childOfCommonAncestor: commonAncestorArray[indexOfChildOfCommonAncestor],
            }
            const word2PartInfo = {
              obj: firstChild,
              arrayContainingObj: unitObj.children,
              childOfCommonAncestor: ancestorLine[ancestorLine.indexOf(commonAncestorArray) + 1],
            }
            const word2AncestorList = [
              ...ancestorLine,
              firstChild,
            ]

            if(!splitWordFixesInfo.some(splitWordFixInfo => {
              if(splitWordFixInfo.wordPartsInfo.map(({ obj }) => obj).includes(word1Obj)) {
                // add in word2 info only
                splitWordFixInfo.wordPartsInfo.push(word2PartInfo)
                splitWordFixInfo.ancestorList = [
                  ...splitWordFixInfo.ancestorList,
                  ...word2AncestorList,
                ]

                if(splitWordFixInfo.commonAncestorArray !== commonAncestorArray) {
                  throw new Error("USFM with nested markers not presently supported.")
                }

                return true
              }
              return false
            })) {
              // add new entry with word1 and word2 info
              splitWordFixesInfo.push({
                wordPartsInfo: [
                  word1PartInfo,
                  word2PartInfo,
                ],
                ancestorList: [
                  ...ancestorLineWhichEndsWithWord,
                  ...word2AncestorList,
                ],
                commonAncestorArray,
              })
            }
          }
          
          splitWordInfo = null
        }

        const lastChild = unitObj.children[unitObj.children.length - 1]
        splitWordInfo = (
          (
            lastChild.type === "word"
            && !includesEmptyWordDividers
            && tagInList({ tag, list: inlineUsfmMarkers })
          )
            ? {
              arrayWhichEndsWithWord: unitObj.children,
              ancestorLineWhichEndsWithWord: [ unitObj.children, lastChild ],
              commonAncestorArray: unitObjs,
              indexOfChildOfCommonAncestor: unitObjIndex,
            }
            : null
        )

      } else if(children) {
        const childrenInfo = getGroupedVerseObjectsRecursive({
          unitObjs: children,
          ancestorLine,
          splitWordInfo,
        })
        unitObj.children = childrenInfo.groupedVerseObjects
        splitWordInfo = (
          (
            childrenInfo.splitWordInfo
            && !includesEmptyWordDividers
            && tagInList({ tag, list: inlineUsfmMarkers })
          )
            ? {
              ...childrenInfo.splitWordInfo,
              ancestorLineWhichEndsWithWord: [
                ...childrenInfo.splitWordInfo.ancestorLineWhichEndsWithWord,
                childrenInfo.splitWordInfo.commonAncestorArray,
                childrenInfo.splitWordInfo.commonAncestorArray[childrenInfo.splitWordInfo.indexOfChildOfCommonAncestor],
              ],
              commonAncestorArray: unitObjs,
              indexOfChildOfCommonAncestor: unitObjIndex,
            }
            : null
        )

      } else if(tag) {
        splitWordInfo = null

      }
    })

    return {
      groupedVerseObjects: unitObjs,
      splitWordInfo,
    }
  }

  let { groupedVerseObjects } = getGroupedVerseObjectsRecursive({ unitObjs: verseObjects })

  splitWordFixesInfo.forEach(splitWordFixInfo => {
    const { wordPartsInfo, ancestorList, commonAncestorArray } = splitWordFixInfo

    const { wordNumberInVerse } = wordPartsInfo[0].obj
    delete wordPartsInfo[0].obj.wordNumberInVerse
    wordPartsInfo.forEach(wordPartInfo => delete wordPartInfo.obj.type)

    const newWordObj = {
      children: wordPartsInfo.map(({ obj, arrayContainingObj, childOfCommonAncestor }) => {

        const objIndex = arrayContainingObj.indexOf(obj)
        
        const newChild = getNewTagObjWithUnlistedChildrenFilterOut({
          unitObj: childOfCommonAncestor,
          list: ancestorList,
        })

        arrayContainingObj.splice(objIndex, 1)

        return newChild
      }),
      type: "word",
      wordNumberInVerse,
    }

    const insertIndex = commonAncestorArray.indexOf(wordPartsInfo[0].childOfCommonAncestor) + 1
    
    commonAncestorArray.splice(insertIndex, 0, newWordObj)
  })

  groupedVerseObjects = reduceLevels(groupedVerseObjects)
  groupedVerseObjects = filterOutEmptyObjects(groupedVerseObjects)

  return groupedVerseObjects
}

const getFlattenedJsUsfm = jsUsfm => {
  const verseObjects = []

  if(jsUsfm.headers) {
    verseObjects.push(...jsUsfm.headers)
  }

  Object.keys(jsUsfm.chapters).forEach(chapterNum => {

    const chapter = jsUsfm.chapters[chapterNum]

    verseObjects.push({
      "content": chapterNum,
      "tag": "c",
    })

    if(chapter.front) {
      verseObjects.push(...chapter.front.verseObjects)
    }

    // Ps 119 has 176 verses; I'm going to 180 in case there is a version which splits it differently
    for(let verseNum=0; verseNum<180; verseNum++) {
      if(chapter[verseNum]) {

        verseObjects.push({
          "content": verseNum,
          "tag": "v",
        })
    
        verseObjects.push(...chapter[verseNum].verseObjects)
      }
    }

  })

  return verseObjects
}

const removeInvalidNewlines = unitObjs => {
  unitObjs.forEach(unitObj => {
    if(typeof unitObj.text === 'string') {
      unitObj.text = unitObj.text.replace(/\n/g, '')
    }
    if(typeof unitObj.content === 'string') {
      unitObj.content = unitObj.content.replace(/\n/g, '')
    }
    if(unitObj.children) {
      removeInvalidNewlines(unitObj.children)
    }
  })
}

export const getPiecesFromUSFM = ({ usfm='', inlineMarkersOnly, wordDividerRegex, splitIntoWords }) => {

  // Put the chapter tag before everything, or assume chapter 1 if there is not one
  const chapterTagSwapRegex = /^((?:[^\\]|\\[^v])+?)(\\c [0-9]+\n)/
  let addedPseudoChapter = false
  if(chapterTagSwapRegex.test(usfm)) {
    usfm = usfm.replace(
      /^((?:[^\\]|\\[^v])*?)(\\c [0-9]+ *\n)/,
      '$2$1'
    )
  } else {
    usfm = `\\c 1\n${usfm}`
    addedPseudoChapter = true
  }

  const verseObjects = getFlattenedJsUsfm( usfmJS.toJSON(usfm) )

  if(addedPseudoChapter && verseObjects[0].tag === 'c') {
    verseObjects.shift()
  }

  // This is a fix due to a bug in usfm-js reported here: https://github.com/unfoldingWord/usfm-js/issues/103
  // The fix is not perfect as it breaks in the situation where the nextChar is supposed to be
  // repeated twice in the verseObject to follow, but only is presented once. If this turns out
  // to be a significant issue, I will need to fix usfm-js.
  verseObjects.forEach((verseObject, idx) => {
    const nextVerseObject = verseObjects[idx + 1] || {}
    if(
      verseObject.nextChar
      && nextVerseObject.text
      && nextVerseObject.text.substring(0,1) !== verseObject.nextChar
    ) {
      nextVerseObject.text = `${verseObject.nextChar}${nextVerseObject.text}`
    }
  })

  removeInvalidNewlines(verseObjects)

  let filteredVerseObjects = getFilteredVerseObjects({
    unitObjs: verseObjects,
    inlineMarkersOnly,
  })

  // For block markers which have content (like \s1 and \d), separate out that content
  let modifiedVerseObjects = []
  filteredVerseObjects.forEach(verseObj => {
    const { text, content, ...verseObjWithoutTextAndContent } = verseObj
    const { tag } = verseObjWithoutTextAndContent

    if(tagInList({ tag, list: blockUsfmMarkers }) && (text || content)) {
      modifiedVerseObjects.push(verseObjWithoutTextAndContent)
      const newVerseObj = {}
      text && (newVerseObj.text = text)
      content && (newVerseObj.content = content)
      modifiedVerseObjects.push(newVerseObj)
    } else {
      modifiedVerseObjects.push(verseObj)
    }
  })

  // handle zApparatusJson and Hebrew verse parts
  let baseWords = []
  modifiedVerseObjects.forEach(vsObj => {
    if(vsObj.type === "word") {
      baseWords.push(JSON.parse(JSON.stringify(vsObj)))
      const wordParts = (vsObj.text || ``).split(wordPartDividerRegex)
      if(wordParts.length > 1 && vsObj.morph) {
        const morphLang = vsObj.morph.substr(0,2)
        const morphParts = vsObj.morph.substr(3).split(':')
        const mainPartIdx = getMainWordPartIndex(morphParts)
        const isEntirelyPrefixAndSuffix = getIsEntirelyPrefixAndSuffix(vsObj)
        if(wordParts.length === morphParts.length) {
          vsObj.children = wordParts.map((text, idx) => {
            const newObj = { text }
            const isPrefixOrSuffix = isEntirelyPrefixAndSuffix || idx !== mainPartIdx
            const morphPart = morphParts[idx]
            if(isPrefixOrSuffix) {
              newObj.color = getMorphPartDisplayInfo({ morphLang, morphPart, isPrefixOrSuffix, wordIsMultiPart: true }).color
            }
            return newObj
          })
          delete vsObj.text
        }
      }
    } else if(vsObj.tag === "zApparatusJson") {
      try {
        vsObj.apparatusJson = JSON.parse(vsObj.content)
        vsObj.baseWords = baseWords
        delete vsObj.content
      } catch(e) {}
    } else if(vsObj.tag === "v") {
      baseWords = []
    }
  })

  if(!inlineMarkersOnly) {
    modifiedVerseObjects = wrapVerseObjects(modifiedVerseObjects)
  }

  if(!splitIntoWords) {
    return modifiedVerseObjects
  }

  const regexes = {
    wordDividerInGroupGlobal: new RegExp(`((?:${wordDividerRegex || defaultWordDividerRegex})+)`, 'g'),
    wordDividerStartToEnd: new RegExp(`^(?:${wordDividerRegex || defaultWordDividerRegex})+$`),
  }

  // previous attempts below (in case the above doesn't always pan out)
  // try {
  //   regexes = {
  //     wordDividerInGroupGlobal: new RegExp(`(${wordDividerRegex || '[\\P{Letter}]+'})`, 'gu'),
  //     wordDividerStartToEnd: new RegExp(`^${wordDividerRegex || '[\\P{Letter}]+'}$`, 'u'),
  //   }
  // } catch(e) {
  //   regexes = {
  //     wordDividerInGroupGlobal: new RegExp(rewritePattern(`(${wordDividerRegex || '[\\P{L}]+'})`, 'u', {
  //       unicodePropertyEscape: true,
  //     }), 'g'),
  //     wordDividerStartToEnd: new RegExp(rewritePattern(`^${wordDividerRegex || '[\\P{L}]+'}$`, 'u', {
  //       unicodePropertyEscape: true,
  //     })),
  //   }
  // }

  return getGroupedVerseObjects({
    verseObjects: modifiedVerseObjects,
    regexes,
  })

}

export const splitVerseIntoWords = ({ usfm, wordDividerRegex }={}) => {

  const getWords = unitObjs => {
    let words = []

    const getWordText = unitObj => {
      const { text, children } = unitObj
      return text || (children && children.map(child => getWordText(child)).join("")) || ""
    }

    unitObjs.forEach(unitObj => {
      const { type, children } = unitObj

      if(type === "word") {
        words.push(getWordText(unitObj))
      } else if(children) {
        words = [
          ...words,
          ...getWords(children),
        ]
      }
    })

    return words
  }

  return getWords(
    getPiecesFromUSFM({
      usfm,
      wordDividerRegex,
      inlineMarkersOnly: true,
      splitIntoWords: true,
    })
  )
}
