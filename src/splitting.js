import usfmJS from 'usfm-js'
import i18n from './i18n.js'
// import rewritePattern  from 'regexpu-core'

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
  // "nb",
  // "pc",
  // "ph#",
  // "b",

  // Poetry
  "q#",
  // "qr",
  // "qc",
  // "qa",
  // "qm#",
  // "qd",
  // "b",

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
  // "wj",

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

// based off of [\P{Letter}] encoded here: https://mothereff.in/regexpu
const defaultWordDividerRegex = "(?:[\\0-@\\[-`\\{-\\xA9\\xAB-\\xB4\\xB6-\\xB9\\xBB-\\xBF\\xD7\\xF7\\u02C2-\\u02C5\\u02D2-\\u02DF\\u02E5-\\u02EB\\u02ED\\u02EF-\\u036F\\u0375\\u0378\\u0379\\u037E\\u0380-\\u0385\\u0387\\u038B\\u038D\\u03A2\\u03F6\\u0482-\\u0489\\u0530\\u0557\\u0558\\u055A-\\u055F\\u0589-\\u0590\\u05BE\\u05C3\\u05C6\\u05C8-\\u05CF\\u05EB-\\u05EE\\u05F3-\\u061F\\u064B-\\u066D\\u0670\\u06D4\\u06D6-\\u06E4\\u06E7-\\u06ED\\u06F0-\\u06F9\\u06FD\\u06FE\\u0700-\\u070F\\u0711\\u0730-\\u074C\\u07A6-\\u07B0\\u07B2-\\u07C9\\u07EB-\\u07F3\\u07F6-\\u07F9\\u07FB-\\u07FF\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u083F\\u0859-\\u085F\\u086B-\\u089F\\u08B5\\u08BE-\\u0903\\u093A-\\u093C\\u093E-\\u094F\\u0951-\\u0957\\u0962-\\u0970\\u0981-\\u0984\\u098D\\u098E\\u0991\\u0992\\u09A9\\u09B1\\u09B3-\\u09B5\\u09BA-\\u09BC\\u09BE-\\u09CD\\u09CF-\\u09DB\\u09DE\\u09E2-\\u09EF\\u09F2-\\u09FB\\u09FD-\\u0A04\\u0A0B-\\u0A0E\\u0A11\\u0A12\\u0A29\\u0A31\\u0A34-\\u0A37\\u0A3A-\\u0A58\\u0A5D\\u0A5F-\\u0A71\\u0A75-\\u0A84\\u0A8E\\u0A92\\u0AA9\\u0AB1\\u0AB4\\u0ABA-\\u0ABC\\u0ABE-\\u0ACF\\u0AD1-\\u0ADF\\u0AE2-\\u0AF8\\u0AFA-\\u0B04\\u0B0D\\u0B0E\\u0B11\\u0B12\\u0B29\\u0B31\\u0B34\\u0B3A-\\u0B3C\\u0B3E-\\u0B5B\\u0B5E\\u0B62-\\u0B70\\u0B72-\\u0B82\\u0B84\\u0B8B-\\u0B8D\\u0B91\\u0B96-\\u0B98\\u0B9B\\u0B9D\\u0BA0-\\u0BA2\\u0BA5-\\u0BA7\\u0BAB-\\u0BAD\\u0BBA-\\u0BCF\\u0BD1-\\u0C04\\u0C0D\\u0C11\\u0C29\\u0C3A-\\u0C3C\\u0C3E-\\u0C57\\u0C5B-\\u0C5F\\u0C62-\\u0C7F\\u0C81-\\u0C84\\u0C8D\\u0C91\\u0CA9\\u0CB4\\u0CBA-\\u0CBC\\u0CBE-\\u0CDD\\u0CDF\\u0CE2-\\u0CF0\\u0CF3-\\u0D04\\u0D0D\\u0D11\\u0D3B\\u0D3C\\u0D3E-\\u0D4D\\u0D4F-\\u0D53\\u0D57-\\u0D5E\\u0D62-\\u0D79\\u0D80-\\u0D84\\u0D97-\\u0D99\\u0DB2\\u0DBC\\u0DBE\\u0DBF\\u0DC7-\\u0E00\\u0E31-\\u0E3F\\u0E47-\\u0E80\\u0E83\\u0E85\\u0E8B\\u0EA4\\u0EA6\\u0EB1\\u0EB4-\\u0EBC\\u0EBE\\u0EBF\\u0EC5\\u0EC7-\\u0EDB\\u0EE0-\\u0EFF\\u0F01-\\u0F3F\\u0F48\\u0F6D-\\u0F87\\u0F8D-\\u0FFF\\u102B-\\u103E\\u1040-\\u104F\\u1056-\\u1059\\u105E-\\u1060\\u1062-\\u1064\\u1067-\\u106D\\u1071-\\u1074\\u1082-\\u108D\\u108F-\\u109F\\u10C6\\u10C8-\\u10CC\\u10CE\\u10CF\\u10FB\\u1249\\u124E\\u124F\\u1257\\u1259\\u125E\\u125F\\u1289\\u128E\\u128F\\u12B1\\u12B6\\u12B7\\u12BF\\u12C1\\u12C6\\u12C7\\u12D7\\u1311\\u1316\\u1317\\u135B-\\u137F\\u1390-\\u139F\\u13F6\\u13F7\\u13FE-\\u1400\\u166D\\u166E\\u1680\\u169B-\\u169F\\u16EB-\\u16F0\\u16F9-\\u16FF\\u170D\\u1712-\\u171F\\u1732-\\u173F\\u1752-\\u175F\\u176D\\u1771-\\u177F\\u17B4-\\u17D6\\u17D8-\\u17DB\\u17DD-\\u181F\\u1879-\\u187F\\u1885-\\u18A9\\u18AB-\\u18AF\\u18F6-\\u18FF\\u191F-\\u194F\\u196E\\u196F\\u1975-\\u197F\\u19AC-\\u19AF\\u19CA-\\u19FF\\u1A17-\\u1A1F\\u1A55-\\u1AA6\\u1AA8-\\u1B04\\u1B34-\\u1B44\\u1B4C-\\u1B82\\u1BA1-\\u1BAD\\u1BB0-\\u1BB9\\u1BE6-\\u1BFF\\u1C24-\\u1C4C\\u1C50-\\u1C59\\u1C7E\\u1C7F\\u1C89-\\u1C8F\\u1CBB\\u1CBC\\u1CC0-\\u1CE8\\u1CED\\u1CF4\\u1CF7-\\u1CF9\\u1CFB-\\u1CFF\\u1DC0-\\u1DFF\\u1F16\\u1F17\\u1F1E\\u1F1F\\u1F46\\u1F47\\u1F4E\\u1F4F\\u1F58\\u1F5A\\u1F5C\\u1F5E\\u1F7E\\u1F7F\\u1FB5\\u1FBD\\u1FBF-\\u1FC1\\u1FC5\\u1FCD-\\u1FCF\\u1FD4\\u1FD5\\u1FDC-\\u1FDF\\u1FED-\\u1FF1\\u1FF5\\u1FFD-\\u2070\\u2072-\\u207E\\u2080-\\u208F\\u209D-\\u2101\\u2103-\\u2106\\u2108\\u2109\\u2114\\u2116-\\u2118\\u211E-\\u2123\\u2125\\u2127\\u2129\\u212E\\u213A\\u213B\\u2140-\\u2144\\u214A-\\u214D\\u214F-\\u2182\\u2185-\\u2BFF\\u2C2F\\u2C5F\\u2CE5-\\u2CEA\\u2CEF-\\u2CFF\\u2D26\\u2D28-\\u2D2C\\u2D2E\\u2D2F\\u2D68-\\u2D6E\\u2D70-\\u2D7F\\u2D97-\\u2D9F\\u2DA7\\u2DAF\\u2DB7\\u2DBF\\u2DC7\\u2DCF\\u2DD7\\u2DDF-\\u2E2E\\u2E30-\\u3004\\u3007-\\u3030\\u3036-\\u303A\\u303D-\\u3040\\u3097-\\u309C\\u30A0\\u30FB\\u3100-\\u3104\\u3130\\u318F-\\u319F\\u31BB-\\u31EF\\u3200-\\u33FF\\u4DB6-\\u4DFF\\u9FF0-\\u9FFF\\uA48D-\\uA4CF\\uA4FE\\uA4FF\\uA60D-\\uA60F\\uA620-\\uA629\\uA62C-\\uA63F\\uA66F-\\uA67E\\uA69E\\uA69F\\uA6E6-\\uA716\\uA720\\uA721\\uA789\\uA78A\\uA7C0\\uA7C1\\uA7C7-\\uA7F6\\uA802\\uA806\\uA80B\\uA823-\\uA83F\\uA874-\\uA881\\uA8B4-\\uA8F1\\uA8F8-\\uA8FA\\uA8FC\\uA8FF-\\uA909\\uA926-\\uA92F\\uA947-\\uA95F\\uA97D-\\uA983\\uA9B3-\\uA9CE\\uA9D0-\\uA9DF\\uA9E5\\uA9F0-\\uA9FF\\uAA29-\\uAA3F\\uAA43\\uAA4C-\\uAA5F\\uAA77-\\uAA79\\uAA7B-\\uAA7D\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uAAC3-\\uAADA\\uAADE\\uAADF\\uAAEB-\\uAAF1\\uAAF5-\\uAB00\\uAB07\\uAB08\\uAB0F\\uAB10\\uAB17-\\uAB1F\\uAB27\\uAB2F\\uAB5B\\uAB68-\\uAB6F\\uABE3-\\uABFF\\uD7A4-\\uD7AF\\uD7C7-\\uD7CA\\uD7FC-\\uD7FF\\uE000-\\uF8FF\\uFA6E\\uFA6F\\uFADA-\\uFAFF\\uFB07-\\uFB12\\uFB18-\\uFB1C\\uFB1E\\uFB29\\uFB37\\uFB3D\\uFB3F\\uFB42\\uFB45\\uFBB2-\\uFBD2\\uFD3E-\\uFD4F\\uFD90\\uFD91\\uFDC8-\\uFDEF\\uFDFC-\\uFE6F\\uFE75\\uFEFD-\\uFF20\\uFF3B-\\uFF40\\uFF5B-\\uFF65\\uFFBF-\\uFFC1\\uFFC8\\uFFC9\\uFFD0\\uFFD1\\uFFD8\\uFFD9\\uFFDD-\\uFFFF]|\\uD800[\\uDC0C\\uDC27\\uDC3B\\uDC3E\\uDC4E\\uDC4F\\uDC5E-\\uDE7F\\uDE9D-\\uDE9F\\uDED1-\\uDEFF\\uDF20-\\uDF2C\\uDF41\\uDF4A-\\uDF4F\\uDF76-\\uDF7F\\uDF9E\\uDF9F\\uDFC4-\\uDFC7\\uDFD0-\\uDFFF]|\\uD801[\\uDC9E-\\uDCAF\\uDCD4-\\uDCD7\\uDCFC-\\uDCFF\\uDD28-\\uDD2F\\uDD64-\\uDDFF\\uDF37-\\uDF3F\\uDF56-\\uDF5F\\uDF68-\\uDFFF]|\\uD802[\\uDC06\\uDC07\\uDC09\\uDC36\\uDC39-\\uDC3B\\uDC3D\\uDC3E\\uDC56-\\uDC5F\\uDC77-\\uDC7F\\uDC9F-\\uDCDF\\uDCF3\\uDCF6-\\uDCFF\\uDD16-\\uDD1F\\uDD3A-\\uDD7F\\uDDB8-\\uDDBD\\uDDC0-\\uDDFF\\uDE01-\\uDE0F\\uDE14\\uDE18\\uDE36-\\uDE5F\\uDE7D-\\uDE7F\\uDE9D-\\uDEBF\\uDEC8\\uDEE5-\\uDEFF\\uDF36-\\uDF3F\\uDF56-\\uDF5F\\uDF73-\\uDF7F\\uDF92-\\uDFFF]|\\uD803[\\uDC49-\\uDC7F\\uDCB3-\\uDCBF\\uDCF3-\\uDCFF\\uDD24-\\uDEFF\\uDF1D-\\uDF26\\uDF28-\\uDF2F\\uDF46-\\uDFDF\\uDFF7-\\uDFFF]|\\uD804[\\uDC00-\\uDC02\\uDC38-\\uDC82\\uDCB0-\\uDCCF\\uDCE9-\\uDD43\\uDD45-\\uDD4F\\uDD73-\\uDD75\\uDD77-\\uDD82\\uDDB3-\\uDDC0\\uDDC5-\\uDDD9\\uDDDB\\uDDDD-\\uDDFF\\uDE12\\uDE2C-\\uDE7F\\uDE87\\uDE89\\uDE8E\\uDE9E\\uDEA9-\\uDEAF\\uDEDF-\\uDF04\\uDF0D\\uDF0E\\uDF11\\uDF12\\uDF29\\uDF31\\uDF34\\uDF3A-\\uDF3C\\uDF3E-\\uDF4F\\uDF51-\\uDF5C\\uDF62-\\uDFFF]|\\uD805[\\uDC35-\\uDC46\\uDC4B-\\uDC5E\\uDC60-\\uDC7F\\uDCB0-\\uDCC3\\uDCC6\\uDCC8-\\uDD7F\\uDDAF-\\uDDD7\\uDDDC-\\uDDFF\\uDE30-\\uDE43\\uDE45-\\uDE7F\\uDEAB-\\uDEB7\\uDEB9-\\uDEFF\\uDF1B-\\uDFFF]|\\uD806[\\uDC2C-\\uDC9F\\uDCE0-\\uDCFE\\uDD00-\\uDD9F\\uDDA8\\uDDA9\\uDDD1-\\uDDE0\\uDDE2\\uDDE4-\\uDDFF\\uDE01-\\uDE0A\\uDE33-\\uDE39\\uDE3B-\\uDE4F\\uDE51-\\uDE5B\\uDE8A-\\uDE9C\\uDE9E-\\uDEBF\\uDEF9-\\uDFFF]|\\uD807[\\uDC09\\uDC2F-\\uDC3F\\uDC41-\\uDC71\\uDC90-\\uDCFF\\uDD07\\uDD0A\\uDD31-\\uDD45\\uDD47-\\uDD5F\\uDD66\\uDD69\\uDD8A-\\uDD97\\uDD99-\\uDEDF\\uDEF3-\\uDFFF]|\\uD808[\\uDF9A-\\uDFFF]|\\uD809[\\uDC00-\\uDC7F\\uDD44-\\uDFFF]|[\\uD80A\\uD80B\\uD80E-\\uD810\\uD812-\\uD819\\uD823-\\uD82B\\uD82D\\uD82E\\uD830-\\uD834\\uD836\\uD837\\uD839\\uD83C-\\uD83F\\uD87B-\\uD87D\\uD87F-\\uDBFF][\\uDC00-\\uDFFF]|\\uD80D[\\uDC2F-\\uDFFF]|\\uD811[\\uDE47-\\uDFFF]|\\uD81A[\\uDE39-\\uDE3F\\uDE5F-\\uDECF\\uDEEE-\\uDF3F\\uDF44-\\uDF62\\uDF78-\\uDF7C\\uDF90-\\uDFFF]|\\uD81B[\\uDC00-\\uDE3F\\uDE80-\\uDEFF\\uDF4B-\\uDF4F\\uDF51-\\uDF92\\uDFA0-\\uDFDF\\uDFE2\\uDFE4-\\uDFFF]|\\uD821[\\uDFF8-\\uDFFF]|\\uD822[\\uDEF3-\\uDFFF]|\\uD82C[\\uDD1F-\\uDD4F\\uDD53-\\uDD63\\uDD68-\\uDD6F\\uDEFC-\\uDFFF]|\\uD82F[\\uDC6B-\\uDC6F\\uDC7D-\\uDC7F\\uDC89-\\uDC8F\\uDC9A-\\uDFFF]|\\uD835[\\uDC55\\uDC9D\\uDCA0\\uDCA1\\uDCA3\\uDCA4\\uDCA7\\uDCA8\\uDCAD\\uDCBA\\uDCBC\\uDCC4\\uDD06\\uDD0B\\uDD0C\\uDD15\\uDD1D\\uDD3A\\uDD3F\\uDD45\\uDD47-\\uDD49\\uDD51\\uDEA6\\uDEA7\\uDEC1\\uDEDB\\uDEFB\\uDF15\\uDF35\\uDF4F\\uDF6F\\uDF89\\uDFA9\\uDFC3\\uDFCC-\\uDFFF]|\\uD838[\\uDC00-\\uDCFF\\uDD2D-\\uDD36\\uDD3E-\\uDD4D\\uDD4F-\\uDEBF\\uDEEC-\\uDFFF]|\\uD83A[\\uDCC5-\\uDCFF\\uDD44-\\uDD4A\\uDD4C-\\uDFFF]|\\uD83B[\\uDC00-\\uDDFF\\uDE04-\\uDE20\\uDE23\\uDE25\\uDE26\\uDE28\\uDE33\\uDE38\\uDE3A\\uDE3C-\\uDE41\\uDE43-\\uDE46\\uDE48\\uDE4A\\uDE4C\\uDE50\\uDE53\\uDE55\\uDE56\\uDE58\\uDE5A\\uDE5C\\uDE5E\\uDE60\\uDE63\\uDE65\\uDE66\\uDE6B\\uDE73\\uDE78\\uDE7D\\uDE7F\\uDE8A\\uDE9C-\\uDEA0\\uDEA4\\uDEAA\\uDEBC-\\uDFFF]|\\uD869[\\uDED7-\\uDEFF]|\\uD86D[\\uDF35-\\uDF3F]|\\uD86E[\\uDC1E\\uDC1F]|\\uD873[\\uDEA2-\\uDEAF]|\\uD87A[\\uDFE1-\\uDFFF]|\\uD87E[\\uDE1E-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])"
export const tagInList = ({ tag, list }) => (
  tag
  && (
    list.includes(tag.replace(/[0-9]+/, '#'))
    || list.includes(`${tag}#`)
  )
)

