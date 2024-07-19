import { defineEventHandler, getQuery } from 'h3'
import { isValueInDistrictEnum } from "~/utils/formatters"
import { fetchProperties } from './fetchProperties'

// const getMindallApiUrl = (): string => {
//   if (process.server) {
//     return process.env.NUXT_PUBLIC_MINDALL_API_FETCH || ''
//   }
//   const config = useRuntimeConfig()
//   return (config.public.mindallApiFetchPropertiesUrl as string) || ''
// }

// async function fetchProperties() {
//   const response = await fetch(getMindallApiUrl())
//   const data = await response.json()
//   return data.data
// }

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filters = {
    dealType: query.dealType,
    category: query.category,
    neighborhood: query.neighborhood,
    minPrice: query.minPrice ? Number(query.minPrice) : undefined,
    maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
  }
  const page = parseInt(query.page) || 1
  const pageSize = parseInt(query.pageSize) || 15

  const allProperties = await fetchProperties()
  let filteredProperties = allProperties

  // filtration
  if (Object.keys(filters).length) {
    filteredProperties = allProperties.filter((property) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true

        switch (key) {
          case 'dealType':
            return property.general?.dealType === value
          case 'neighborhood':
            return isValueInDistrictEnum(property.location?.pf.community, value)
          case 'minPrice':
            return property.pricing?.price.price >= value
          case 'maxPrice':
            return property.pricing?.price.price <= value
          case 'category':
            return property.general?.category === value
          default:
            return true
        }
      })
    })
  }

  // Pagination
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = filteredProperties.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    total: filteredProperties.length
  }
})
