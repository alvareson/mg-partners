<template>
  <section class="cabin-experience" id="cabin-experience">
    <div class="container">
      <h2 class="cabin-experience__title">Cabin Experience</h2>
      <img v-if="aircraft.svgCabinMap" class="cabin-experience__scheme" :src="aircraft.svgCabinMap" width="1063" height="273" alt="" loading="lazy" />
      <div class="cabin-experience__wrapper">
        <ul class="cabin-experience__items">
          <li class="cabin-experience__item" v-for="item in items" :key="item.title">
            <div class="cabin-experience__item-header">
              <Icon class="cabin-experience__item-icon" :name="item.icon" width="40" height="40" />
              <p class="cabin-experience__item-title">{{ item.title }}</p>
            </div>
            <p class="cabin-experience__item-description">{{ item.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toRef } from 'vue'

const props = defineProps({
  aircraft: {
    type: Object as PropType<object>,
    required: true,
    default: () => ({}),
  },
})

const aircraft = toRef(props, "aircraft")

const items = computed(() => [
  {
    icon: 'wi-fi',
    title: 'Internet',
    description: aircraft.value?.internetDescription,
  },
  {
    icon: 'phone',
    title: 'Voice',
    description: aircraft.value?.voiceDescription,
  },
  {
    icon: 'live-tv',
    title: 'Entertainment',
    description: aircraft.value?.entertainmentDescription,
  },
].filter(item => item.description && item.description.trim() !== ''))
</script>

<style lang="scss">
.cabin-experience {
  padding-block-start: clamp(2.5rem, 1.5422rem + 3.9293vw, 5rem);
  padding-block-end: clamp(2.5rem, 1.207rem + 5.3045vw, 5.875rem);
  color: var(--color-secondary);
  background: var(--color-primary);

  &__title,
  &__item-title {
    font-size: 0.75rem;
    font-weight: normal;
    line-height: 1.33;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
  }

  &__title {
    margin-bottom: 2.5rem;

    @media (max-width: 34rem) {
      display: none;
    }
  }

  &__scheme {
    width: 100%;
    max-width: 66.375rem;
    height: auto;
    margin-bottom: 5rem;

    @media (max-width: 86.5rem) {
      max-width: 100%;
    }

    @media (max-width: 34rem) {
      margin-bottom: 2.3125rem;
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    @media (max-width: 63.9375rem) {
      gap: 2.5rem;
    }
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    width: 100%;

    @media (min-width: 1385px) and (max-width: 1794px) {
      width: 80%;
    }

    @media (max-width: 63.9375rem) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 34rem) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: 34rem) {
      gap: 0.25rem;
    }

    &-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      @media (max-width: 34rem) {
        gap: 0.25rem;
      }
    }

    &-icon {
      flex-shrink: 0;

      @media (max-width: 34rem) {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    &-title {
      margin: 0;
      margin-left: 0.45rem;

      @media (max-width: 34rem) {
        font-size: 0.625rem;
        line-height: 1.6;
        letter-spacing: 0.125rem;
      }
    }

    &-description {
			font-size: 0.875rem;
			line-height: 1.71;
			color: var(--color-tertiary);
			max-width: 20rem;
			word-wrap: break-word;

			@media (max-width: 42rem) {
				font-size: 0.85rem;
				line-height: 1.33;
				max-width: 100%;
			}

      @media (min-width: 1385px) and (max-width: 1794px) {
        font-size: 0.85rem;
				line-height: 1.33;
				max-width: 20rem;
      }
		}
  }
}
</style>
