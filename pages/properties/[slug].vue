<template>
  <div class="property" v-if="property">
    <div class="property__main">
      <div class="property__top container-no-padding">
        <AppLink class="property__back" :to="{ path: '/' }">
          <Icon name="arrow-left" />
          Back to search
        </AppLink>
        <div class="property__top-inner">
          <header class="property__header">
            <AppLink class="property__back" :to="{ path: '/' }">
              <Icon name="arrow-left" />
              Back to search
            </AppLink>
            <h1 v-if="property?.general?.category && property?.location && property?.general?.dealType" class="property__title text-h2">
              <span class="property__title-1">{{ property?.general?.category.toUpperCase() }} IN</span>
              <span class="property__title-2">{{ handleDisplayNeighborhood(property?.location).toUpperCase() }} FOR {{ property?.general?.dealType.toUpperCase() }}</span>
            </h1>
            <h2>{{ formatterPropertyInfo(property.description, "title") }}</h2>
          </header>
          <div class="property__data">
            <div v-if="property.pricing && property.general.dealType" class="property__price">
              {{ handlePrice(property.pricing, property.general.dealType) }}
            </div>
            <ul v-if="property.specific" class="property__data-items">
              <li v-if="property?.specific.bedrooms" class="property__data-item">
                <Icon name="bed" />
                {{ `${property?.specific.bedrooms} bedrooms` }}
              </li>
              <li v-if="property?.specific.bathrooms" class="property__data-item">
                <Icon name="shower" />
                {{ `${property?.specific.bathrooms} bathrooms` }}
              </li>
              <li v-if="property?.specific.areas.habitable && measurement" class="property__data-item">
                <Icon name="area" />
                {{ property?.specific.areas.habitable }} {{ measurement }}
              </li>
            </ul>
          </div>
        </div>
        <div class="property__image">
          <Swiper v-if="property.media?.pictures.length" class="property__swiper" :modules="[Navigation]" space-between="10" loop navigation>
            <SwiperSlide v-for="(image, index) in property.media?.pictures" :key="index" class="property__slide">
              <img :src="image.file.url" alt="" class="property__img" />
            </SwiperSlide>
          </Swiper>
          <div v-if="property?.general?.dealType" class="property__type">For {{ property?.general?.dealType }}</div>
        </div>
      </div>

      <div class="property__bottom container">
        <div class="property__content">
          <div v-if="property.description?.generic && property.description?.generic[0]" class="property__description">
            <h2 class="property__subtitle text-h3">Description</h2>
            <div class="property__description-text">
              <p v-if="property?.description" class="property__text" v-thtml="formatterPropertyInfo(property?.description, 'text')" />
            </div>
          </div>
          <div v-if="amenitiesWithIcons && amenitiesWithIcons.length > 0" class="property__features" ref="featuresRef">
            <h2 class="property__subtitle text-h3">Features</h2>
            <ul class="property__features-list">
              <li class="property__features-item" v-for="{ name, icon } in amenitiesWithIcons" :key="name">
                <Icon :name="icon" /> {{ name }}
              </li>
            </ul>
            <button class="property__features-all" type="button" v-if="amenitiesWithIcons.length > 9" @click="viewAllFeatures">
              View all
            </button>
          </div>
          <div class="property__video" v-if="property?.media?.videoTour && property?.media?.videoTour.length > 0">
            <h2 class="property__subtitle text-h3">Video Tour</h2>
            <iframe
              :src="youtubeEmbedUrl(property.media.videoTour[0].url)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <div class="property__location">
            <h2 class="property__subtitle text-h3">Location</h2>
            <div v-if="property.location" class="property__location-wrapper">
              <p>{{ handleAddress(property.location) }}</p>
              <button class="property__location-google-maps" type="button" @click="openInGoogleMaps">See on Google Maps</button>
            </div>
            <img :src="localMap" width="740" height="320" alt="" />
          </div>
        </div>
        <ContactAgent class="property__contact-agent" :broker="broker" :reference="property.reference" />
      </div>
    </div>
    <!-- <AboutNeighborhood v-if="neighborhood" :neighborhood="neighborhood" />
    <PropertiesSlider v-if="false" title="You Might Also Like" :properties="[]" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { mapboxUrlHandler } from "~/utils/mapbox"
