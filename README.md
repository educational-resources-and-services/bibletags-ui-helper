# Bible Tags

## About

*Original language Bible study for everyone, in every language.*

Vision: That every Christian might have free access to the Bible tagged to the original Hebrew, Aramaic and Greek with parsing and lexical information—all in their own language.

For more information on this project, see the [Bible Tags website](https://bibletags.org).

## Repos

* [bibletags-data](https://github.com/educational-resources-and-services/bibletags-data)
* [bibletags-react-native-app](https://github.com/educational-resources-and-services/bibletags-react-native-app)
* [bibletags-ui-helper](https://github.com/educational-resources-and-services/bibletags-ui-helper)
* [bibletags-versification](https://github.com/educational-resources-and-services/bibletags-versification)
* [bibletags-usfm](https://github.com/educational-resources-and-services/bibletags-usfm)
* [bibletags-widget](https://github.com/educational-resources-and-services/bibletags-widget)
* [bibletags-widget-script](https://github.com/educational-resources-and-services/bibletags-widget-script)

## Bugs

* Report [here](https://github.com/educational-resources-and-services/bibletags-data/issues).

# bibletags-ui-helper

This repo provides functions used in [bibletags-react-native-app](https://github.com/educational-resources-and-services/bibletags-react-native-app), [bibletags-widget](https://github.com/educational-resources-and-services/bibletags-widget), and [bibletags-data](https://github.com/educational-resources-and-services/bibletags-data).

## Special notes on word divisions

Most modern languages separate words with spaces or other punctuation, but there are some exceptions. See [here](https://en.wikipedia.org/wiki/Word_divider) and [here](https://linguistics.stackexchange.com/questions/6131/is-there-a-long-list-of-languages-whose-writing-systems-dont-use-spaces).

To address this, a `word divider regex` will need to be provided for any text where the default `/[\\P{L}]+/gu` is not the valid regex for the split function.

This will leave some languages without precise word dividers, resulting, at times, in smaller divisions than words (e.g. syllables). While this is not ideal for these languages, it should nonetheless allow all aspects of the app and widget to function properly, and only require a bit more clicking/tapping when tagging these texts to the original languages.

Programmatic exceptions to this approach will be few. To date, the following exception(s) exist:

* Possession and contractions in English using an apostraphe. E.g. `Balaam’s`, `shouldn’t`. Such apostraphes will be escaped before the `word divider regex` is used to split the verse.

*Please [contact us](https://bibletags.org/contact) to suggest any programmatic exceptions for other languages.*

Known examples of languages without precise word dividers:

* Vietnamese and Tai Lü use spaces to divide by syllable.
* Tibetan and Dzongkha use other marks to divide by syllable.
* While most Chinese characters are a single word, some words are made up of more than one.
* Japanese characters are each a single syllable.
* Lao translation may or may not use spaces.

Note: While embedding sites/apps providing USFM for verse content could distinguish between words, this information cannot be relied upon since other embedding sites/apps may only provide plain text.

## Functions exposed

```js
getOrigLangVersionIdFromRef(ref): "uhb" | "ugnt"
```

```js
getOrigLangAndLXXVersionInfo(): Object
```

```js
getOrigLanguageText(languageId): String  // "Hebrew" or "Greek" in the proper language
```

```js
getVersionStr(versionId): String  //e.g. "Hebrew (UHB)" or "ESV"
```

```js
getRefsInfo({ refs, skipBookName, abbreviated, usfmBookAbbr }): Object  // e.g. { bookId: 1, chapter: 1, start_verse: 1, end_verse: 2 }
```

```js
getPassageStr(params): String  // e.g. "Genesis 1:2–3"
```

```js
getBibleBookName(bookId): String  // in the proper language
```

```js
getUsfmBibleBookAbbr(bookId): String  // e.g. "GEN"
```

```js
getBookIdFromUsfmBibleBookAbbr(abbr): Int  // between 1-66
```

```js
getRefsFromUsfmRefStr(usfmRefStr): [ Object ]
```

```js
getUsfmRefStrFromLoc(loc): String
```

```js
getBibleBookAbbreviatedName(bookId): String  // e.g. "Gen"
```

```js
getNormalizedPOSCode({ morphLang, morphPos }): String
```

```js
getPOSTerm({ languageId, posCode }): String
```

```js
getMorphPartDisplayInfo({ morphLang, morphPart, isPrefixOrSuffix, wordIsMultiPart }): { str: String, color: String }
```

```js
getMainWordPartIndex(wordParts): Int
```

```js
getStrongs(wordInfo): String
```

```js
getIsEntirelyPrefixAndSuffix(wordInfo): Boolean
```

```js
hash64(str): String
```

```js
getWordsHash({ usfm, wordDividerRegex }): [ String ]
```

```js
getWordHashes({ usfm, wordDividerRegex }): [ { wordNumberInVerse: Int, hash: String, withBeforeHash: String, withAfterHash: String, withBeforeAndAfterHash: String }
```

```js
isValidEmail(email): Boolean
```

```js
isOriginalLanguageSearch(searchText): String
```

```js
getTextLanguageId({ languageId, bookId }): String
```

```js
isRTLText({ languageId, bookId, searchString }): Boolean
```

```js
getCopyVerseText({ pieces, ref, versionAbbr }): String | undefined
```

```js
getMorphInfo(morph): Object
```

```js
getColorWithOpacity(color='rgba(0,0,0,1)', opacity): String
```

```js
passOverI18n(i18nFunc): null
```

```js
passOverI18nNumber(i18nNumberFunc): null
```

```js
blockUsfmMarkers: Array
```

```js
wordPartDividerRegex: RegExp
```

```js
headingBlockUsfmMarkers: Array
```

```js
inlineUsfmMarkers: Array
```

```js
specialUsfmMarkers: Array
```

```js
tagInList({ tag, list }): Boolean
```

```js
getPiecesFromUSFM({ usfm='', inlineMarkersOnly, wordDividerRegex, splitIntoWords }): Array
```

```js
splitVerseIntoWords({ usfm, wordDividerRegex, pieces, isOriginal }): Array
```

```js
adjustPiecesForSpecialHebrew({ isOriginal, languageId, pieces }): Array
```

```js
adjustTextForSups({ tag, text, pieces, idx }): String
```

```js
getNormalizedGreekPOSCode(posCode): String
```

```js
getGreekPOSTerm(posCode): String
```

```js
getGreekPOSTypeTerm(posCode): String
```

```js
getGreekMorphPartDisplayInfo({ morphPart }): Object
```

```js
getHebrewPOSTerm(posCode): String
```

```js
getGrammarColor({ isPrefixOrSuffix, morphPart="" }): String | undefined
```

```js
grammarColors: Object
```

```js
getHebrewMorphPartDisplayInfo({ morphLang, morphPart, isPrefixOrSuffix, wordIsMultiPart }): Object
```

```js
bibleSearch({ query, flags, hebrewOrdering, offset, limit, getVersions, getUnitWords, getUnitRanges, getVerses, maxNumVersion=5, doClocking=false }): Object
```

```js
getQueryAndFlagInfo({ query, FLAG_MAP={} }): Object
```

```js
getInfoOnResultLocs({ resultsNeedingUsfm, lookupVersionInfo }): Object
```

```js
containsHebrewChars(str): Boolean
```

```js
containsGreekChars(str): Boolean
```

```js
removeCantillation(usfm): String
```

```js
stripHebrewVowelsEtc(str): String
```

```js
normalizeSearchStr({ str, languageId }): String
```

```js
stripVocalOfAccents(str): String
```

```js
findLanguage({ searchStr, maxNumHits }): [Object]
```

```js
getLanguageInfo(iso6393): Object
```

## Constants exposed

```js
defaultWordDividerRegex: String
```

```js
bibleSearchScopes: Object
```