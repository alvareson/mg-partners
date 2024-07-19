<template>
  <section class="aircrafts">
    <div class="container">
      <p class="aircrafts__caption">Select by criteria</p>
      <h2 class="aircrafts__title text-h1">Your Home in the Sky</h2>
      <button class="aircrafts__filters-btn" type="button" @click="openMobileFilters">Filters</button>
      <div class="aircrafts__wrapper">
        <div class="aircrafts__filters" :class="{ 'aircrafts__filters--visible': isMobileFiltersVisible }">
          <header class="aircrafts__filters-header">
            <p class="aircrafts__caption">Select by criteria</p>
            <button type="button" @click="closeMobileFilters">
              <Icon name="close" width="32" height="32" />
            </button>
          </header>
          <template v-for="category in categories" :key="category.title">
            <CabinClass
              :category="category"
              :isSelected="category.id === chosenCategoryId"
              @filterByCategoryId="handleFilterAndSort"
            />
          </template>
        </div>
        <div class="aircrafts__main">
          <div class="aircrafts__panel">
            <p class="aircrafts__found">{{ totalItems }} options found</p>
            <div v-if="aircrafts && totalItems > 5" class="pagination">
              <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
              <span>{{ currentPage }} / {{ totalPages || 1 }}</span>
              <button @click="nextPage" :disabled="isNextDisabled">Next</button>
            </div>
            <div v-if="false && aircrafts && totalItems > 5" class="aircrafts__sort">
              <span class="aircrafts__sort-label">Sort by:</span>
              <div class="aircrafts__select">
                <select class="aircrafts__select-field" @change="handleFilterAndSort(null, $event)">
                  <option value="price">Price ↑</option>
                  <option value="-price">Price ↓</option>
                </select>
                <Icon class="aircrafts__select-arrow" name="chevron-down" />
              </div>
            </div>
          </div>
          <template v-for="aircraft in aircrafts" :key="aircraft.name">
            <AircraftItem :aircraft="aircraft" />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toRefs } from "vue"
const isMobileFiltersVisible = ref(false)

const openMobileFilters = () => {
  document.documentElement.classList.add("overflow")
  isMobileFiltersVisible.value = true
}

const closeMobileFilters = () => {
  document.documentElement.classList.remove("overflow")
  isMobileFiltersVisible.value = false
}

const props = defineProps({
  aircrafts: {
    type: Object as PropType<object>,
    required: true,
    default: () => [],
  },
  categories: {
    type: Array as PropType<object[]>,
    required: true,
    default: () => [],
  },
  totalItems: {
    type: Number,
    required: true,
  },
  chosenCategoryId: {
    type: Number,
    required: true,
  }
})

const emits = defineEmits(['filterAndSortAircrafts'])
const { aircrafts, categories, totalItems } = toRefs(props)

const selectedCategoryId = ref<string | null>(null)
const sortCriteria = ref("price")
const currentPage = ref(1)
const itemsPerPage = 5

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))
const isNextDisabled = computed(() => currentPage.value * itemsPerPage >= totalItems.value)

const handleFilterAndSort = (categoryId: string | null = selectedCategoryId.value, event: Event | null = null) => {
  if (categoryId !== null) {
    selectedCategoryId.value = selectedCategoryId.value === categoryId ? null : categoryId
    currentPage.value = 1
  }
  if (event) {
    const target = event.target as HTMLSelectElement
    sortCriteria.value = target.value
  }
  if (document.documentElement.classList.contains("overflow")) closeMobileFilters()
  emits('filterAndSortAircrafts', { categoryId: selectedCategoryId.value, sort: sortCriteria.value, page: currentPage.value })
}

const nextPage = () => {
  currentPage.value++
  emits('filterAndSortAircrafts', { categoryId: selectedCategoryId.value, sort: sortCriteria.value, page: currentPage.value })
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emits('filterAndSortAircrafts', { categoryId: selectedCategoryId.value, sort: sortCriteria.value, page: currentPage.value })
  }
}
</script>

<style lang="scss">
.aircrafts {
  position: relative;
  padding-block: clamp(2.5rem, 1.478rem + 4.1929vw, 5rem);

  &__caption {
    margin-bottom: 1rem;
    font-size: 0.75rem;
    line-height: 1.33;
    color: var(--color-secondary);
    text-transform: uppercase;
    letter-spacing: 0.15rem;

    @media (max-width: 47.9375rem) {
      display: none;
    }
  }

  &__title {
    margin-bottom: clamp(1rem, 0.4253rem + 2.3576vw, 2.5rem);

    @media (max-width: 47.9375rem) {
      line-height: 1.5;
    }
  }

  &__filters-btn {
    display: none;
    width: 100%;
    margin-bottom: 1.75rem;
    padding: 0.6875rem;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.6;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.125rem;
    border: 0.0625rem solid var(--color-secondary);

    @media (max-width: 47.9375rem) {
      display: block;
    }

    @media (max-width: 34rem) {
      font-size: 0.625rem;
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(1.5rem, 3%, 3rem);
    align-items: flex-start;
  }

  &__filters {
    display: grid;
    gap: 1rem;
    width: clamp(16.5rem, 25.6%, 21.5rem);
    overflow: auto;

    @media (max-width: 47.9375rem) {
      position: fixed;
      inset: 0;
      z-index: 10;
      place-content: flex-start;
      width: auto;
      padding: 1.5rem;
      background: var(--color-tertiary);
      transition: transform 0.3s ease-in-out;
      transform: translateX(100%);

      &--visible {
        transform: translateX(0);
      }
    }

    &-header {
      display: none;

      @media (max-width: 47.9375rem) {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .aircrafts__caption {
          display: block;
          margin: 0;
        }
      }
    }
  }

  &__main {
    flex: 1;
  }

  &__panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.375rem;
    font-size: 0.75rem;
    line-height: 1.33;
    color: var(--color-secondary);
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    border-bottom: 0.0625rem solid rgba(var(--color-secondary-rgb), 0.3);

    @media (max-width: 34rem) {
      padding-bottom: 1.5rem;
      font-size: 0.625rem;
      line-height: 1.6;
      letter-spacing: 0.125rem;
      border: none;
    }
  }

  &__sort {
    display: flex;
    gap: 0.375rem;

    &-label {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  &__select {
    position: relative;

    &-field {
      padding-right: 1.5625rem;
      font: inherit;
      color: var(--color-primary);
      text-transform: uppercase;
      letter-spacing: inherit;
      appearance: none;
      background: none;
      border: none;

      &:focus {
        outline: 0.0625rem solid var(--color-secondary);
        outline-offset: 0.0625rem;
      }
    }

    &-arrow {
      position: absolute;
      top: -0.3125rem;
      right: 0;
      color: var(--color-primary);
      pointer-events: none;

      @media (max-width: 34rem) {
        top: -0.25rem;
      }
    }
  }

  &__items {
    @media (max-width: 34rem) {
      display: grid;
      gap: 1rem;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pagination button {
    margin: 0 10px;
  }
}
</style>
