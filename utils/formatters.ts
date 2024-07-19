import type { PropertyLocation, PropertyDescription, PropertyPricing } from "~/utils/propertyTypes"
import { DealTypesEnum } from "~/utils/types"

export const formatPrice = (price, currency: string = "AED", withTrailing = false, showZero = false) => {
  if (!price) return showZero ? `0${currency ? ` ${currency}` : ""}` : ""

  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    minimumFractionDigits: withTrailing ? 2 : 0,
  })
  return formatter.format(price)?.replace(/\./g, ",")
}

export const isValueInDistrictEnum = (value: string, filterValue: string): boolean => {
  return normalizeText(value) === normalizeText(filterValue)
}

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .split("")
    .filter(char => char !== " ")
    .join("")
}

function removeInlineStyles(htmlText, preserveMargins = false) {
  const preserve = (styleMatch, styles) => {
    const preservedStyles = styles.replace(/(?:^|;)\s*(?!(?:padding|margin)\s*:)[^;]+/g, "")
    return 'style="' + preservedStyles + '"'
  }
  return htmlText.replace(/<[^>]*style\s*=['"][^'"]*['"][^>]*>/gi, match => {
    return match.replace(/style\s*=['"](.*?)['"]/gi, preserveMargins ? preserve : "")
  })
}

export const formatterPropertyInfo = (description: PropertyDescription, field: string) => {
  const descriptionData = description?.website?.[0]?.[field] ?? description?.generic?.[0]?.[field]
  if (descriptionData) {
    return removeInlineStyles(descriptionData)
  }
  return ""
}

export const handleAddress = (location: PropertyLocation) => {
  if (location?.countryCode && location?.countryCode === "AE") {
    const parts = [location.country, location?.pf?.city, location?.pf?.community, location?.pf?.subCommunity, location?.pf?.buildingName].filter(Boolean)
    return parts.join(", ")
  } else {
    const parts = [location.country, location.address1, location.address2, location.regionState].filter(Boolean)
    return parts.join(", ")
  }
}

export const handlePrice = (pricing: PropertyPricing, dealType: string) => {
  console.log(pricing);
  console.log(dealType);
  
  if (dealType === DealTypesEnum.rent) {
    return `${formatPrice(pricing.price.rentPerYear)} / year`
  } else {
    return `${formatPrice(pricing.price.price)}`
  }
}
