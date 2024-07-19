export const squashTranslation = <T>(data): T | null => {
  if (!data) return null
  let result = { ...data }
  delete result.translations
  result = { ...data.translations[0], ...result }
  return result as T
}
export const localeToSimpleCode = locale => (locale.length === 2 ? locale : locale?.split?.("-")?.[0])
export const lang = locale => ({
  deep: {
    translations: {
      _filter: {
        languages_code: { _eq: localeToSimpleCode(locale) },
      },
    },
  },
})
