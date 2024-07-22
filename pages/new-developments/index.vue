<template>
  <div class="developments">
    <header class="developments__header">
      <div class="container">
        <h1 class="developments__title text-h2">NEW DEVELOPMENTS</h1>
        <div class="developments__search-bar">
          <SearchForm :withFilters="false" class="developments__search-form" />
          <div class="developments__filters" @click="isFiltersOpen = true">
            <Icon name="search" width="38" height="30" />
            <p class="developments__filter-title">Filters</p>
          </div>
        </div>
      </div>
    </header>
    <div class="developments__body">
      <div class="container">
        <div v-if="developments && developments.length > 0" class="developments__cards">
          <template v-for="development in developments" :key="developments.id">
            <NewDevelopmentCard class="developments__card" :property="development" />
          </template>
        </div>
        <!-- <Pagination :total="developments?.total" :page-size="pageSize" :page="currentPage" @update:page="changePage" class="developments__pagination" /> -->
      </div>
    </div>
    <Dialog :component="FiltersDialog" :open="isFiltersOpen" @close="isFiltersOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, watch, computed } from "vue"
// import { getBrokers } from "~/data/developments/api"
import { PropertyTypes } from "~/utils/types"
import { useWatcher } from "@/composables/watcher"
import FiltersDialog from "@/components/FiltersDialog.vue"

const pageTitle = computed(() => {
  const dealType = route.params.dealType
  return dealType === 'sale' ? 'developments FOR SALE' : 'developments FOR RENT'
})

const isFiltersOpen = ref(false)

const filters = ref({
  dealType: '',
  category: '',
  neighborhood: '',
  minPrice: null,
  maxPrice: null,
})

const applyQueryParams = () => {
  const query = route.query
  filters.value.dealType = query.dealType as string
  filters.value.category = query.category as string
  filters.value.neighborhood = query.neighborhood as string
  filters.value.minPrice = query.minPrice ? Number(query.minPrice) : null
  filters.value.maxPrice = query.maxPrice ? Number(query.maxPrice) : null
}

const metaData = ref<object | null>(null)
const communities = ref<string[] | null>(null)
const route = useRoute()
const pageSize = 15
const currentPage = ref(1)

const developments = computed(() => {
  return [
    {
      id: 1,
      icon: "/img/apartments/flat1.jpeg",
      price: 1000,
      beds: 7,
      baths: 7,
      area: 26204,
      title: "Apartments in DownTown",
      type: "Sale"
    },
    {
      id: 2,
      icon: "/img/apartments/flat2.jpeg",
      price: 1000,
      beds: 7,
      baths: 7,
      area: 26204,
      title: "Apartments in DownTown",
      type: "Sale"
    },
    {
      id: 3,
      icon: "/img/apartments/flat3.jpeg",
      price: 1000,
      beds: 7,
      baths: 7,
      area: 26204,
      title: "Apartments in DownTown",
      type: "Sale"
    },
    {
      id: 4,
      icon: "/img/apartments/flat4.jpeg",
      price: 1000,
      beds: 7,
      baths: 7,
      area: 26204,
      title: "Apartments in DownTown",
      type: "Sale"
    },
    {
      id: 5,
      icon: "/img/apartments/flat5.jpeg",
      price: 1000,
      beds: 7,
      baths: 7,
      area: 26204,
      title: "Apartments in DownTown",
      type: "Sale"
    },
    {
      id: 6,
      icon: "/img/apartments/flat6.jpeg",
      price: 1000,
      beds: 7,
      baths: 7,
      area: 26204,
      title: "Apartments in DownTown",
      type: "Sale"
    },
    {
      id: 7,
      icon: "/img/apartments/flat7.jpeg",
      price: 1000,
      beds: 7,
      baths: 7,
      area: 26204,
      title: "Apartments in DownTown",
      type: "Sale"
    },
    {
      id: 8,
      icon: "/img/apartments/flat8.jpeg",
      price: 1000,
      beds: 7,
      baths: 7,
      area: 26204,
      title: "Apartments in DownTown",
      type: "Sale"
    }
  ]
})

