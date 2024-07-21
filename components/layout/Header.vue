<template>
  <header class="header">
    <div class="container">
      <button class="header__toggle" type="button" @click="onToggleMenu">
        <!-- <span class="header__toggle-text-mobile">{{ isMenuOpen ? "Close" : "Menu" }}</span> -->
        <span class="header__toggle-icon">
          <Icon :width="62" :height="62" :name="isMenuOpen ? 'close' : 'menu'" />
        </span>
      </button>
      <AppLink :to="{ path: '/' }">
        <svg class="header__logo" width="140" height="140">
          <use xlink:href="/img/mgpartners.svg#mgpartners-logo" />
        </svg>
      </AppLink>
      <button class="header__contact" type="button" @click="isContactUsOpen = true">
        <span class="header__contact-icon">
          <Icon class="header__contact-arrow" name="arrow-right" width="58" height="6" />
        </span>
        <p class="header__contact-title">Contact us</p>
      </button>
      <button class="header__menu-btn" type="button" aria-label="Open menu" @click="isMobileMenuOpen = true">
        <Icon name="menu" width="32" height="32" />
      </button>
    </div>
    <LayoutHeaderMenu :menu="menuTarget" :open="isMenuOpen" @close-menu="onCloseMenu" />
    <Dialog :component="ContactUsDialog" :open="isContactUsOpen" @close="isContactUsOpen = false" />
  </header>
</template>

<script setup lang="ts">
import ContactUsDialog from "@/components/ContactUsDialog.vue"
// const { locale } = useI18n()

defineEmits(["open-contact-us"])

const isContactUsOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isMenuOpen = ref(false)

const onMobileMenuChange = (val: boolean) => {
  isMobileMenuOpen.value = val
}

const menu = [
  { name: "Buy", to: { name: "index___en" } },
  { name: "Rent", to: { name: "index___en" } },
  { name: "New developments", to: { name: "index___en" } },
  { name: "About us", to: { name: "index___en" } },
  { name: "Contact us", to: { name: "index___en" } },
  // TODO hiding Company page for now
  // { name: "Company", path: "#" },
]

// const { t } = useI18n()
const menuTarget = computed(() => [
  // { name: t("nav.home"), to: "/" },
  // { name: t("nav.buy"), to: "/" },
  // { name: t("nav.rent"), to: "/" },
  // { name: t("nav.newDevelopments"), to: "/" },
  // { name: t("nav.aboutUs"), to: "/" },
  // { name: t("nav.contactUs"), to: "/" },

  { name: "buy", to: { path: '/properties/sale' } },
  { name: "rent", to: { path: '/properties/rent' } },
  { name: "new developments", to: "/new-developments" },
  { name: "about us", to: "/about-us" },
  { name: "contact us", to: "/contact-us" },
])

const onToggleMenu = (event) => {
  event.stopPropagation()
  isMenuOpen.value = !isMenuOpen.value
}

const onCloseMenu = () => {
  isMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--color-white);

  .container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding-block: 0.75rem;
    padding-bottom: 0rem;

    @media (max-width: 56rem) {
      padding-block: 0;
    }
  }

  &__menu {
    display: flex;
    gap: 2.375rem;
    font-size: 0.75rem;
    line-height: 1.33;
    text-transform: uppercase;
    letter-spacing: 0.15rem;

    @media (max-width: 56rem) {
      display: none;
    }
  }

  &__link {
    &:hover {
      text-decoration: underline var(--color-secondary);
      text-underline-offset: 0.375rem;

      .homepage & {
        text-decoration-color: var(--color-white);
      }
    }
  }

  &__toggle {
    padding-left: 1rem;
    padding-bottom: 0.5rem;
  }

  &__back {
    display: none;

    @media (max-width: 56rem) {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      display: block;

      .homepage & {
        display: none;
      }
    }
  }

  &__logo {
    @media (max-width: 56rem) {
      width: 5rem;
      height: 5rem;
    }
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

        .header__contact:hover & {
          opacity: 0;
          transform: rotate(-45deg);
        }
      }

      &::after {
        --size: 2rem;

        .header__contact:hover & {
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

      .header__contact:hover & {
        transform: translateX(0);
      }
    }

    &-title {
      color: var(--color-quaternary);
    }
  }

  &__menu-btn {
    display: none;
    margin-left: auto;

    @media (max-width: 56rem) {
      display: block;
    }
  }
}
</style>
