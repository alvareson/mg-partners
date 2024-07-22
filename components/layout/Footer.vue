<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer__top">
        <nav class="footer__menu">
          <ul class="footer__menu-items">
            <li
              class="footer__menu-item"
              :class="[
                item.social ? 'footer__menu-item--social' : 'footer__menu-item--list',
                { 'footer__menu-item--expanded': expandedSection === item.title },
              ]"
              v-for="item in menu"
              :key="item.title"
            >
              <p class="footer__menu-title">{{ item.title }}</p>
              <button class="footer__menu-arrow" type="button" @click="toggleSection(item.title)">
                <Icon class="footer__menu-arrow-icon" name="chevron-down" />
              </button>
              <ul class="footer__menu-list" :class="{ 'footer__menu-list--social': item.social }">
                <li v-for="subItem in item.items" :key="subItem.name">
                  <AppLink class="footer__menu-link" :to="subItem.path" :aria-label="subItem.icon && subItem.name">
                    <Icon v-if="subItem.icon" :name="subItem.icon" />
                    <template v-else>{{ subItem.name }}</template>
                  </AppLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <section class="contact-us-footer">
          <div class="contact-us-footer__container">
            <h2 class="contact-us-footer__title text-h2">Schedule your private consultation</h2>
            <button class="contact-us-footer__btn" type="button" @click="isContactUsOpen = true">
              <span class="contact-us-footer__icon">
                <Icon class="contact-us-footer__phone" name="phone" width="32" height="32" />
              </span>
            </button>
          </div>
          <Dialog :component="ContactUsDialog" :open="isContactUsOpen" @close="isContactUsOpen = false" />
        </section>
        <svg class="footer__logo" width="248" height="248">
            <use xlink:href="/img/mgwhite.svg#mgwhite-logo" />
        </svg>
      </div>
      <p class="footer__copyright">© MG & Partners {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import ContactUsDialog from "@/components/ContactUsDialog.vue"

const isContactUsOpen = ref(false)

const menu: FooterMenu[] = [
  {
    title: "Property Sales",
    items: [
      { name: "Secondary", path: "#" },
      { name: "Off Plan", path: "#" },
    ],
  },
  // TODO: hide Company and Resources for now
  // {
  //   title: "Company",
  //   items: [
  //     { name: "About us", path: "#" },
  //     { name: "Our team", path: "#" },
  //     { name: "Charity partnerships", path: "#" },
  //   ],
  // },
  // {
  //   title: "Resources",
  //   items: [
  //     { name: "Contact us", path: "#" },
  //     { name: "Terms and conditions", path: "#" },
  //     { name: "Privacy policy", path: "#" },
  //   ],
  // },
]

const expandedSection = ref<string | false>(false)
const toggleSection = (section: string) => {
  if (expandedSection.value === section) {
    expandedSection.value = false
  } else {
    expandedSection.value = section
  }
}
</script>

<style lang="scss">
.footer {
  padding-block: 2rem 1.5rem;
  font-size: 0.875rem;
  line-height: 1.71;
  color: var(--color-white);
  background: var(--color-quaternary) url('/img/footerBackground.png') no-repeat center/cover;

  @media (max-width: 47.9375rem) {
    padding-block: 2.5rem 2.5rem;
  }

  .container {
    --container-width: 75.25rem;
  }

  &__top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 2rem;

    @media (max-width: 47.9375rem) {
      margin-bottom: 2.5rem;
    }
  }

  &__menu {
    flex-shrink: 0;
    padding-top: 3rem;

    @media (max-width: 63.9375rem) {
      flex-basis: 100%;
    }

    @media (max-width: 47.9375rem) {
      margin-bottom: 2.5rem;
      padding-top: 0;
    }

    &-items {
      display: flex;
      gap: 5rem;

      @media (max-width: 63.9375rem) {
        gap: 2rem;
      }

      @media (max-width: 47.9375rem) {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }
    }

    &-item {
      position: relative;
      font-size: 1.1rem;

      @media (max-width: 63.9375rem) {
        flex-grow: 1;
      }

      @media (max-width: 47.9375rem) {
        width: min(21.375rem, 100%);
      }

      &--list {
        @media (max-width: 47.9375rem) {
          border-bottom: 0.0625rem solid rgba(var(--color-secondary-rgb), 0.3);
        }
      }

      &--social {
        @media (max-width: 47.9375rem) {
          width: fit-content;
          margin-top: 1.5rem;
          text-align: center;
          justify-content: center;
        }
      }
    }

    &-title {
      margin-bottom: 1.5rem;
      font-weight: 600;
      color: var(--color-white);
      text-transform: uppercase;
      letter-spacing: 0.175rem;
      font-size: 1.4rem;

      @media (max-width: 47.9375rem) {
        .footer__menu-item--list & {
          margin-bottom: 0.9375rem;
        }

        .footer__menu-item--social & {
          margin-bottom: 1rem;
        }
      }
    }

    &-arrow {
      display: none;

      @media (max-width: 47.9375rem) {
        .footer__menu-item--list & {
          position: absolute;
          inset: -0.5rem 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 2.5rem;
          color: var(--color-secondary);
        }
      }
    }

    &-arrow-icon {
      transition: transform 0.25s;

      @media (max-width: 47.9375rem) {
        .footer__menu-item--expanded & {
          transform: rotate(180deg);
        }
      }
    }

    &-list {
      display: grid;
      gap: 1rem;

      @media (max-width: 47.9375rem) {
        .footer__menu-item--list & {
          display: none;
        }

        .footer__menu-item--expanded & {
          display: grid;
          margin-bottom: 1rem;
        }

        .footer__menu-item--social & {
          gap: 2.5rem;
        }
      }

      &--social {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: center;
        text-align: center;
      }
    }

    &-link {
      &:hover {
        text-decoration: underline var(--color-secondary);
        text-underline-offset: 0.375rem;
      }
    }
  }

  &__logo {
    margin-right: 4rem;
    color: white;
  }

  &__copyright {
    @media (max-width: 63.9375rem) {
      text-align: center;
    }
  }
}
.contact-us-footer {
  display: grid;
  place-items: center;
  color: var(--color-white);
  text-align: center;

  &__container {
    display: grid;
    gap: 1rem;
    place-items: center;
  }

  &__title {
    line-height: 1.5;
    font-size: 1.6rem;
  }

  &__btn {
    display: grid;
    gap: 1.625rem;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.14;
    text-transform: uppercase;
    letter-spacing: 0.175rem;
  }

  &__icon {
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
      transition: transform 0.3s;

      .contact-us-footer__btn:hover & {
        transform: rotate(-45deg);
      }
    }

    &::after {
      --size: 3.5rem;
      transition: transform 0.3s;

      .contact-us-footer__btn:hover & {
        transform: rotate(135deg);
      }
    }
  }

  &__phone {
    grid-area: 1 / -1;
    transition: transform 0.3s;

    .contact-us-footer__btn:hover & {
      transform: scale(1.3);
    }
  }
}
</style>
