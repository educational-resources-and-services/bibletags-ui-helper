# bibletags-ui-helper

## Functions exposed (See src/index.js for return values, etc)

- `getOrigLangVersionIdFromRef(ref)`
- `getOrigLangAndLXXVersionInfo()`
- `getOrigLanguageText(languageId)`
- `getVersionStr(versionId)`
- `getRefsInfo({ refs, skipBookName, abbreviated, usfmBookAbbr })`
- `getPassageStr(params)`
- `getBibleBookName(bookId)`
- `getUsfmBibleBookAbbr(bookId =>)`
- `getBookIdFromUsfmBibleBookAbbr(abbr)`
- `getRefsFromUsfmRefStr(usfmRefStr)`
- `getUsfmRefStrFromLoc(loc)`
- `getBibleBookAbbreviatedName(bookId)`
- `getNormalizedPOSCode({ morphLang, morphPos })`
- `getPOSTerm({ languageId, posCode })`
- `getMorphPartDisplayInfo({ morphLang, morphPart, isPrefixOrSuffix, wordIsMultiPart })`
- `getMainWordPartIndex(wordParts)`
- `getStrongs(wordInfo)`
- `getIsEntirelyPrefixAndSuffix(wordInfo)`
- `hash64(str)`
- `getWordsHash({ usfm, wordDividerRegex })`
- `getWordHashes({ usfm, wordDividerRegex })`
- `isValidEmail(email)`
