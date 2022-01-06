# Bible Tags

## About

*Original language Bible study for everyone, in every language.*

Vision: That every Christian might have free access to the Bible tagged to the original Hebrew, Aramaic and Greek with parsing and lexical information—all in their own language.

For more information on this project, see the [Bible Tags website](https://bibletags.org).

## Repos

* [bibletags-data](https://github.com/educational-resources-and-services/bibletags-data) **(Contains general information on project design and contributing.)**
* [bibletags-react-native-app](https://github.com/educational-resources-and-services/bibletags-react-native-app)
* [bibletags-ui-helper](https://github.com/educational-resources-and-services/bibletags-ui-helper)
* [bibletags-versification](https://github.com/educational-resources-and-services/bibletags-versification)
* [bibletags-widget](https://github.com/educational-resources-and-services/bibletags-widget)
* [bibletags-widget-script](https://github.com/educational-resources-and-services/bibletags-widget-script)

## Bugs

* See [here](https://github.com/educational-resources-and-services/bibletags-ui-data/issues).
* Please first check if your bug report / feature request already exists before submitting a new issue.
* For bug reports, please provide a clear description of the problem and step-by-step explanation of how to reproduce it.

# bibletags-ui-helper

This repo provides functions used in both [bibletags-react-native-app](https://github.com/educational-resources-and-services/bibletags-react-native-app) and [bibletags-widget](https://github.com/educational-resources-and-services/bibletags-widget).

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
getVersionStr(versionId): String  //eg. "Hebrew (UHB)" or "ESV"
```

```js
getRefsInfo({ refs, skipBookName, abbreviated, usfmBookAbbr }): Object  // eg. { bookId: 1, chapter: 1, start_verse: 1, end_verse: 2 }
```

```js
getPassageStr(params): String  // eg. "Genesis 1:2–3"
```

```js
getBibleBookName(bookId): String  // in the proper language
```

```js
getUsfmBibleBookAbbr(bookId): String  // eg. "GEN"
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
getBibleBookAbbreviatedName(bookId): String  // eg. "Gen"
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
passOverI18n(i18nFunc): null
```

```js
passOverI18nNumber(i18nNumberFunc): null
```

```js
blockUsfmMarkers: Array
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
splitVerseIntoWords({ usfm, wordDividerRegex }): Array
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
getHebrewMorphPartDisplayInfo({ morphLang, morphPart, isPrefixOrSuffix, wordIsMultiPart }): Object
```