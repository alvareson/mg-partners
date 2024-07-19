<template>
  <section class="aircraft-hero">
    <div class="container">
      <div class="aircraft-hero__main">
        <h1 class="aircraft-hero__title">
          <span class="aircraft-hero__title-1">{{ aircraft.name }}</span>
        </h1>
        <img class="aircraft-hero__img" :srcset="`${aircraft.mainImage}`" alt="" />
      </div>
      <ul class="aircraft-hero__menu">
        <li class="aircraft-hero__menu-item">
          <AppLink class="aircraft-hero__menu-link" to="#gallery">
            <img class="aircraft-hero__menu-img" src="/img/gallery.webp" width="114" height="114" alt="" />
            Gallery
          </AppLink>
        </li>
        <li class="aircraft-hero__menu-item" v-if="aircraft.videoLink">
          <a class="aircraft-hero__menu-link" :href="aircraft.videoLink" target="_blank">
            <div class="aircraft-hero__menu-icon">
              <Icon class="aircraft-hero__menu-svg" name="play" width="32" height="32" />
            </div>
            Video
          </a>
        </li>
        <li class="aircraft-hero__menu-item" v-if="aircraft.brochure">
          <a class="aircraft-hero__menu-link" @click="downloadBrochure">
            <div class="aircraft-hero__menu-icon">
              <Icon class="aircraft-hero__menu-svg" name="download" width="32" height="32" />
            </div>
            Brochure
          </a>
        </li>
        <li class="aircraft-hero__menu-item" v-if="aircraft.virtualTourLink">
          <a class="aircraft-hero__menu-link" :href="aircraft.virtualTourLink" target="_blank">
            <div class="aircraft-hero__menu-icon">
              <Icon class="aircraft-hero__menu-svg" name="box" width="32" height="32" />
            </div>
            Virtual tour
          </a>
        </li>
      </ul>
      <table class="aircraft-hero__data">
        <tr class="aircraft-hero__row" v-for="item in data" :key="item.label">
          <th class="aircraft-hero__label">{{ item.label }}</th>
          <td class="aircraft-hero__value text-h3">{{ item.value }}</td>
        </tr>
      </table>
    </div>
    <div class="aircraft-hero__offer">
      <p class="aircraft-hero__price text-h3">{{ formatPrice(aircraft.price) }}</p>
      <button class="aircraft-hero__btn" type="button" @click="isMakeOfferOpen = true">
        <span class="aircraft-hero__btn-icon">
          <Icon class="aircraft-hero__btn-arrow" name="arrow-right" width="58" height="6" />
        </span>
        Make an offer
      </button>
      <Dialog :component="MakeOfferDialog" :aircraft="aircraft" :open="isMakeOfferOpen" @close="isMakeOfferOpen = false" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/formatters'
import MakeOfferDialog from "@/components/MakeOfferDialog.vue"

const props = defineProps({
  aircraft: {
    type: Object as PropType<object>,
    required: true,
    default: () => ({}),
  },
})

const isMakeOfferOpen = ref(false)
const aircraft = toRef(props, "aircraft")

const data = computed(() => [
  { label: "Cabin Class", value: aircraft.value.category || "N/A" },
  { label: "Max width (in)", value: aircraft.value.maxWidth || "N/A" },
  { label: "Max height (in)", value: aircraft.value.maxHeight || "N/A" },
  { label: "Balance field length (ft)", value: aircraft.value.balanceFieldLength || "N/A" },
  { label: "Normal cruise speed (tas)", value: aircraft.value.normalCruiseSpeed || "N/A" },
  { label: "Service ceiling (ft)", value: aircraft.value.serviceCeiling || "N/A" },
])

