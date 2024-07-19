import { defineEventHandler } from 'h3'
import { fetchProperties } from './fetchProperties'

export default defineEventHandler(async () => {
  const allProperties = await fetchProperties()
  const minPrice = Math.min(...allProperties.map(p => p.pricing.price.price))
  const maxPrice = Math.max(...allProperties.map(p => p.pricing.price.price))
  const communities = [...new Set(allProperties.map(p => p.location.pf.community))]
  return {
    minPrice,
    maxPrice,
    communities,
  }
})
