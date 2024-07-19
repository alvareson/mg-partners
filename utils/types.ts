import type {
  PropertyContacts,
  PropertyDescription,
  PropertyGeneral,
  PropertyLocation,
  PropertyMedia,
  PropertyPricing,
  PropertySpecific,
  PropertyBroker
} from "~/utils/propertyTypes"

export type MenuItem = {
  name: string
  class?: string
  to?: string | { name: string; params?: any }
  onClick?: () => void
}
export type PostT = {
  id: number | string
  title: string
  slug: string
  category?: {
    slug: string
    title: string
  }
  preview: {
    filename_disk: string
    title: string
    type: string
  } | null
  content?: string
  type?: "lg" | "xl" | null
}

export type PropertyT = {
  id: string
  amenities: string[]
  broker: PropertyBroker
  contacts: PropertyContacts
  createdAt: string
  description: PropertyDescription
  general: PropertyGeneral
  location: PropertyLocation
  media: PropertyMedia
  pricing: PropertyPricing
  publication: {
    bayut: boolean
    dubizzle: boolean
    pf: boolean
    website: boolean
  }
  reference: string
  soldAt: string
  specific: PropertySpecific
  status: string
  updatedAt: string
}

export enum PropertyTypes {
  apartment = "Apartment",
  duplex = "Duplex",
  hotelApartment = "Hotel Apartment",
  penthouse = "Penthouse",
  townhouse = "Townhouse",
  villa = "Villa",
  factory = "Factory",
  office = "Office",
  shop = "Shop",
  warehouse = "Warehouse",
}

export type Broker = {
  brokerId: string
  firstName: string
  lastName: string
}

export enum MeasurementUnit {
  SquareFeet = "sqft"
}

export enum DealTypesEnum {
  rent = "rent",
  sale = "sale"
}

