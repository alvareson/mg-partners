<template>
  <aside class="aircraft-aside">
    <img class="aircraft-aside__img" :srcset="`${aircraft.mainImage}`" alt="" />
    <p class="aircraft-aside__title">{{ aircraft.manufactured }} {{ aircraft.name }}</p>
    <ul class="aircraft-aside__menu">
      <li class="aircraft-aside__menu-item" v-for="item in menu" :key="item.id">
        <a class="aircraft-aside__menu-link" :href="`#${item.id}`">{{ item.name }}</a>
      </li>
    </ul>
    <p class="aircraft-aside__price text-h4">{{ formatPrice(aircraft.price) }}</p>
    <button class="aircraft-aside__btn" type="button" @click="isMakeOfferOpen = true">
      <span class="aircraft-aside__btn-icon">
        <Icon class="aircraft-aside__btn-arrow" name="arrow-right" width="58" height="6" />
      </span>
      Make an offer
    </button>
    <Dialog :component="MakeOfferDialog" :aircraft="aircraft" :open="isMakeOfferOpen" @close="isMakeOfferOpen = false" />
  </aside>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/formatters'
import MakeOfferDialog from "@/components/MakeOfferDialog.vue"

const isMakeOfferOpen = ref(false)
const props = defineProps({
  aircraft: {
    type: Object as PropType<object>,
    required: true,
    default: () => ({}),
  },
})
const aircraft = toRef(props, "aircraft")
const menu = [
  { name: "Highlights", id: "highlights" },
  { name: "Gallery", id: "gallery" },
  { name: "Cabin experience", id: "cabin-experience" },
  { name: "The reach", id: "the-reach" },
  { name: "Airframe & engines", id: "airframe" },
]
</script>

<style lang="scss">
.aircraft-aside {
  text-align: center;

  &__img {
    max-width: 9.5625rem;
    margin-inline: auto;
    margin-bottom: 1.5rem;
  }

  &__title {
    margin-bottom: 4.25rem;
    font-size: 0.875rem;
    line-height: 1.71;
    text-transform: uppercase;
    letter-spacing: 0.175rem;
  }

  &__menu {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 5.75rem;
    font-size: 0.75rem;
    line-height: 1.33;
    text-transform: uppercase;
    letter-spacing: 0.15rem;

    &-link {
      color: var(--color-secondary);

      &:hover {
        color: var(--color-primary);
      }
    }
  }

  &__price {
    margin-bottom: 1rem;
  }

  &__btn {
    display: flex;
    gap: 0.625rem;
    align-items: center;
    margin-left: auto;
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