// const queryString = computed(() => {
//   const params = new URLSearchParams()
//   for (const [key, value] of Object.entries(filters.value)) {
//     if (value) params.append(key, value.toString())
//   }
//   params.append('page', currentPage.value.toString())
//   params.append('pageSize', pageSize.toString())
//   return params.toString()
// })

// const { data: developments, refresh } = useFetch(computed(() => `/api/developments/developments?${queryString.value}`))
// const { data: brokersData } = await useAsyncData('brokers', () => getBrokers())

// async function fetchMetaData() {
//   try {
//     const response = await fetch(`/api/developments/meta`)
//     const data = await response.json()
//     metaData.value = data

//     if (metaData.value) {
//       filters.value.minPrice = metaData.value.minPrice || filters.value.minPrice
//       filters.value.maxPrice = metaData.value.maxPrice || filters.value.maxPrice
//       communities.value = metaData.value.communities || []
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

// onMounted(fetchMetaData)

// const findBrokerById = (brokerId) => {
//   return brokersData.value?.find(broker => broker.brokerId === brokerId) || {}
// }

onMounted(async () => {
  applyQueryParams()
  // metaData.value = meta.value
  // if (metaData.value) {
  //   communities.value = metaData.value.communities
  // }
})

// useSeoMeta({
//   title: "developments | Horizon Vista Real Estate Agency",
//   description: "Explore a diverse range of luxury developments in Dubai, UAE with our premier real estate agency. From high-end villas to upscale apartments and commercial spaces, we offer a variety of options to suit your needs. Contact us to find your dream property in Dubai, UAE today.",
//   robots: "noimageindex",
//   keywords: "Dubai real estate, UAE developments, luxury homes Dubai, property investment Dubai, Dubai real estate agency, Dubai villas, Dubai apartments, commercial developments Dubai, luxury real estate Dubai, property for sale Dubai, residential developments Dubai.",
//   author: "Horizon Vista",
//   publisher: "Horizon Vista"
// })

watch(() => route.query, () => {
  applyQueryParams()
  // refresh()
}, { deep: true })

// watch(currentPage, () => {
//   refresh()
// })

// function changePage(newPage: number) {
//   currentPage.value = newPage
// }

// const isMobileFilterVisible = ref(false)

// useWatcher(isMobileFilterVisible)
</script>