import { handleAddress } from "~/utils/formatters"
import { getNeighborhood, getBroker } from "~/data/properties/api"
import { amenityIcons, formatAmenityName } from "~/utils/amenities"
import { formatterPropertyInfo, handlePrice } from "~/utils/formatters"
import { MeasurementUnit } from "~/utils/types"
import type { PropertyBroker, PropertyLocation } from "~/utils/propertyTypes"

import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

// const { locale } = useI18n()

const route = useRoute()
// const neighborhood = ref<object | null>(null)
// const broker = ref<PropertyBroker | null>(null)
const measurement = ref<MeasurementUnit>(MeasurementUnit.SquareFeet)
const showOverlay = ref(false)

// const { data: property } = useFetch(computed(() => `/api/properties/${route.params.slug}`))

// onMounted(async () => {
//   const propertyId = route.params.slug
//   if (property.value?.location) neighborhood.value = await getNeighborhood(property.value?.location, locale.value)
//   if (property.value?.broker.id) broker.value = await getBroker(property.value?.broker.id)
// })

const neighborhood = ref({
  name: "Downtown",
  description: "A vibrant neighborhood with plenty of amenities and attractions."
})

const broker = ref({
  firstName: "Richard",
  lastName: "Barnett"
})

const amenitiesWithIcons = computed(() => {
  return (
    property?.value?.amenities?.map(amenity => ({
      name: formatAmenityName(amenity),
      icon: amenityIcons[amenity] || "",
    })) || []
  )
})

const changeOverlay = () => {
  showOverlay.value = !showOverlay.value
}

const handleDisplayNeighborhood = (location: PropertyLocation) => {
  if (neighborhood.value && neighborhood?.name) return neighborhood?.name
  return location.pf.community
}

const featuresRef = ref<HTMLDivElement | null>(null)
const viewAllFeatures = () => featuresRef?.value?.classList.add("property__features--expanded")

// const amenitiesWithIcons = computed(() => {
//   return (
//     property?.value?.amenities?.map(amenity => ({
//       name: formatAmenityName(amenity),
//       icon: amenityIcons[amenity] || "",
//     })) || []
//   )
// })

const config = useRuntimeConfig()
const localMap = computed(() => {
  return mapboxUrlHandler(
    "https://api.mapbox.com/styles/v1/mapbox/{style}/static/pin-l+3584e4({lat},{lng})/{lat},{lng},{zoom},0/{size}?access_token={token}",
    {
      lng: property.value?.location?.lng,
      lat: property.value?.location?.lat,
      token: config.public.mapboxAccessToken,
      size: "800x600",
      style: "streets-v12",
      zoom: 16,
    }
  )
})

const openInGoogleMaps = () => {
  if (property.value?.location?.lat && property.value?.location?.lng) {
    const lat = property.value.location.lat
    const lng = property.value.location.lng
    const googleMapsUrl = `https://www.google.com/maps?q=${lng},${lat}`
    window.open(googleMapsUrl, "_blank")
  }
}

const youtubeEmbedUrl = (url: string) => {
  const urlObj = new URL(url)
  let videoId = urlObj.searchParams.get('v')
  if (!videoId) {
    const pathSegments = urlObj.pathname.split('/')
    videoId = pathSegments[pathSegments.length - 1]
  }
  return `https://www.youtube.com/embed/${videoId}`
}



