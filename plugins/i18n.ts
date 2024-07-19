const getRouteLocale = route => {
  if (!route.name) return "en"
  return route.name.split("___")[1] ?? "en"
}

const getBaseName = route => {
  if (!route.name) return route.name
  return route.name.split("___")[0]
}

const isSameExceptLocale = (a, b) => {
  // different pages
  if (getBaseName(a) !== getBaseName(b)) return false
  // same locales
  if (getRouteLocale(a) === getRouteLocale(b)) return false

  return true
}

export default defineNuxtPlugin({
  name: "i18n",
  setup() {
    const router = useRouter()
    router.beforeEach((to, from, next) => {
      if (!isSameExceptLocale(to, from)) return next()

      const altLocales = from.meta["_i18_alt"] as any[]
      if (!altLocales) return next()

      const newLocale = getRouteLocale(to)
      const alt = altLocales.find(({ locale }) => locale === newLocale)

      // already on the right page
      if (to.fullPath === alt.url) return next()

      return next(alt.url)
    })
  },
})
