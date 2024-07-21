<template>
  <form v-if="metaData" class="search-form">
    <div class="search-form__inner" :class="{ 'search-form__inner--open': isMobileSearchVisible }">
      <header class="search-form__header" v-if="isMobileSearchVisible">
        <button class="search-form__close" type="button" @click="isMobileSearchVisible = false">
          <Icon name="close" />
        </button>
      </header>

      <div class="search-form__body">
        <div class="search-form__input">
          <Icon class="search-form__icon" name="search" />
          <input
            type="text"
            class="search-form__input-field"
            placeholder="Search for properties"
            v-model="neighborhood"
          />
        </div>
        <!-- <button type="button" class="search-form__filter-btn" @click="onToggleFilters">
          Filters
        </button> -->
        <button v-if="withFilters" type="button" class="search-form__filter-btn" @click="isFiltersOpen = true">
          Filters
        </button>
        <button type="button" class="search-form__search-btn" @click="onSearch">
          Search
        </button>
      </div>
    </div>
    <button class="search-form__toggle" type="button" @click="isMobileSearchVisible = true">
      {{ location }}
      <Icon name="search" />
    </button>
  </form>
  <Dialog :component="FiltersDialog" :open="isFiltersOpen" @close="isFiltersOpen = false" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import ContactUsDialog from "@/components/ContactUsDialog.vue"
import FiltersDialog from "@/components/FiltersDialog.vue"
import { useRouter } from 'vue-router'
import { vOnClickOutside } from "@vueuse/components"
import { useWatcher } from "@/composables/watcher"

const props = defineProps({
  withFilters: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()
const isMobileSearchVisible = ref(false)
const isPriceRangeVisible = ref(false)
const priceBtnRef = ref()
// const locale = useI18n().locale

const priceValue = ref([0, 1_000_000])
const dealType = ref('')
const neighborhood = ref('')
const communities = ref<string[]>([])
const minPrice = ref(0)
const maxPrice = ref(1_000_000)

const isFiltersOpen = ref(false)

const onToggleFilters = (event) => {
  event.stopPropagation()
  isFiltersOpen.value = !isFiltersOpen.value
}

const onCloseFilters = () => {
  isFiltersOpen.value = false
}

// const { t } = useI18n()

// const anyType = computed(() => t("home.anyType"))
// const rentType = computed(() => t("home.rentType"))
// const saleType = computed(() => t("home.saleType"))
// const mainTitle = computed(() => t("home.mainTitle"))
// const anyPrice = computed(() => t("home.anyPrice"))
// const search = computed(() => t("home.search"))
const location = computed(() => "location")
const metaData: Ref<MetaData | null> = ref(null)

useWatcher(isMobileSearchVisible)

type MetaData = {
  minPrice: number
  maxPrice: number
  communities: string[]
}

async function fetchMetaData() {
  // const response = await fetch(`/api/properties/meta`)
  // const data = await response.json()
  // metaData.value = data as MetaData
	metaData.value = {
		minPrice: 0,
    maxPrice: 1_000_000,
    communities: [],
	}

  if (metaData.value) {
    minPrice.value = metaData.value.minPrice
    maxPrice.value = metaData.value.maxPrice
    communities.value = metaData.value.communities
    priceValue.value = [metaData.value.minPrice, metaData.value.maxPrice]
  }
}

onMounted(fetchMetaData)

const onClickOutsideHandler = [
  () => {
    isPriceRangeVisible.value = false
  },
  { ignore: [priceBtnRef] },
]

const onSearch = () => {
  const query = {
    dealType: dealType.value,
    neighborhood: neighborhood.value,
    minPrice: priceValue.value[0],
    maxPrice: priceValue.value[1],
  }
  router.push({
    path: `/${locale.value}/properties`,
    query: query
  })
}
</script>

<style lang="scss">
.search-form {
  &__inner {
    display: flex;
    align-items: center;
    background: #e5edf4;
    border-radius: 2rem;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 6rem;
    margin-bottom: 1rem;
  }

  &__body {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__input {
    width: 32rem;
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
  }

  &__icon {
    margin-right: 0.5rem;
    color: #c4c4c4;
  }

  &__input-field {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #c4c4c4;
    background: transparent;
    padding: 0 0.5rem;
  }

  &__filter-btn,
  &__search-btn {
    color: #002f5e;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  &__toggle {
    display: none;
    align-items: center;
    justify-content: space-between;
    width: min(22.375rem, 100%);
    height: 3rem;
    margin-inline: auto;
    padding-inline: 1rem;
    color: var(--color-quaternary);
    background: var(--color-white);

    @media (max-width: 47.9375rem) {
      display: flex;
    }
  }
}
</style>