<style lang="scss">
.developments {
  background: var(--color-quaternary);

  // &__container {
  //   max-width: 106.5rem; /* Adjust this value as needed */
  //   margin: 0 auto; /* Center the container */
  //   padding: 0 1rem; /* Add some padding for better responsiveness */
  // }

  &__search-form {
    width: max-content;
  }

  &__header {
    padding-top: clamp(1rem, 0.299rem + 2.8758vw, 3.75rem);
    padding-bottom: clamp(1.5rem, 0.9902rem + 2.0915vw, 3.5rem);
    color: var(--color-white);
    width: max-content;
  }

  &__title {
    margin-bottom: 1.75rem;

    @media (max-width: 47.9375rem) {
      margin-bottom: 1.25rem;
    }
  }

  &__filter {
    @media (max-width: 47.9375rem) {
      position: fixed;
      inset: 0;
      z-index: 100;
      padding: 0 1rem 1rem;
      overflow: auto;
      color: var(--color-white);
      background: var(--color-primary);
      transition: transform 0.4s ease-in-out;
      transform: translateY(-100%);

      &--open {
        transform: translateY(0);
      }
    }

    &-header {
      display: none;

      @media (max-width: 47.9375rem) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 6rem;
        margin-bottom: 1rem;
      }
    }

    &-logo {
      display: grid;
      place-content: center;
      width: 6rem;
      height: 6rem;

      svg {
        width: 100%;
        margin-top: 0.5rem;
      }
    }

    &-close {
      display: grid;
      gap: 0.25rem;
      place-items: center;
      font-family: var(--font-family-alt);
      font-size: 0.75rem;
      text-transform: uppercase;
    }

    &-body {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;

      @media (max-width: 63.9375rem) {
        gap: 1rem;
      }

      @media (max-width: 47.9375rem) {
        flex-direction: column;
        gap: 1rem;
        width: min(22.375rem, 100%);
        margin-inline: auto;
      }
    }
  }

  &__select {
    position: relative;
    width: 19rem;
    height: 3.5rem;
    // color: var(--color-quaternary);

    @media (max-width: 63.9375rem) {
      flex-grow: 1;
      width: 14rem;
    }

    @media (max-width: 47.9375rem) {
      width: 100%;
    }

    &-field {
      display: block;
      width: 100%;
      height: 100%;
      padding-inline: 1.5rem 3.25rem;
      font-weight: 500;
      color: inherit;
      appearance: none;
      background: none;
      border: 0.0625rem solid var(--color-quinary);

      &:focus {
        outline: none;
      }

      option {
        background: var(--color-primary);
      }
    }

    &-icon {
      position: absolute;
      inset-inline-end: 1rem;
      top: 1rem;
      color: inherit;
      pointer-events: none;
    }
  }

  &__search-bar {
    display: flex;
    flex-direction: row;
  }

  &__filters {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 1rem;
    cursor: pointer;
  }

  &__filter-title {
    font-size: 1.2rem;
  }

  &__price {
    display: flex;
    border: 0.0625rem solid var(--color-quinary);

    @media (max-width: 63.9375rem) {
      flex-grow: 1;
    }

    @media (max-width: 47.9375rem) {
      flex-direction: column;
      gap: 1rem;
      border: none;
    }

    &-field {
      display: flex;
      flex: 1;
      min-width: 0;
      max-width: 12.5rem;

      @media (max-width: 63.9375rem) {
        max-width: 100%;
      }

      @media (max-width: 47.9375rem) {
        border: 0.0625rem solid var(--color-quinary);
      }

      &:not(:first-child) {
        border-inline-start: 0.0625rem solid var(--color-quinary);
      }
    }

    &-input {
      width: 100%;
      height: 3.5rem;
      padding-inline: 1.5rem;
      color: inherit;
      background: none;
      border: none;

      &::placeholder {
        color: var(--color-quaternary);
        opacity: 1;
      }

      &::-webkit-inner-spin-button {
        display: none;
      }

      &:focus {
        outline: none;
      }
    }

    &-currency {
      align-self: center;
      padding-inline-end: 1.5rem;
      color: var(--color-quaternary);
    }
  }

  &__submit {
    display: block;

    @media (max-width: 47.9375rem) {
      display: block;
    }
  }

  &__toggle-filter {
    display: none;

    @media (max-width: 47.9375rem) {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  &__body {
    padding-top: clamp(1rem, 0.3627rem + 2.6144vw, 3.5rem);
    padding-bottom: clamp(2.5rem, 2.2451rem + 1.0458vw, 3.5rem);
    color: var(--color-primary);
    background: var(--color-tertiary);
  }

  &__pagination {
    margin-top: 2.5rem;

    @media (max-width: 47.9375rem) {
      margin-top: 2rem;
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(1rem, 0.6176rem + 1.5686vw, 2.5rem);
    color: var(--color-white);

    .property-card,
    .property-card__person {
      border-color: rgba(var(--color-primary-grb), 0.2);
    }
  }

  &__card {
    width: 100%; /* Ensure cards take full width of their grid cell */
    max-width: 84rem; /* Adjust this value as needed */
    height: auto; /* Let the height be determined by the content */

    .property-card__img {
      @media (max-width: 34rem) {
        aspect-ratio: 1 / 1.24;
      }
    }

    .property-card__data {
      @media (max-width: 34rem) {
        display: none;
      }
    }
  }
}
</style>
  