import { DirectusItemMetaRequest } from "nuxt-directus/dist/runtime/types"
import type { Member } from "../model/types"

const assetsUrl = "https://api.horizonvista.net/assets/"

const getCmsAssetsUrl = () => {
  if (process.server) {
    return process.env.NUXT_PUBLIC_CMS_ASSETS_URL || assetsUrl
  }
  const config = useRuntimeConfig()
  return config.public.cmsAssetsUrl ?? assetsUrl
}

export const listMembers = async () => {
	const { getItems } = useDirectusItems()
	const fields = [
		'id',
		'name',
		'position',
		'avatar',
	]
	const opts: DirectusItemMetaRequest = {
		collection: "members",
		params: {
			fields: [...fields],
		},
	} as DirectusItemMetaRequest
	const response = await getItems(opts) as Member[]
  const assetsUrl = getCmsAssetsUrl()

  return response.map(member => {
    const { avatar, ...memberRest } = member
    const updatedAvatar = avatar ? `${assetsUrl}${avatar}` : null
    return {
      ...memberRest,
      avatar: updatedAvatar
    }
  })
}