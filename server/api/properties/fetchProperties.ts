export async function fetchProperties() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.mindallApiFetchPropertiesUrl || 'https://crm.mindall.co/api/api/integrations/website/335d98e7-c2da-4b00-bfd7-b1824314ee95/properties.json'
  const response = await fetch(apiUrl)
  const data = await response.json()
  return data.data
}
