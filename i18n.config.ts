import { arabicPlurals } from "./i18n/plurals"
import { datetimeFormats } from "./i18n/datetime-formats"
import { numberFormats } from "./i18n/number-formats"

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  pluralRules: {
    ar: arabicPlurals,
  },
  datetimeFormats,
  numberFormats,
  vueI18nLoader: true,
}))
