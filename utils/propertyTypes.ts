export type PropertyDescription = {
  brochure: Array<{
    language: string
    text: string
    title: string
  }>
  generic: Array<{
    language: string
    text: string
    title: string
  }>
  portal: Array<{
    language: string
    text: string
    title: string
  }>
  website: Array<{
    language: string
    title: string
    text: string
  }>
}

export type PropertyLocation = {
  osmId: number
  osmType: string
  lat: number
  lng: number
  country: string
  countryCode: string
  regionState: string
  address1: string
  address2: string
  zipCode: string
  pf: PropertySubLocation
  bayut: PropertySubLocation
}

export type PropertySubLocation = {
  city: string
  community: string
  subCommunity: string
  buildingName: string
}

export type PropertyContacts = {
  intermediary?: { id: string }
  notary?: { id: string }
  owner?: { id: string }
  propertyManager?: { id: string }
}

export type PropertyGeneral = {
  availabilityDate: string
  category: string
  dealType: string
  mandate: object
  market: string
  vip: boolean
}

export type PropertyMedia = {
  documents: any[]
  pictures: Array<{
    file: {
      name: string
      type: string
      url: string
    }
    onBroch: boolean
    onPortal: boolean
  }>
  plans: any[]
  videoTour: any
  virtualTour: any
}

export type PropertyPricing = {
  charges: any
  price: {
    originalPrice: number
    price: number
    priceM2: number
    rentPerDay: number
    rentPerMonth: number
    rentPerWeek: number
    rentPerYear: number
  }
}

export type PropertySpecific = {
  areas: {
    habitable: number
    usable: number
    weighted: number
  }
  bathrooms: number
  bedrooms: number
  buildingFloors: number
  constructionYear: string | number
  floor: string | number
  furnishing: string
  parking: {
    numberOfParkingSlots: number
  }
  renovation: any
  rooms: number
  studio: boolean
}

export type PropertyBroker = {
  id: string
  address: string
  created_at: string
  email: string
  is_default: boolean
  landline: string
  organization_id: string
  phone: string
  updated_at: string
  user_id: string
}
