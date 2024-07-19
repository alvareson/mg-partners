type AltLinkParams = { locale: string; [key: string]: any }

export const useResolveAltPath = () => {
  const router = useRouter()
  const route = useRoute()

  const localePath = useLocalePath()
  const getBaseName = useRouteBaseName()
  const routeName = getBaseName(route)
  const resolveUrl = (params: AltLinkParams) => {
    const localizedRouteName = `${routeName}___${params.locale}`
    const baseRoute = router.resolve({ name: localizedRouteName, params: { ...route.params, ...params, locale: undefined } })
    return localePath(baseRoute, params.locale)
  }
  return resolveUrl
}

export const useI18nRouteAlt = (altLinksParams: AltLinkParams[]) => {
  const route = useRoute()
  route.meta.nuxtI18n = Object.fromEntries(altLinksParams.map($ => [$.locale, { ...$, locale: undefined }]))
}

export const useAltLinks = async (altLinksParams: AltLinkParams[]) => {
  const resolveUrl = useResolveAltPath()
  const urls = altLinksParams.filter($ => $.locale !== "ar").map(params => ({ locale: params.locale, url: resolveUrl(params) }))
  // const links = useLinks(urls)

  // Setup hints for language change actions on localized page slug
  useI18nRouteAlt(altLinksParams)

  // Fix inconsistent url (when lang doesnt match localized page slug)
  await useRedirectToCanonical(urls)

  // Setup lang links for SEO
  // useHead({ link: links })
}
