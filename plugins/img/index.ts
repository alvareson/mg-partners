const getCmsAssetsUrl = () => {
  if (process.server) {
    return process.env.NUXT_PUBLIC_CMS_ASSETS_URL
  }
  const config = useRuntimeConfig()
  return config.public.cmsAssetsUrl
}
type TransformKey = "thumb" | "sm" | "md" | "lg" | "orig"
const getImageSrc = (image: string | object, transform?: TransformKey) => {
  const path = typeof image === "string" ? image : image?.filename_disk
  if (!path) throw new Error("Image path is required")
  let url = `${getCmsAssetsUrl()}${path}`
  if (transform) url += `?key=${transform}`
  return url
}
const getImageSrcSet = (image: string | object, transforms: TransformKey[]): string => {
  const path = typeof image === "string" ? image : image?.filename_disk
  if (!path) throw new Error("Image path is required")

  const url = `${getCmsAssetsUrl()}${path}`
  let result = transforms.map((key, idx) => {
    if (!key) return `${url} ${idx + 1}x`
    return `${url}?key=${key} ${idx + 1}x`
  })
  return result.join(", ")
}
const getImgSrcAttrs = (image: string | { filename_disk: string; title?: string; type?: string }, transforms: TransformKey[]) => {
  const attrs = {
    src: getImageSrc(image, transforms[0]),
    srcset: getImageSrcSet(image, transforms),
  }
  if (typeof image !== "string" && image?.title) {
    attrs["title"] = image.title
    attrs["alt"] = image.title
  }
  return attrs
}

export default defineNuxtPlugin({
  name: "img",
  setup() {
    const cmsAssetUrl = getCmsAssetsUrl()
    return {
      provide: {
        img: getImgSrcAttrs,
        getImageSrcSet,
        getImageSrc,
        cmsAssetUrl,
      },
    }
  },
})
