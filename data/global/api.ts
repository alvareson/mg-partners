type GlobalData = {
  address: string | null
  email: string | null
  phone: string | null
}

const globalData = ref<GlobalData | null>(null)

export const fetchGlobalData = async () => {
  const { getSingletonItem } = useDirectusItems()
  globalData.value = await getSingletonItem<GlobalData>({ collection: "global" })
}

export const useGlobalData = async () => {
  if (!globalData.value) await fetchGlobalData()
  return globalData.value
}
