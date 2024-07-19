<template>
  <section class="highlights" id="highlights">
    <div class="container">
      <h2 class="highlights__title">Highlights</h2>
      <Swiper class="highlights__swiper" :modules="[Navigation]" rewind :breakpoints="breakpoints" :navigation="{ prevEl: prev, nextEl: next }">
        <SwiperSlide class="highlights__item" v-for="item in items" :key="item.title">
          <img class="highlights__item-img" :src="item.img" :srcset="`${item.img2x} 2x`" width="184" height="152" alt="" />
          <p class="highlights__item-title text-h4">{{ item.title }}</p>
          <p class="highlights__item-description">{{ item.description }}</p>
        </SwiperSlide>
      </Swiper>
      <div class="highlights__arrows">
        <button class="highlights__arrow" type="button" ref="prev">
          <Icon class="highlights__arrow-icon" name="arrow-left" width="58" height="6" />
        </button>
        <button class="highlights__arrow highlights__arrow--next" type="button" ref="next">
          <Icon class="highlights__arrow-icon" name="arrow-left" width="58" height="6" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toRef, computed } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/css"
import { numberFormatter } from '~/utils/formatters'

const props = defineProps({
  aircraft: {
    type: Object as PropType<object>,
    required: true,
    default: () => ({}),
  },
})

const aircraft = toRef(props, "aircraft")
const prev = ref(null)
const next = ref(null)

const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  640: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
  },
}

const items = computed(() => [
  {
    title: "Range",
    description: aircraft.value?.range ? `${numberFormatter(aircraft.value.range)} NM / ${numberFormatter(Number((aircraft.value.range * 1.852).toFixed(0)))} km` : null,
    img: "/img/highlight-1.webp",
    img2x: "/img/highlight-1@2x.webp",
  },
  {
    title: "Capacity",
    description: aircraft.value?.passengers ? `Up to ${aircraft.value.passengers} passengers` : null,
    img: "/img/highlight-2.webp",
    img2x: "/img/highlight-2@2x.webp",
  },
  {
    title: "Speed",
    description: aircraft.value?.speed ? `Mach ${(aircraft.value.speed / 1235).toFixed(2)} / ${aircraft.value.speed} km/h` : null,
    img: "/img/highlight-3.webp",
    img2x: "/img/highlight-3@2x.webp",
  }
].filter(item => item.description))
</script>

<style lang="scss">
.highlights {
  position: relative;
  padding-block: 5rem 7.5rem;

  @media (max-width: 47.9375rem) {
    padding-block: 0 4rem;
  }

  &__title {
    margin-bottom: 4.5rem;
    font-size: 0.75rem;
    font-weight: normal;
    line-height: 1.33;
    color: var(--color-secondary);
    text-transform: uppercase;
    letter-spacing: 0.15rem;

    @media (max-width: 47.9375rem) {
      display: none;
    }
  }

  &__swiper {
    .swiper-wrapper {
      gap: 5.5rem;

      @media (max-width: 86.5rem) {
        gap: 0;
      }
    }
  }

  &__item {
    display: grid;
    flex-basis: 18.5rem;
    place-content: center;
    text-align: center;

    @media (max-width: 86.5rem) {
      flex-basis: auto;
    }

    &-img {
      margin-bottom: 1.5rem;

      @media (max-width: 47.9375rem) {
        margin-bottom: 1rem;
      }
    }

    &-title {
      margin-bottom: 0.5rem;

      @media (max-width: 47.9375rem) {
        margin-bottom: 0.25rem;
      }
    }

    &-description {
      @media (max-width: 47.9375rem) {
        font-size: 0.875rem;
        line-height: 1.71;
      }
    }
  }

  &__arrows {
    display: none;

    @media (max-width: 47.9375rem) {
      position: absolute;
      top: 3.5rem;
      right: 1.5rem;
      left: 1.5rem;
      display: flex;
      justify-content: space-between;
    }
  }

  &__arrow {
    z-index: 1;
    padding-block: 1rem;
    color: var(--color-secondary);

    &:hover {
      color: var(--color-primary);
    }

    &--next {
      transform: rotate(180deg);
    }
  }
}
</style>