const downloadBrochure = async () => {
  try {
    const response = await fetch(aircraft.value.brochure)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${aircraft.value.name} - Brochure.pdf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss">
.aircraft-hero {
  padding-block: 1rem 5rem;
  overflow-x: clip;
  border-bottom: 0.0625rem solid rgba(var(--color-secondary-rgb), 0.3);

  @media (max-width: 63.9375rem) {
    padding-bottom: 4rem;
  }

  @media (max-width: 47.9375rem) {
    border: none;
  }

  .container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background: url("/img/clouds.webp") no-repeat calc(50% + 1.125rem) 53% / 89.3% auto;

    @media (min-resolution: 144dpi), (min-resolution: 1.5dppx) {
      background-image: url("/img/clouds@2x.webp");
    }

    @media (max-width: 88rem) {
      background-position: calc(50% + 1.125rem) 30%;
    }

    @media (max-width: 47.9375rem) {
      display: block;
      background: none;
    }
  }

  &__main {
    position: relative;
    padding-top: 3.75rem;

    @media (max-width: 47.9375rem) {
      margin-bottom: 3.375rem;
      padding: 0;

      &::after {
        position: absolute;
        inset: 0 -4rem -2.5rem -5rem;
        z-index: -1;
        content: "";
        background: url("/img/clouds.webp") no-repeat 50% 100% / 100% auto;
      }
    }
  }

  &__title {
    display: grid;
    place-items: center;
    margin-bottom: 6rem;
    font-weight: normal;
    text-align: center;

    @media (max-width: 47.9375rem) {
      margin-bottom: 2.25rem;
    }

    &-1 {
      font-family: var(--font-family-alt);
      font-size: clamp(2.5rem, 0.1rem + 5vw, 4.5rem);
      line-height: 1.34;
      color: transparent;
      background-image: url("/img/aircraft-title-bg.webp");
      background-position: 50%;
      background-clip: text;
      background-size: cover;
    }

    &-2 {
      font-size: 0.875rem;
      line-height: 1.71;
      color: var(--color-secondary);
      text-transform: uppercase;
      letter-spacing: 0.175rem;

      @media (max-width: 47.9375rem) {
        margin-top: 0.25rem;
        font-size: 0.75rem;
        line-height: 1.33;
        letter-spacing: 0.15rem;
      }
    }
  }

  &__img {
    width: 92%;
    margin-inline: auto;

    @media (max-width: 47.9375rem) {
      width: 100%;
    }
  }

  &__data {
    display: grid;
    flex-shrink: 0;
    gap: 2rem;
    order: -1;

    @media (max-width: 47.9375rem) {
      display: block;
      column-gap: 1.5rem;
      margin-bottom: 1.625rem;
      margin-left: -3.5rem;
      padding-block: 1.5rem 0.125rem;
      border: 0 solid rgba(var(--color-secondary-rgb), 0.3);
      border-width: 0.0625rem 0;
      columns: 2;
    }
  }

  &__row {
    display: grid;
    gap: 0.5rem;
    break-inside: avoid;

    @media (max-width: 47.9375rem) {
      gap: 0.25rem;
      margin-bottom: 1.25rem;

      &:nth-child(-n + 3) {
        padding-left: 3.5rem;
      }
    }
  }

  &__label {
    font-size: 0.75rem;
    line-height: 1.33;
    color: var(--color-secondary);
    text-transform: uppercase;
    letter-spacing: 0.15rem;

    @media (max-width: 47.9375rem) {
      font-size: 0.625rem;
      line-height: 1.6;
      letter-spacing: 0.125rem;
    }
  }

  &__value {
    @media (max-width: 47.9375rem) {
      font-size: 1.125rem;
    }
  }

  &__menu {
    display: grid;
    flex-shrink: 0;
    gap: 2.6875rem;
    padding-top: 2.75rem;
    padding-right: 1.5rem;
    font-size: 0.75rem;
    line-height: 1.33;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.15rem;

    @media (max-width: 47.9375rem) {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem 1.75rem;
      align-items: center;
      justify-content: center;
      padding: 0 0 1.5rem;
      font-size: 0.625rem;
      letter-spacing: 0.125rem;
    }

    &-item {
      @media (max-width: 47.9375rem) {
        &:first-child {
          flex-basis: 100%;
        }
      }
    }

    &-link {
      display: block;
      padding-top: 0.5rem;
      text-decoration: underline var(--color-secondary);
      text-underline-offset: 0.375rem;
      cursor: pointer;

      @media (max-width: 47.9375rem) {
        display: flex;
        gap: 0.25rem;
        align-items: center;
        justify-content: center;
        padding: 0;
        text-underline-offset: 0.25rem;
      }

      &:hover {
        text-decoration-color: var(--color-primary);
      }
    }

    &-img {
      width: 3.5625rem;
      margin: 0 auto 1.0625rem;

      @media (max-width: 47.9375rem) {
        width: 1.5rem;
        margin: 0;
        margin-right: 0.5rem;
      }
    }

    &-icon {
      display: grid;
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 auto 1.625rem;

      @media (max-width: 47.9375rem) {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0;
      }

      &::before {
        grid-area: 1 / -1;
        content: "";
        border: 0.0625rem solid var(--color-secondary);
        transform: rotate(45deg);

        @media (max-width: 47.9375rem) {
          display: none;
        }
      }
    }

    &-svg {
      grid-area: 1 / -1;
      place-self: center;
      color: var(--color-secondary);

      @media (max-width: 47.9375rem) {
        width: 100%;
        height: 100%;
      }
    }
  }

  &__offer {
    display: none;

    @media (max-width: 86.5rem) {
      display: flex;
      gap: 1rem 2.875rem;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 86.5rem) {
      flex-wrap: wrap;
    }
  }

  &__price {
    flex-shrink: 0;
  }

  &__btn {
    display: flex;
    gap: 0.625rem;
    align-items: center;
    padding-block: 0.375rem;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.33;
    text-transform: uppercase;
    letter-spacing: 0.15rem;

    &-icon {
      display: grid;
      place-items: center;

      &::before {
        grid-area: 1 / -1;
        width: 2rem;
        height: 2rem;
        content: "";
        border: 0.0625rem solid var(--color-primary);
        opacity: 0.2;
        transition: 0.3s;
        transition-property: transform, opacity;
        transform: rotate(45deg);

        .aircraft-aside__btn:hover & {
          opacity: 0;
          transform: rotate(135deg);
        }
      }
    }

    &-arrow {
      grid-area: 1 / -1;
      transition: transform 0.3s;
      transform: translateX(-1.625rem);

      .aircraft-aside__btn:hover & {
        transform: translateX(-0.5rem);
      }
    }
  }
}
</style>
