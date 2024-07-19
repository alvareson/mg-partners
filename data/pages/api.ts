import { lang, squashTranslation } from "./utils"

export const getAboutUs = async () => {
  const { getSingletonItem } = useDirectusItems()
  const { locale } = useI18n()
  const page = await getSingletonItem<any>({
    collection: "page_about_us",
    params: {
      fields: ["*", "translations.*", "translations.languages_id.*"],
    },
  })
  if (!page) return null
  
  const translation = page.translations.find(t => {
    console.log(t.languages_id.code);
    console.log(locale.value);
    
    return t.languages_id.code === locale.value
  })
  if (translation) {
    return squashTranslation({ ...page, translations: [translation] })
  }
  return null
}

export const getHome = async () => {
  const { getSingletonItem } = useDirectusItems()
  const { locale } = useI18n()
  const page = await getSingletonItem<any>({
    collection: "page_home",
    params: {
      fields: ["*", "translations.*", "translations.languages_id.*"],
    },
  })
  if (!page) return null

  const translation = page.translations.find(t => t.languages_id.code === locale.value)
  if (translation) {
    return squashTranslation({ ...page, translations: [translation] })
  }
  return null
}

export const getServices = async () => {
  const { getSingletonItem } = useDirectusItems()
  const { locale } = useI18n()
  const page = await getSingletonItem<any>({
    collection: "page_services",
    params: {
      fields: ["*", "translations.*", "translations.languages_id.*"],
    },
  })
  if (!page) return null

  const translation = page.translations.find(t => t.languages_id.code === locale.value)
  if (translation) {
    return squashTranslation({ ...page, translations: [translation] })
  }
  return null
}
