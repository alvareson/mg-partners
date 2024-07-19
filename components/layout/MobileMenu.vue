<template>
  <div class="mobile-menu" :class="{ 'mobile-menu--open': open }">
    <header class="mobile-menu__header">
      <AppLink :to="{ path: '/' }">
        <svg width="80" height="80">
          <use xlink:href="/img/logos.svg#logo" />
        </svg>
      </AppLink>
      <button class="mobile-menu__close" type="button" aria-label="Close menu" @click="closeMenu">
        <Icon name="close" width="32" height="32" />
      </button>
    </header>
    <nav class="mobile-menu__nav text-h3">
      <ul class="mobile-menu__list">
        <li class="mobile-menu__item" v-for="item in menu">
          <AppLink :to="item.to" class="mobile-menu__link">{{ item.name }}</AppLink>
        </li>
      </ul>
    </nav>
    <ul class="mobile-menu__social">
      <li v-for="item in social" :key="item.name">
        <AppLink class="" :to="item.path" :aria-label="item.name">
          <Icon :name="item.icon" />
        </AppLink>
      </li>
    </ul>
    <button class="mobile-menu__contact" type="button" @click="openContactUs">
      <span class="mobile-menu__contact-icon">
        <Icon class="mobile-menu__contact-phone" name="phone" width="32" height="32" />
      </span>
      Contact us
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:open", "open-contact-us"])

const props = defineProps({
  menu: {
    type: Array as PropType<HeaderMenuItem[]>,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
})

const open = toRef(props, "open")
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    if (!open.value) return
    emit("update:open", false)
  }
)

watch(open, value => {
  const classList = document.documentElement.classList
  if (value) classList.add("overflow")
  else classList.remove("overflow")
})

const closeMenu = () => {
  emit("update:open", false)
}

const openContactUs = () => {
  emit("open-contact-us")
  closeMenu()
}

const social = [
  { name: "Instagram", path: "https://www.instagram.com/mg_aviation_fzco", icon: "instagram" },
  // { name: "X", path: "https://twitter.com/", icon: "x" },
  // { name: "Facebook", path: "https://www.facebook.com", icon: "facebook" },
  { name: "LinkedIn", path: "https://www.linkedin.com/showcase/mg-aviation/", icon: "linkedin" },
]
</script>

<style lang="scss">
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 100;
  padding-inline: 1.5rem;
  overflow: auto;
  color: var(--color-tertiary);
  background: var(--color-primary);
  transition: transform 0.4s ease-in-out;
  transform: translateY(-100%);

  &--open {
    transform: translateY(0);
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    margin-bottom: 4rem;

    &::before {
      content: "";
    }
  }

  &__close {
    margin-left: auto;
  }

  &__nav {
    margin-bottom: 3rem;
    text-align: center;
  }

  &__list {
    display: grid;
    gap: 1.5rem;
  }

  &__social {
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    justify-content: center;
    text-align: center;
  }

  &__contact {
    display: grid;
    gap: 1rem;
    margin: 6.25rem auto;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.14;
    text-transform: uppercase;
    letter-spacing: 0.175rem;

    &-icon {
      display: grid;
      place-items: center;
      width: 7rem;
      height: 7rem;

      &::before,
      &::after {
        grid-area: 1 / -1;
        width: var(--size);
        height: var(--size);
        content: "";
        border: 0.0625rem solid var(--color-white);
        transform: rotate(45deg);
      }

      &::before {
        --size: 5rem;
        opacity: 0.2;
      }

      &::after {
        --size: 3.5rem;
      }
    }

    &-phone {
      grid-area: 1 / -1;
    }
  }
}
</style>