const getFilteredVerseObjects = ({ unitObjs, inlineMarkersOnly }) => unitObjs.filter(unitObj => {
  const { tag, text, type, children } = unitObj

  // It seems that usfmMarkersWithContentToDiscard is not needed, since usfm-js distinguishes between content and text,
  // and so if something is not in usfmMarkers and has no text, we just get rid of it.
  
  // deal with blocks when getting inline markers only and filter out unsupported tags without content
  const isBlock = tagInList({ tag, list: blockUsfmMarkers })
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

  let currentBlockMarkerObj, currentVerseContainerObj, chapter, verse

  return verseObjects.filter(verseObj => {

    const { tag, text, content, children } = verseObj


    if(tag === "c") {
      chapter = parseInt(content)
      return false

    } else if(tagInList({ tag, list: blockUsfmMarkers })) {

      currentBlockMarkerObj = verseObj
      currentVerseContainerObj = undefined
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
        console.log(`Unexpected block USFM marker with text.`, currentBlockMarkerObj)
        return false
      }

      if(currentBlockMarkerObj.content) {
        if(tagInList({ tag, list: specialUsfmMarkers })) return true
        console.log(`Unexpected block USFM marker with content.`, currentBlockMarkerObj)
        return false
      }

      if(!currentBlockMarkerObj.children) {
        currentBlockMarkerObj.children = []
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

    // split to words
    .split(regexes.wordDividerInGroupGlobal)

    // unescape apostraphes
    .map(word => word.replace(/ESCAPEDAPOSTRAPHE/g, "’"))

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
    const { text, children, content } = unitObj

    if(!text && (!children || !children.length) && !content) {
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

  const getGroupedVerseObjectsRecursive = ({ unitObjs, ancestorLine: passedInAncestorLine, splitWordInfo }) => {

    unitObjs.forEach((unitObj, unitObjIndex) => {
      const { text, children } = unitObj
      const ancestorLine = [ ...(passedInAncestorLine || []), unitObjs, unitObj ]

      if(text) {
        const textSplitOnWords = splitOnWords({ text, regexes })

        unitObj.children = textSplitOnWords.map(wordOrWordDivider => {
          const doesNotHaveWord = regexes.wordDividerStartToEnd.test(wordOrWordDivider)
          return {
            text: wordOrWordDivider,
            ...(doesNotHaveWord ? {} : { type: "word" }),
          }
        })

        delete unitObj.text

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
        splitWordInfo = lastChild.type === "word" && !includesEmptyWordDividers
          ? {
            arrayWhichEndsWithWord: unitObj.children,
            ancestorLineWhichEndsWithWord: [ unitObj.children, lastChild ],
            commonAncestorArray: unitObjs,
            indexOfChildOfCommonAncestor: unitObjIndex,
          }
          : null

      } else if(children) {
        const childrenInfo = getGroupedVerseObjectsRecursive({
          unitObjs: children,
          ancestorLine,
          splitWordInfo,
        })
        unitObj.children = childrenInfo.groupedVerseObjects
        splitWordInfo = childrenInfo.splitWordInfo && !includesEmptyWordDividers
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

  const verseObjects = getFlattenedJsUsfm( usfmJS.toJSON(usfm) )

  removeInvalidNewlines(verseObjects)

  let filteredVerseObjects = getFilteredVerseObjects({
    unitObjs: verseObjects,
    inlineMarkersOnly,
  })

  if(!inlineMarkersOnly) {
    filteredVerseObjects = wrapVerseObjects(filteredVerseObjects)
  }

  if(!splitIntoWords) {
    return filteredVerseObjects
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
    verseObjects: filteredVerseObjects,
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

  return getWords( getPiecesFromUSFM({ usfm, wordDividerRegex }) )
}
