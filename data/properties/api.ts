import { DirectusItemMetaRequest } from "nuxt-directus/dist/runtime/types"
import { localeToSimpleCode } from "~/data/pages/utils"

import { isValueInDistrictEnum } from "~/utils/formatters"
import type { PropertyLocation, PropertyBroker } from "~/utils/propertyTypes"

const getCmsAssetsUrl = () => {
  if (process.server) {
    return process.env.NUXT_PUBLIC_CMS_ASSETS_URL
  }
  const config = useRuntimeConfig()
  return config.public.cmsAssetsUrl
}

const getNeighborhoods = async (locale: string) => {
  const localeCode = localeToSimpleCode(locale)
  const { getItems } = useDirectusItems()
  const fields = [
    'id',
    'name',
    'translations.*',
    'translations.languages_id.*',
    "image",
  ]
  const opts: DirectusItemMetaRequest = {
    collection: "neighborhoods",
    params: {
      fields: [...fields],
    },
  } as DirectusItemMetaRequest
  const response = await getItems(opts)
  return response.map(neighborhood => ({
    ...neighborhood,
    translations: neighborhood.translations.filter(translation => translation.languages_id.code === localeCode),
  }))
}

export const getNeighborhood = async (location: PropertyLocation, locale: string) => {
  const neighborhoods = await getNeighborhoods(locale)
  let matchedNeighborhood = neighborhoods.find(n => n.name === location.pf.community)

  if (matchedNeighborhood) {
    matchedNeighborhood.translations = matchedNeighborhood.translations.filter(t => t.languages_id.code === locale)
    matchedNeighborhood.image = matchedNeighborhood.image ? `${getCmsAssetsUrl()}${matchedNeighborhood.image}` : null
    return matchedNeighborhood
  } else {
    return null
  }
}

export const getBrokers = async () => {
  const { getItems } = useDirectusItems()
  const fields = [
    'id',
    'brokerId',
    'firstName',
    'lastName',
  ]
  const opts: DirectusItemMetaRequest = {
    collection: "brokers",
    params: {
      fields: [...fields],
    },
  } as DirectusItemMetaRequest
  return await getItems(opts)
}

export const getBroker = async (brokerId: string): Promise<PropertyBroker | null> => {
  const brokers: PropertyBroker[] = await getBrokers()
  const broker = brokers.find(broker => broker.brokerId === brokerId)
  return broker || null
}


