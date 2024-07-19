<template>
  <div ref="menuRef" class="header-menu" :class="{ 'header-menu--open': open }">
    <header class="header-menu__header">
      <button class="header-menu__close" type="button" @click="$emit('close-menu')">
        <Icon :width="48" :height="48" class="header-menu__close-icon" name="close" />
      </button>
    </header>
    <div class="header-menu__wrapper">
      <nav class="header-menu__nav">
        <ul class="header-menu__list">
          <li class="header-menu__item" v-for="item in menu" :key="item.name">
            <AppLink :to="item.to" class="header-menu__link text-h3" @click="$emit('close-menu')">
              {{ item.name }}
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
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: auto;
  color: var(--color-white);
  background: var(--color-white);
  transition: transform 0.4s ease-in-out;
  transform: translateY(-100%);
  height: 50%;

  &--open {
    transform: translateY(0);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 1rem;
    background: var(--color-white);
  }

  &__logo {
    display: grid;
    place-content: center;
    width: 4rem;
    height: 4rem;

    svg {
      width: 100%;
      margin-top: 0.5rem;
    }
  }

  &__close {
    display: grid;
    place-items: center;
    font-family: var(--font-family-alt);
    font-size: 1rem;
    text-transform: uppercase;
    color: var(--color-quaternary);
    background: var(--color-white);
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;

    .header-menu__close-icon {
      margin-left: 2rem;
      margin-top: 3rem;
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
    padding: 1rem;
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
    padding: 1rem;
    text-transform: uppercase;
    transition: color 0.3s;
    color: var(--color-quaternary);
    font-size: 1.8rem;

    &::after {
      position: absolute;
      inset-inline-start: 0;
      bottom: -0.0625rem;
      width: 0;
      height: 0.0625rem;
      content: "";
      background: var(--color-quaternary);
      transition: width 0.3s;
    }

    &:hover {
      color: var(--color-quaternary);

      &::after {
        width: 100%;
      }
    }
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