const property = ref({
    id: '66962d5515df0ffb3502c2e2',
    amenities: [
      'parking', 'elevator', 'pets', 'conciergeService', 'maidService', 'securityService',
      'lobbyBuilding', 'studyRoom', 'balcony', 'walkInCloset', 'childrensPlayArena',
      'garden', 'barbecueArea', 'sauna', 'sharedGym', 'privateGym', 'sharedPool', 'privatePool',
      'spa', 'viewLandmark', 'nearbyHospitals', 'nearbyPubTransport', 'nearbySchools',
      'nearbyShoppingMalls'
    ],
    contacts: {
      intermediary: { id: null },
      notary: { id: null },
      propertyManager: { id: 'a597d13e-06e4-4add-b163-c9ffd3da6a6c' },
      owner: { id: null }
    },
    createdAt: '2024-07-16T08:20:37.170000Z',
    description: {
      generic: [
        {
          language: 'english',
          title: 'PREMIUM AND SPACIOUS | FURNISHED | HIGH FLOOR',
          text: 
            '<p>Our company presents this amazing 2-bedroom apartment for rent in Business Bay. Apartments in DAMAC Maison Bay’s Edge offer a world of luxurious amenities and services along with breathtaking views.</p><p>The tower consists of 24 floors above ground.  The property offers stunning balcony views and is easily accessible on Sheikh Zayed Road and Business Bay Metro. </p><p>The apartment benefits from a large living room/bedroom area allowing for an airy feel and plenty of natural light directly from the sun—the best Property to buy in Dubai. </p><br><p><strong>Property Details:</strong> </p><p>- Fully Furnished </p><p>- BUA: 1254.53 sqft</p><p> - 2 Bedroom</p><p> - 3 Bathroom </p><p>- Living / Dining Area </p><p>- Fully Fitted Kitchen </p><p>- Open Plan</p><p> - Built-in Wardrobes</p><p> - Balcony </p>'
        }
      ],
      website: null,
      brochure: null,
      portal: null
    },
    general: {
      dealType: 'rent',
      completionStatus: null,
      rentalFrequency: 'yearly',
      market: null,
      cheques: 2,
      category: 'apartment',
      availabilityDate: '2024-07-31T00:00:00+00:00',
      mandate: {
        type: 'nonExclusive',
        startAt: '2024-07-31T00:00:00+00:00',
        endAt: '2024-07-31T00:00:00+00:00',
        renewalAt: '2024-07-31T00:00:00+00:00',
        rera: '7116786392',
        dtcm: null
      },
      offMarket: false
    },
    location: {
      osmId: null,
      osmType: null,
      country: 'United Arab Emirates',
      countryCode: 'AE',
      district: null,
      address1: null,
      address2: null,
      zipCode: null,
      pf: {
        city: 'Dubai',
        community: 'Business Bay',
        subCommunity: 'Bay\'s Edge',
        buildingName: null
      },
      bayut: {
        city: 'Dubai',
        community: 'Business Bay',
        subCommunity: 'DAMAC Maison Bay\'s Edge',
        buildingName: null
      },
      type: 'Point',
      coordinates: [ 55.27151019999999, 25.1815668 ],
      lng: 25.189049,
      lat: 55.264700
    },
    media: {
      documents: [
        {
          file: {
            name: '38d36de1-fbfe-4f01-a7df-e7bc36f9397a.jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/document/1ff023ae-d030-451f-a256-77ab87b792ac.jpeg',
            type: 'document'
          }
        },
        {
          file: {
            name: 'a77457f9-a7ae-4fda-a8a1-0144120a933c.jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/document/0f813a72-ba17-456d-adaa-c08c58d6d6e8.jpeg',
            type: 'document'
          }
        },
        {
          file: {
            name: 'BAYS EDGE NOC.pdf',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/document/3deb04ce-d8b2-4523-85e7-394dbbb02431.pdf',
            type: 'document'
          }
        },
        {
          file: {
            name: 'BE 2201.pdf',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/document/e23d4023-d947-40d4-8274-a0343a6ed796.pdf',
            type: 'document'
          }
        }
      ],
      pictures: [
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (11).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/04bfb845-6746-43b2-9073-957fb57e4587.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (1).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/754b4394-2053-42f1-a40e-5ddf55497946.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (4).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/48402104-c787-470f-b33d-4766961fb828.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (2).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/85de91bc-b891-40d2-b6cc-2f1a95603c95.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (6).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/3b5a81ed-93c0-4a99-a091-d83cabafcd7f.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (9).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/c6b3c85e-308e-4155-ae15-44ea58eebd08.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.06 AM (2).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/8624ffe1-23bf-437f-bed4-cec76929a752.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (7).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/7a654b5c-6fb4-4a7f-a801-625af640dd3f.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (8).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/1c608bf9-c82a-4197-a9c8-8b76557e4987.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (10).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/ead194b2-4f69-45f1-b53c-154efd838ed1.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.05 AM (12).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/250b86f3-4732-43b4-add8-47aecb82121f.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.06 AM (1).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/33b03205-2f4c-4671-9ffc-e5f762702b89.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.06 AM (5).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/ff59dca9-c02d-42f1-bf37-91911124feaa.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.06 AM (6).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/4c7d2bdd-1126-426d-a0d8-db90b4b43bab.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.06 AM.jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/81937cc7-b211-458c-b508-eb3fe67f8847.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        },
        {
          file: {
            name: 'WhatsApp Image 2024-04-06 at 10.03.07 AM (1).jpeg',
            url: 
              'https://s3.crm.mindall.co/crm/properties/66962d5515df0ffb3502c2e2/photo/198e2134-66be-4c5b-81fa-b563915e0379.jpeg',
            type: 'photo'
          },
          onBroch: true,
          onPortal: true,
          hasWatermark: true
        }
      ]
    },
    pricing: {
      price: {
        price: 0,
        priceM2: null,
        rentPerDay: null,
        rentPerWeek: null,
        rentPerMonth: null,
        rentPerYear: 160000
      },
      charges: {
        annualCharges: null,
        monthlyCharges: null,
        chargesIncluded: false
      }
    },
    publication: { website: true, bayut: true, dubizzle: true, pf: true },
    reference: 'HV-L1077',
    soldAt: null,
    specific: {
      floor: 22,
      buildingFloors: null,
      rooms: 2,
      bathrooms: 3,
      bedrooms: 2,
      parking: { numberOfParkingSlots: 1 },
      areas: { habitable: 1254.53, usable: 1254.53, weighted: 1254.53 },
      unitNumber: '2201',
      constructionYear: null,
      renovation: null,
      furnishing: 'yes',
      studio: false
    },
    status: 'active',
    updatedAt: '2024-07-19T06:43:49.370000Z',
    broker: {
      id: '9c3e9a1a-452b-4265-a8c7-be9fcd076a0c',
      organization_id: '96766a4d-d508-4c82-8d3d-94dbf95df867',
      user_id: 'd3b8e0be-c673-4bff-88f5-c72266955df3',
      is_default: true,
      email: 'enquiries@horizonvista.net',
      phone: '+971585065419',
      address: null,
      landline: null,
      created_at: null,
      updated_at: '2024-03-22T16:11:51.000000Z',
      first_name: 'Francisca',
      last_name: 'Elizabeth Van Den Berkmortel',
      deleted_at: null,
      work_schedule_id: null
    }
  })
