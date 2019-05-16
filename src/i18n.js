let passedOverI18n = () => `You must call passedOverI18n before using this bibletags-ui-helper.`

export const passOverI18n = i18nFunc => passedOverI18n = i18nFunc

const i18n = (...params) => passedOverI18n(...params)

export default i18n