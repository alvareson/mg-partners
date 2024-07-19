export const replaceValues = (string: string, replacements: object) => {
  return string.replace(/\{(\w+)\}/g, function (match, key) {
    return replacements[key] || match
  })
}

export const mapboxUrlHandler = (
  url: string,
  params: { lat: number; lng: number; token: string; size: string; zoom: number; style: string }
) => {
  return replaceValues(url, params)
}
