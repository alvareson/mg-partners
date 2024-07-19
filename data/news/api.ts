import { set } from "@/utils/lodash"
import { DirectusItemMetaRequest } from "nuxt-directus/dist/runtime/types"
import { localeToSimpleCode } from "~/data/pages/utils"

const getCmsAssetsUrl = () => {
  if (process.server) {
    return process.env.NUXT_PUBLIC_CMS_ASSETS_URL
  }
  const config = useRuntimeConfig()
  return config.public.cmsAssetsUrl
}

export const transformPost = (dto: any, targetLocale: string, cmsAssetsUrl: string) => {
  const translation = dto.translations.find($ => $.languages_id.code === targetLocale)
  const assetsUrl = getCmsAssetsUrl()
  const mainImageUrl = dto.main_image ? `${assetsUrl}${dto.main_image}` : null

  return {
    _locale: targetLocale,
    id: dto.id,
    status: dto.status,
    category: dto.category,
    date: new Date(dto.date_created),
    read_time: 5,
    preview: mainImageUrl,
    title: translation?.title,
    slug: translation?.slug,
    altSlug: dto.translations.map(t => ({ locale: t.languages_id.code, slug: t.slug })),
    content: translation?.content
  }
}

export const listPosts = async (
  locale: string,
  pagination: { page: number; limit: number } = { page: 1, limit: 10 },
  filter: { byCategory?: string | null } = {}
) => {
  const localeCode = localeToSimpleCode(locale)
  const { getItems } = useDirectusItems()
  const fields = [
    "id",
    "date_created",
    "user_created",
    "categories.id",
    "categories.slug",
    "categories.title",
    "translations.title",
    "translations.slug",
    "translations.content",
    "translations.languages_id.*",
    "main_image",
  ]
  const opts: DirectusItemMetaRequest = {
    collection: "posts",
    params: {
      lang: [localeCode],
      fields: [...fields],
      limit: pagination.limit,
      page: pagination.page,
      filter: {
        status: { _eq: "published" },
      },
    },
  } as DirectusItemMetaRequest
  if (filter.byCategory) {
    set(opts, "params.filter.categories", +filter.byCategory)
  }

  const total = await getItems({
    collection: "posts",
    params: { filter: opts.params.filter, aggregate: { count: "*" } },
  }).then(res => +res[0].count)
  const posts= await getItems(opts)
  const items = posts.map(post => transformPost(post, localeCode))
  return { items, total }
}

export const getPost = async (slug: string, locale: string) => {
  const { getItems } = useDirectusItems()
  const localeCode = localeToSimpleCode(locale)
  const fields = [
    "id",
    "date_created",
    "user_created",
    "categories.id",
    "categories.slug",
    "categories.title",
    "translations.title",
    "translations.slug",
    "translations.content",
    "translations.languages_id.*",
    "main_image",
  ]
  const opts = {
    collection: "posts",
    params: {
      fields: [...fields],
      filter: { translations: { slug: { _eq: slug } } },
    },
  }
  const posts = await getItems(opts)
  if (!posts || posts.length === 0) throw new Error("Post not found")
  return transformPost(posts[0], localeCode)
}

export const getCategories = async (locale: string) => {
  const localeCode = localeToSimpleCode(locale)
  const { getItems } = useDirectusItems()
  const fields = [
    'id',
    'status',
    'date_created',
    'translations.*',
    'translations.languages_id.*'
  ]
  const opts: DirectusItemMetaRequest = {
    collection: "categories",
    params: {
      fields: [...fields],
    },
  } as DirectusItemMetaRequest
  const response = await getItems(opts)
  return response.map(category => ({
    ...category,
    translations: category.translations.filter(translation => translation.languages_id.code === localeCode),
  }))
}
