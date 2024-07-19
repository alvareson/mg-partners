import { WritableComputedRef } from "nuxt/dist/app/compat/vue-demi"

export const useRouterParams = (params: { name: string; default: any; number?: true }[]) => {
  const route = useRoute()
  const router = useRouter()
  const data = {}
  for (const param of params) {
    data[param.name] = computed({
      get: () => {
        const value = route.query[param.name] as string
        if (param.number) return +value || param.default
        return value || param.default
      },
      set: $ => {
        if (!$ || $ === param.default) return router.replace({ query: { ...route.query, [param.name]: undefined } })
        router.replace({ query: { ...route.query, [param.name]: $ } })
      },
    })
  }
  return data as Record<string, WritableComputedRef<any>>
}