</script>

<style lang="scss">
.property {
  overflow-x: clip;

  &__main {
    padding-bottom: clamp(5rem, 3.7255rem + 5.2288vw, 10rem);
    color: var(--color-white);
    background: var(--color-quaternary);
  }

  &__top {
    display: flex;
    margin-bottom: clamp(5rem, 3.7255rem + 5.2288vw, 2rem);
    background: var(--color-white);

    @media (max-width: 63.9375rem) {
      flex-direction: column;
      padding-top: 1.5rem;
    }

    @media (max-width: 47.9375rem) {
      padding-top: 0.5rem;
    }

    & > .property__back {
      display: none;

      @media (max-width: 63.9375rem) {
        display: flex;
        order: -1;
        margin-bottom: 1.5rem;
      }
    }

    &-inner {
      width: clamp(18rem, 46.5vw, 88.5rem);
      padding-left: 4rem;

      @media (max-width: 63.9375rem) {
        width: 100%;
      }
    }
  }

  &__text {
    margin-top: 40px;
  }

  &__header {
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: min(24.1vw, 44.5rem);
    padding-inline: 0 3.5rem;

    @media (max-width: 63.9375rem) {
      min-height: 0;
      padding-block: 2rem;
      padding-inline: 0;
    }

    @media (max-width: 47.9375rem) {
      padding-block: 1.5rem;
    }

    &::before {
      position: absolute;
      inset: 0;
      inset-inline-start: -50vw;
      z-index: -1;
      content: "";
      background: var(--color-white);

      @media (max-width: 63.9375rem) {
        display: none;
      }
    }

    .property__back,
    .property__type {
      @media (max-width: 63.9375rem) {
        display: none;
      }
    }
  }

  &__back {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 3.5rem;
    font-weight: 500;
    text-decoration: underline;
    color: var(--color-quaternary);

    svg {
      [dir="rtl"] & {
        transform: rotate(180deg);
      }
    }
  }

  &__type {
    margin-block: auto 1.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.33;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: var(--color-white);
    border-radius: 5rem;

    @media (max-width: 47.9375rem) {
      font-size: 0.625rem;
    }
  }

  &__title {
    display: grid;
    margin-bottom: clamp(1.5rem, 0.6429rem + 1.3393vw, 2.25rem);
    color: var(--color-quaternary);
    font-size: 2.8rem;

    @media (max-width: 47.9375rem) {
      gap: 0.25rem;
      margin-bottom: 1rem;
    }

    &-1 {
      opacity: 0.5;
    }
  }

  &__read-more {
    margin-top: clamp(0.5rem, 0.1176rem + 1.5686vw, 2rem);
    font-weight: 500;
    text-decoration: underline;
  }

  &__data {
    display: grid;
    gap: 0.75rem;
    padding-block: 3.25rem 2.5rem;
    padding-inline: 0 3.5rem;
    background: var(--color-white);
    color: var(--color-quaternary);
    font-size: 1.1rem;
    font-weight: 500;

    @media (max-width: 63.9375rem) {
      padding: 0;
    }

    &-items {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      color: var(--color-quaternary);
    }

    &-item {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      &:not(:first-child) {
        &::before {
          width: 0.0625rem;
          height: 1.5rem;
          margin-inline-end: 0.5rem;
          content: "";
          background: var(--color-white);
        }
      }

      svg {
        @media (max-width: 47.9375rem) {
          display: none;
        }
      }
    }
  }

  &__price {
    font-size: 2.8rem;
  }

  &__image {
    position: relative;
    z-index: 0;
    display: grid;
    flex: 1;
    aspect-ratio: 16 / 9;
    margin-inline-end: calc(-50vw + 50%);

    @media (max-width: 111.5rem) {
      margin-inline-end: -2.5rem;
    }

    @media (max-width: 63.9375rem) {
      order: -1;
      min-height: 20rem;
      margin-inline: calc(var(--padding-inline) * -1);
    }

    .property__type {
      display: none;

      @media (max-width: 63.9375rem) {
        position: absolute;
        inset-inline-start: var(--padding-inline);
        top: var(--padding-inline);
        z-index: 1;
        display: block;
      }
    }
  }

  &__swiper {
    --button-size: 3rem;
    --swiper-navigation-size: 1rem;
    --swiper-navigation-sides-offset: 2rem;
    --swiper-navigation-color: var(--color-primary);
    --swiper-navigation-top-offset: calc(50% - var(--button-size) / 2);
    width: 100%;

    @media (max-width: 47.9375rem) {
      --swiper-navigation-sides-offset: 1rem;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: var(--button-size);
      height: var(--button-size);
      margin: 0;
      background: var(--color-white);
      border-radius: 50%;
      opacity: 0.7;
      transition: opacity 0.25s;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__bottom {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
    justify-content: space-between;
    padding-left: 4rem;

    @media (max-width: 63.9375rem) {
      display: block;
    }
  }

  &__content {
    flex: 1;
    max-width: 49.75rem;
  }

  &__description {
    max-width: 47rem;
    margin-bottom: clamp(5rem, 3.7255rem + 5.2288vw, 10rem);

    p {
      color: var(--color-white) !important;
    }
    @media (max-width: 63.9375rem) {
      display: none;
    }

    &-text {
      p {
        &:not(:last-child) {
          margin-bottom: 1.5rem;
        }
      }
    }
  }

  &__subtitle {
    margin-bottom: 2rem;
    line-height: 1.25;
    text-transform: uppercase;

    @media (max-width: 47.9375rem) {
      margin-bottom: 1rem;
    }
  }

  &__features {
    margin-bottom: clamp(5rem, 3.7255rem + 5.2288vw, 1rem);

    &-list {
      margin-top: -1rem;
      column-count: 3;
      column-width: 14rem;
    }

    &-item {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      padding-top: 1.5rem;

      &:nth-child(n + 10) {
        display: none;

        .property__features--expanded & {
          display: flex;
        }
      }
    }

    &-all {
      margin-top: 2.5rem;
      font-weight: 500;
      text-decoration: underline;

      @media (max-width: 47.9375rem) {
        margin-top: 1.5rem;
      }

      .property__features--expanded & {
        display: none;
      }
    }
  }

  &__location {
    &-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1rem;
      margin-bottom: 2rem;

      @media (max-width: 47.9375rem) {
        margin-bottom: 1.5rem;
      }
    }

    &-google-maps {
      font-weight: 500;
      text-decoration: underline;
    }
  }

  &__contact-agent {
    position: sticky;
    top: 10.5rem;
    width: clamp(25rem, 40vw, 33.5rem);
    z-index: 999;
    margin-right: 5%;

    @media (max-width: 63.9375rem) {
      margin-top: 15px;
      position: relative;
      width: auto;
    }
  }

  &__video {
    display: grid;
    gap: 0.75rem;
    padding-block: 3.25rem 3.5rem;
    padding-inline: 0 3.5rem;
    
    iframe {
      display: block;
      width: 100%;
      max-width: 800px;
      height: 450px;
    }
  }
}
</style>
