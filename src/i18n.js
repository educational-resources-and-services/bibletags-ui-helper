let passedOverI18n = () => `You must call passedOverI18n before using this bibletags-ui-helper.`
let passedOverI18nNumber = () => `You must call passOverI18nNumber before using i18nNumber.`

export const passOverI18n = i18nFunc => passedOverI18n = i18nFunc
export const passOverI18nNumber = i18nNumberFunc => passedOverI18nNumber = i18nNumberFunc

const i18n = (...params) => passedOverI18n(...params)
export const i18nNumber = (...params) => passedOverI18nNumber(...params)

export default i18n