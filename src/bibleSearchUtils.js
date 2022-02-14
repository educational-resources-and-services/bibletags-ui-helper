import "regenerator-runtime/runtime.js"  // needed to build-for-node given async functions
import { getOriginalLocsFromRange, getCorrespondingRefs, getRefFromLoc, getLocFromRef } from '@bibletags/bibletags-versification'

export const containsHebrewChars = text => /[\u0590-\u05FF]/.test(text)
export const containsGreekChars = text => /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text)

export const stripGreekAccents = str => {
  const mappings = {
    "α": /[ἀἁἂἃἄἅἆἇάὰάᾀᾁᾂᾃᾄᾅᾆᾇᾰᾱᾲᾳᾴᾶᾷ]/g,
    "Α": /[ἈἉἊἋἌἍἎἏΆᾈᾉᾊᾋᾌᾍᾎᾏᾸᾹᾺΆᾼ]/g,
    "ε": /[ἐἑἒἓἔἕέὲέ]/g,
    "Ε": /[ἘἙἚἛἜἝῈΈΈ]/g,
    "η": /[ἠἡἢἣἤἥἦἧὴήᾐᾑᾒᾓᾔᾕᾖᾗῂῃῄῆῇή]/g,
    "Η": /[ἨἩἪἫἬἭἮἯᾘᾙᾚᾛᾜᾝᾞᾟῊΉῌΉ]/g,
    "ι": /[ἰἱἲἳἴἵἶἷὶίῐῑῒΐῖῗΐίϊ]/g,
    "Ι": /[ἸἹἺἻἼἽἾἿῚΊῘῙΊΪ]/g,
    "ο": /[ὀὁὂὃὄὅὸόό]/g,
    "Ο": /[ὈὉὊὋὌὍῸΌΌ]/g,
    "υ": /[ὐὑὒὓὔὕὖὗὺύῠῡῢΰῦῧΰύϋ]/g,
    "Υ": /[ὙὛὝὟῨῩῪΎΎΫ]/g,
    "ω": /[ὠὡὢὣὤὥὦὧὼώᾠᾡᾢᾣᾤᾥᾦᾧῲῳῴῶῷώ]/g,
    "Ω": /[ὨὩὪὫὬὭὮὯᾨᾩᾪᾫᾬᾭᾮᾯῺΏῼΏ]/g,
    "ρ": /[ῤῥ]/g,
    "Ρ": /[Ῥ]/g,
    "": /[῞ʹ͵΄᾽᾿῍῎῏῝῞῟῭΅`΅´῾῀῁]/g,
  }

  Object.keys(mappings).forEach(char => {
    str = str.replace(mappings[char], char)
  })

  return str
}

export const stripHebrewVowelsEtc = str => (
  str
    .replace(/[\u05B0-\u05BC\u05C1\u05C2\u05C4]/g,'')  // vowels
    .replace(/[\u0591-\u05AF\u05A5\u05BD\u05BF\u05C5\u05C7]/g,'')  // cantilation
    .replace(/\u200D/g,'')  // invalid character
)

export const stripVocalOfAccents = str => {
  const mappings = {
    "a": /[âăáà]/g,
    "e": /[êᵉĕḗēé]/g,
    "i": /[îḯíïì]/g,
    "o": /[óôŏṓō]/g,
    "u": /[ûú]/g,
    "s": /[ˢç]/g,
    "t": /[ṭ]/g,
    "y": /[ýÿŷ]/g,
    "": /[ʻʼʻ]/g,
  }

  str = str.toLowerCase()

  Object.keys(mappings).forEach(char => {
    str = str.replace(mappings[char], char)
  })

  return str
}

export const getInfoOnResultLocs = ({ resultsNeedingUsfm, lookupVersionInfo }) => {

  const versionResultsNeedingUsfmByLoc = {}
  const locs = resultsNeedingUsfm
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
              lookupVersionInfo,
            })
            const locs = refs.map(ref => getLocFromRef(ref).split(':')[0])

            locs.forEach(loc => {
              versionResultsNeedingUsfmByLoc[loc] = versionResults
            })

            return locs
          })
          .flat()
      )

      return locsForThisResult
    })
    .flat()

  return {
    locs,
    versionResultsNeedingUsfmByLoc,
  }
}

export const getQueryAndFlagInfo = ({ query, FLAG_MAP={} }) => {

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
}