import { defineEventHandler } from 'h3'
import { fetchProperties } from './fetchProperties'

export default defineEventHandler(async (event) => {
  const propertyId = event.context.params.id
  const allProperties = await fetchProperties()
  return allProperties.find(p => p.id === propertyId)
})
