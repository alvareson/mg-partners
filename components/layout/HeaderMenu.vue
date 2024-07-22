<template>
  <div ref="menuRef" class="header-menu" :class="{ 'header-menu--open': open }">
    <div class="header-container">
      <button class="header-menu__close" type="button" @click="$emit('close-menu')">
        <Icon :width="70" :height="70" class="header-menu__close-icon" name="close" />
      </button>
      <div class="header-menu__logo-wrapper">
        <AppLink :to="{ path: '/' }">
          <svg class="header-menu__logo" width="140" height="140">
            <use xlink:href="/img/mgpartners.svg#mgpartners-logo" />
          </svg>
        </AppLink>
      </div>
      <div class="header-menu__contact-wrapper">
        <button class="header-menu__contact" type="button" @click="isContactUsOpen = true">
          <span class="header-menu__contact-icon">
            <Icon class="header-menu__contact-arrow" name="arrow-right" width="58" height="6" />
          </span>
          <p class="header-menu__contact-title">Contact us</p>
        </button>
      </div>
    </div>
    <div class="header-menu__wrapper">
      <nav class="header-menu__nav">
        <ul class="header-menu__list">
          <li class="header-menu__item" v-for="item in menu" :key="item.name">
            <AppLink :to="item.to" class="header-menu__link" @click="$emit('close-menu')">
              {{ displayTitle(item.name) }}
            </AppLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, toRef } from 'vue'
import { useWatcher } from "@/composables/watcher"

const props = defineProps({
  menu: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close-menu'])

const open = toRef(props, "open")
const menuRef = ref(null)

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    emit('close-menu')
  }
}

const displayTitle = (title) => {
  return title
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

useWatcher(open)
</script>

<style lang="scss">
.header-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow: auto;
  color: var(--color-white);
  background: var(--color-white);
  transition: transform 0.4s ease-in-out;
  transform: translateY(-100%);
  height: max-content;

  .header-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: space-between;
    padding-block: 0.75rem;
    padding-bottom: 0rem;

    @media (max-width: 56rem) {
      padding-block: 0;
    }
  }

  &--open {
    transform: translateY(0);
  }

  &__logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 1;
    margin-left: 1rem;
  }

  &__logo {
    width: 100%;
  }

  &__contact-wrapper {
    margin-right: 2rem;
  }

  &__contact {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    margin-left: auto;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.33;
    text-transform: uppercase;
    letter-spacing: 0.15rem;

    @media (max-width: 56rem) {
      display: none;
    }

    .homepage & {
      color: var(--color-quaternary);
    }

    &-icon {
      display: grid;
      place-items: center;

      &::before,
      &::after {
        --color: var(--color-quaternary);
        grid-area: 1 / -1;
        width: var(--size);
        height: var(--size);
        content: "";
        border: 0.0625rem solid var(--color-quaternary);
        transition: 0.3s;
        transition-property: transform, opacity;
        transform: rotate(45deg);

        .homepage & {
          --color: var(--color-quaternary);
        }
      }

      &::before {
        --size: 3rem;
        opacity: 0.2;

        .header-menu__contact:hover & {
          opacity: 0;
          transform: rotate(-45deg);
        }
      }

      &::after {
        --size: 2rem;

        .header-menu__contact:hover & {
          opacity: 0;
          transform: rotate(135deg);
        }
      }
    }

    &-arrow {
      grid-area: 1 / -1;
      transition: transform 0.3s;
      transform: translateX(-1.625rem);
      color: var(--color-quaternary);

      .header-menu__contact:hover & {
        transform: translateX(0);
      }
    }

    &-title {
      color: var(--color-quaternary);
    }
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: start;
    font-family: var(--font-family-alt);
    font-size: 1rem;
    text-transform: uppercase;
    color: var(--color-quaternary);
    background: var(--color-white);
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;

    .header-menu__close-icon {
      margin-left: 1.5rem;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }

  &__nav {
    align-self: center;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    &:not(:last-child) {
      border-bottom: 0.0625rem solid rgba(var(--color-white-rgb), 0.2);
    }
  }

  &__link {
    position: relative;
    display: block;
    padding-left: 1.5rem;
    padding-bottom: 1rem;
    transition: color 0.3s;
    color: var(--color-quaternary);
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.6rem;

  
  }

  &__contacts {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    text-align: center;

    @media (max-width: 47.9375rem) {
      display: none;
    }

    &-label {
      margin-bottom: 1rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background: var(--color-white);
  }

  &__lang {
    flex: 1;
  }

  &__socials {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
