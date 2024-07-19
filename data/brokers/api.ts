import { DirectusItemMetaRequest } from "nuxt-directus/dist/runtime/types"
import type { Member } from "../model/types"

const getCmsAssetsUrl = () => {
  if (process.server) {
    return process.env.NUXT_PUBLIC_CMS_ASSETS_URL
  }
  const config = useRuntimeConfig()
  return config.public.cmsAssetsUrl
}

export const listBokers = async () => {
	const { getItems } = useDirectusItems()
	const fields = [
		'id',
		'name',
		'position',
		'avatar',
	]
	const opts: DirectusItemMetaRequest = {
		collection: "brokers",
		params: {
			fields: [...fields],
		},
	} as DirectusItemMetaRequest
	const response = await getItems(opts) as Member[]
  const assetsUrl = getCmsAssetsUrl()

  return response.map(broker => {
    const { avatar, ...brokerRest } = broker
    const updatedAvatar = avatar ? `${assetsUrl}${avatar}` : null
    return {
      ...brokerRest,
      avatar: updatedAvatar
    }
  })
}