<template>
  <div class="aircraft-item">
    <div v-if="!aircraft.sold" class="aircraft-item__image">
      <AppLink :to="fullPath">
        <img class="aircraft-item__img" :srcset="`${aircraft.mainImage}`" alt="" loading="lazy" />
      </AppLink>
    </div>
    <div v-else class="aircraft-item__image">
      <img class="aircraft-item__img" :srcset="`${aircraft.mainImage}`" alt="" loading="lazy" />
    </div>
    <div class="aircraft-item__data">
      <div v-if="!aircraft.sold">
        <AppLink class="aircraft-item__title" :to="fullPath">{{ aircraft.name }}</AppLink>
      </div>
      <div v-else>
        <span class="aircraft-item__title">{{ aircraft.name }}</span>
      </div>
      <p class="aircraft-item__year">{{ aircraft.manufactured }}</p>
      <table class="aircraft-item__table">
        <tr class="aircraft-item__row">
          <th>Cabin Class:</th>
          <td>{{ aircraft.category || 'N/A' }}</td>
        </tr>
        <tr class="aircraft-item__row">
          <th>Range:</th>
          <td>{{ rangeInNMs }}</td>
        </tr>
        <tr class="aircraft-item__row">
          <th>Passengers:</th>
          <td>{{ aircraft.passengers || 'N/A' }}</td>
        </tr>
        <tr v-if="aircraft.sold" class="aircraft-item__row">
          <th class="aircraft-item__sold-text">SOLD</th>
        </tr>
      </table>
    </div>
    <div class="aircraft-item__price text-h3">{{ formattedPrice }}</div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue"
import { formatPrice } from "~/utils/formatters"
const { locale } = useI18n()

const props = defineProps({
  aircraft: {
    type: Object as PropType<object>,
    required: true,
    default: () => ({}),
  },
})
const aircraft = toRef(props, "aircraft")

const rangeInNMs = computed(() => {
  return aircraft.value.range ? `${aircraft.value.range} NM` : 'N/A'
})

const formattedPrice = computed(() => {
  return aircraft.value.price ? formatPrice(aircraft.value.price) : ''
})
const fullPath = computed(() => `/${locale.value}/aircrafts/${aircraft.value.slug}`)
</script>

<style lang="scss">
.aircraft-item {
  display: flex;
  gap: clamp(1rem, 3.5%, 2rem);
  align-items: center;
  padding-block: 1.875rem;
  padding-right: clamp(0rem, -24.0741rem + 29.6296vw, 2rem);
  border-bottom: 0.0625rem solid rgba(var(--color-secondary-rgb), 0.3);

  @media (max-width: 63.9375rem) {
    flex-wrap: wrap;
  }

  @media (max-width: 34rem) {
    display: block;
    padding-block: 1.5rem 1.1875rem;
    border: 0.0625rem solid rgba(var(--color-secondary-rgb), 0.3);
  }

  &__image {
    width: 34.2%;
    margin-right: 3.5%;

    @media (max-width: 63.9375rem) {
      width: 100%;
      margin: 0;
    }
  }

  &__img {
    margin-inline: auto;

    @media (max-width: 34rem) {
      width: auto;
      height: 4rem;
      margin-bottom: 1rem;
    }
  }

  &__data {
    flex: 1 0 12.5rem;
    font-size: 0.875rem;
    line-height: 1.71;
  }

  &__title {
    display: block;
    width: fit-content;
    margin-bottom: 0.25rem;
    letter-spacing: 0.175rem;

    @media (max-width: 34rem) {
      margin-inline: auto;
    }
  }

  &__year {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    line-height: 1.33;
    color: var(--color-secondary);
    letter-spacing: 0.15rem;

    @media (max-width: 34rem) {
      margin-bottom: 1.5rem;
      padding-bottom: 1.375rem;
      text-align: center;
      border-bottom: 0.0625rem solid rgba(var(--color-secondary-rgb), 0.3);
    }
  }

  &__table {
    @media (max-width: 34rem) {
      width: 100%;
    }
  }

  &__row {
    display: flex;
    gap: 0.25rem;

    @media (max-width: 34rem) {
      padding: 0.25rem 1.5rem;
    }
  }

  &__th {
    @media (max-width: 34rem) {
      flex-basis: 57%;
      padding-top: 0.1875rem;
      font-size: 0.75rem;
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.15rem;
    }
  }

  &__price {
    flex-shrink: 0;

    @media (max-width: 34rem) {
      display: flex;
      gap: 0.25rem;
      padding: 0.25rem 1.5rem;
      font-family: var(--font-family);
      font-size: 0.875rem;
      line-height: 1.71;
    }

    &-label {
      display: none;

      @media (max-width: 34rem) {
        display: block;
        flex-basis: 57%;
        padding-top: 0.1875rem;
        font-size: 0.75rem;
        color: var(--color-secondary);
        text-transform: uppercase;
        letter-spacing: 0.15rem;
      }
    }
  }
  &__sold-text {
    color: var(--color-primary);
    font-weight: 600;
  }
}
</style>
