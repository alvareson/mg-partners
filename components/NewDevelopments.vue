<template>
  <section class="new-developments">
    <div class="container">
      <header class="new-developments__header">
        <h2 class="new-developments__title">New developments</h2>
        <div class="new-developments__arrows">
          <button class="new-developments__arrow" type="button" ref="prev" aria-label="Previous property">
            <Icon name="chevron-left" />
          </button>
          <div class="new-developments__number">
            {{ activeSlide }}
            <span class="new-developments__number-divider">/</span>
            {{ totalSlides }}
          </div>
          <button class="new-developments__arrow" type="button" ref="next" aria-label="Next property">
            <Icon name="chevron-right" />
          </button>
        </div>
      </header>
      <div v-if="apartments && apartments.length > 0">
        <Swiper
          class="new-developments__swiper"
          :modules="[Navigation]"
          slides-per-view="auto"
          :navigation="{
						prevEl: prev,
						nextEl: next,
						disabledClass: 'new-developments__arrow--disabled',
        	}"
          @swiper="onSwiper"
          @slide-change="onSlideChange"
        >
					<SwiperSlide class="new-developments__slide" v-for="(apartment, index) in apartments" :key="index">
            <NewDevelopmentCard class="new-developments__card" :property="apartment" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
// import { useI18n } from 'vue-i18n'

const isMobileFilterVisible = ref(false)
const pageSize = ref(10)
const currentPage = ref(1)

// const { locale } = useI18n()

const prev = ref(null)
const next = ref(null)
const activeSlide = ref(0)
const totalSlides = ref(0)

const getActiveSlideNumber = swiper => (activeSlide.value = swiper.activeIndex + 1)

const onSwiper = swiper => {
  // if (locale.value === "ar-EG") {
  //   swiper.changeLanguageDirection("rtl")
  // } else {
  //   swiper.changeLanguageDirection("ltr")
  // }
  
  getActiveSlideNumber(swiper)
  totalSlides.value = swiper.slides.length
}

const onSlideChange = swiper => getActiveSlideNumber(swiper)

const apartments = computed(() => {
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
</script>

<style lang="scss">
.new-developments {
  padding-block: clamp(5rem, 1.7255rem + 1.2288vw, 3rem);
	padding-top: 1rem;
  overflow: hidden;
  color: var(--color-white);
  background: var(--color-white);

  .container {
    position: relative;
  }

  &__header {
    display: flex;
    gap: 1rem 2rem;
    justify-content: space-between;

    @media (max-width: 75rem) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  &__title {
    margin-inline-end: 1rem;
    font-size: 2rem;
    font-weight: 500;
    color: var(--color-quaternary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
		text-align: center;
		justify-content: center;

    @media (max-width: 75rem) {
      margin: 0;
    }

    @media (max-width: 47.9375rem) {
      font-size: 0.875rem;
    }
  }

  &__caption {
    display: grid;

    &-2 {
      margin-inline-start: clamp(0rem, -36rem + 40vw, 12rem);
    }
  }

  &__arrows {
    display: flex;
    gap: 1rem;
    align-items: center;
    align-self: flex-end;
    margin-bottom: 1rem;

    @media (max-width: 75rem) {
      position: absolute;
      inset-inline: var(--padding-inline);
      bottom: 0;
      z-index: 2;
      justify-content: space-between;
      margin: 0;
    }
  }

  &__arrow {
    display: grid;
    place-content: center;
    width: 3rem;
    height: 3rem;
    border: 0.125rem solid currentColor;
    border-radius: 50%;
    opacity: 1;
		color: var(--color-quaternary);

    [dir="rtl"] & {
      transform: scaleX(-1);
    }

    &--disabled {
      color: var(--color-quaternary);
      cursor: default;
      opacity: 1;
    }
  }

  &__number {
    display: none;

    @media (max-width: 75rem) {
      display: block;
    }

    &-divider {
      margin-inline: 1rem;
    }
  }

  &__swiper {
    overflow: visible;

    @media (max-width: 75rem) {
      padding-bottom: 5.5rem;
    }
  }

  &__slide {
    max-width: 72rem;

    @media (max-width: 34rem) {
      width: 12.5rem;
    }

    &:not(:last-child) {
      margin-inline-end: 2.5rem;

      @media (max-width: 63.9375rem) {
        margin-inline-end: 2rem;
      }

      @media (max-width: 47.9375rem) {
        margin-inline-end: 1rem;
      }

      @media (max-width: 34rem) {
        margin-inline-end: 0.5rem;
      }
    }
  }

  &__card {
    width: 84rem;
    min-height: 40rem;

    @media (max-width: 34rem) {
      width: 84rem;
      height: auto;
    }

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
