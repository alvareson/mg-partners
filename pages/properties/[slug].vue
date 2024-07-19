<template>
  <div class="property" v-if="property">
    <div class="property__main">
      <div class="property__top container">
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
            <div v-if="property?.general?.dealType" class="property__type">For {{ property?.general?.dealType }}</div>
            <h1 v-if="property?.general?.category && property?.location" class="property__title text-h2">
              <span class="property__title-1">{{ property?.general?.category }} in</span>
              <!-- <span class="property__title-2">{{ handleDisplayNeighborhood(property?.location) }}</span> -->
              <span class="property__title-2">Al Shaikh Al Halud</span>
            </h1>
            <h2>{{ formatterPropertyInfo(property.description, "title") }}</h2>
          </header>
          <div class="property__data">
            <div v-if="property.pricing && property.general.dealType" class="property__price text-h2">
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
              <li class="property__features-item" v-for="{ name, icon } in amenitiesWithIcons" :key="name"><Icon :name="icon" /> {{ name }}</li>
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
              <!-- <button class="property__location-google-maps" type="button" @click="openInGoogleMaps">See on Google Maps</button> -->
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

const property = ref({
  id: 1,
  description: {
    title: "Beautiful Family Home",
    text: "<p>This is a beautiful family home located in a quiet neighborhood.</p>",
    generic: ["This property offers spacious living areas and modern amenities."]
  },
  pricing: {
    price: {
      price: 500000
    }
  },
  general: {
    category: "Apartment",
    dealType: "Sale"
  },
  specific: {
    bedrooms: 4,
    bathrooms: 3,
    areas: {
      habitable: 2500
    }
  },
  media: {
    pictures: [
      { file: { url: "/img/apartments/flat1.jpeg" } },
      { file: { url: "/img/apartments/flat2.jpeg" } }
    ],
    videoTour: [
      { url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ]
  },
  location: {
    address: "123 Main Street, Anytown, USA",
    lat: 40.7128,
    lng: -74.0060
  },
  reference: "PROP12345"
})

const broker = ref({
  name: "John Doe",
  phone: "555-1234",
  email: "john.doe@example.com"
})

const neighborhood = ref({
  name: "Downtown",
  description: "A vibrant neighborhood with plenty of amenities and attractions."
})

const amenitiesWithIcons = ref([
  { name: "Swimming Pool", icon: "pool" },
  { name: "Gym", icon: "gym" },
  { name: "Garage", icon: "garage" }
])

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
    margin-bottom: clamp(5rem, 3.7255rem + 5.2288vw, 10rem);

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
      width: clamp(25rem, 46.5vw, 38.5rem);

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
    min-height: min(37.1vw, 44.5rem);
    padding-block: 1.5rem 3.5rem;
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
    padding-block: 3.25rem 3.5rem;
    padding-inline: 0 3.5rem;

    @media (max-width: 63.9375rem) {
      padding: 0;
    }

    &-items {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
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
    top: 1.5rem;
    width: clamp(25rem, 40vw, 33.5rem);

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
