<template>
  <section class="gallery" id="gallery">
    <div class="container">
      <Swiper
        class="gallery__swiper"
        :modules="[Navigation, Pagination]"
        slides-per-view="auto"
        rewind
        :breakpoints="breakpoints"
        :navigation="{ prevEl: prev, nextEl: next }"
        :pagination="{ el: pagination, clickable: true }"
      >
        <SwiperSlide class="gallery__slide" v-for="(image, index) in images" :key="image">
          <img class="gallery__img" :src="image" alt="" loading="lazy" />
          <div class="gallery__number">{{ slideNumber(index + 1) }}</div>
        </SwiperSlide>
      </Swiper>
      <div v-if="images.length > 3" class="gallery__arrows">
        <button class="gallery__arrow" type="button" ref="prev">
          <Icon class="gallery__arrow-icon" name="arrow-left" width="58" height="6" />
        </button>
        <div class="gallery__pagination" ref="pagination"></div>
        <button class="gallery__arrow gallery__arrow--next" type="button" ref="next">
          <Icon class="gallery__arrow-icon" name="arrow-left" width="58" height="6" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toRef } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const props = defineProps({
  photos: {
    type: Array as PropType<object[]>,
    required: true,
    default: () => [],
  }
})
const photos = toRef(props, "photos")

const prev = ref(null)
const next = ref(null)
const pagination = ref(null)

const slideNumber = (number: number) => String(number).padStart(2, "0")

const breakpoints = {
  0: {
    spaceBetween: 16,
  },
  544: {
    spaceBetween: 24,
  },
  1024: {
    spaceBetween: 32,
  },
}

const images = computed(() => {
  return photos.value.map(photo => photo.url)
})
</script>

<style lang="scss">
.gallery {
  margin-bottom: 1rem;
  overflow: clip;
  scroll-margin: 2rem;

  @media (max-width: 47.9375rem) {
    margin-bottom: 3.25rem;
  }

  &__swiper {
    margin-bottom: 1rem;
    overflow: visible;

    @media (max-width: 47.9375rem) {
      margin-bottom: 0;
    }
  }

  &__slide {
    width: min(70vw, 61.5rem);
  }

  &__img {
    width: 100%;
    aspect-ratio: 1.5 / 1;
    margin-bottom: 1rem;
    object-fit: cover;

    @media (max-width: 47.9375rem) {
      margin-bottom: 0.5rem;
    }
  }

  &__number {
    font-size: 0.875rem;
    line-height: 1.71;
    text-transform: uppercase;
    letter-spacing: 0.175rem;
  }

  &__arrows {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    max-width: 66.5rem;

    @media (max-width: 86.5rem) {
      max-width: 100%;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    height: 2.875rem;
    margin-inline: 0.4375rem;
    color: var(--color-secondary);
    transition: color 0.25s;

    @media (max-width: 47.9375rem) {
      margin: 0;
    }

    &--next {
      transform: rotate(180deg);
    }

    &::before {
      --border-opacity: 0.2;
      width: 2rem;
      height: 2rem;
      content: "";
      border: 0.0625rem solid rgba(var(--color-secondary-rgb), var(--border-opacity));
      transition: border 0.25s;
      transform: rotate(45deg);

      @media (max-width: 47.9375rem) {
        display: none;
      }
    }

    &:hover {
      color: var(--color-primary);

      &::before {
        --border-opacity: 0.6;
      }
    }

    &-icon {
      margin-left: -1.25rem;

      @media (max-width: 47.9375rem) {
        margin: 0;
      }
    }
  }

  &__pagination {
    display: flex;
    align-items: center;
    height: 1.5rem;

    &.swiper-pagination-bullets {
      width: auto;
    }

    .swiper-pagination-bullet {
      --swiper-pagination-bullet-size: 0.25rem;
      --swiper-pagination-bullet-horizontal-gap: 0.8125rem;
      --swiper-pagination-bullet-inactive-opacity: 1;
      --swiper-pagination-bullet-inactive-color: var(--color-secondary);
      --swiper-pagination-color: var(--color-secondary);
      position: relative;
      border-radius: 0;
      transform: rotate(45deg);

      &::after {
        position: absolute;
        inset: -0.375rem;
        content: "";
        border: 0.0625rem solid transparent;
      }

      &-active {
        &::after {
          border-color: var(--color-secondary);
        }
      }
    }
  }
}
</style>
