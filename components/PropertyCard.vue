<template>
  <!-- <AppLink class="property-card" :to="`/properties/${property.id}`">
    <img class="property-card__img" v-if="property.media" :src="property.media.pictures[0].file.url" alt="" />
    <div class="property-card__type" v-if="property.general?.dealType">{{ property?.general.dealType }}</div>
    <div class="property-card__inner">
      <div class="property-card__info" v-if="property.title">
        {{ property.title }}
      </div>
      <ul class="property-card__data" v-if="property.specific">
        <li class="property-card__data-item">{{ property.specific.bedrooms }} beds</li>
        <li class="property-card__data-item">{{ property.specific.bathrooms }} baths</li>
        <li class="property-card__data-item">{{ property.specific.areas.habitable }} {{ measurement }}</li>
      </ul>
      <p class="property-card__price" v-if="property.price">
        ${{ property.price }}
      </p>
    </div>
  </AppLink> -->

	<AppLink class="property-card" :to="`/properties/${property.id}`">
    <img class="property-card__img" v-if="property.icon" :src="property.icon" alt="" />
    <div class="property-card__type" v-if="property.type">{{ property?.type }}</div>
    <div class="property-card__inner">
      <div class="property-card__info" v-if="property.title">
        {{ property.title }}
      </div>
      <ul class="property-card__data">
        <li class="property-card__data-item">{{ property.beds }} beds</li>
        <li class="property-card__data-item">{{ property.baths }} baths</li>
        <li class="property-card__data-item">{{ property.area }} {{ measurement }}</li>
      </ul>
      <p class="property-card__price" v-if="property.price">
        ${{ property.price }}
      </p>
    </div>
  </AppLink>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { PropType } from "vue"
import { MeasurementUnit } from "~/utils/types"

const props = defineProps({
  property: {
    type: Object as PropType<any>,
    required: true,
  }
})

const measurement = ref<MeasurementUnit>(MeasurementUnit.SquareFeet)
</script>

<style lang="scss">
.property-card {
  --padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid var(--color-quinary);
  transition: border 0.25s;
  background-color: var(--color-quaternary);
  width: 100%;
  max-width: 45rem;
  height: 30rem;

  @media (max-width: 34rem) {
    --padding: 1.5rem;
  }

  &:hover {
    border-color: var(--color-white);
  }

  &__img {
    width: 100%;
    height: 60%;
    object-fit: cover;

    @media (max-width: 47.9375rem) {
      aspect-ratio: auto;
    }
  }

  &__type {
    position: absolute;
    inset-inline-start: var(--padding);
    top: var(--padding);
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.33;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: var(--color-white);
    border-radius: 5rem;

    @media (max-width: 34rem) {
      font-size: 0.875rem;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 1rem;
    padding: var(--padding);

    @media (max-width: 34rem) {
      gap: 0.5rem;
    }
  }

  &__price {
    margin-bottom: 0.75rem;
    opacity: 0.8;

    @media (max-width: 34rem) {
      margin-bottom: 1.25rem;
      font-size: 1.125rem;
    }
  }

  &__data {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1rem;

    &-item {
      &:not(:first-child) {
        &::before {
          margin-inline-end: 1rem;
          content: "•";
        }
      }
    }
  }

  &__info {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.5;

    @media (max-width: 34rem) {
      font-size: 1.25rem;
      line-height: 1.75;
    }
  }
}

.featured-properties__swiper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 75rem) {
    grid-template-columns: 1fr;
  }
}
</style>
