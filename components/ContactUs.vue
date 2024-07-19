<template>
  <section class="contact-us">
    <div class="container">
      <h2 class="contact-us__title text-h2">Schedule Your Private Consultation</h2>
      <button class="contact-us__btn" type="button" @click="isContactUsOpen = true">
        <span class="contact-us__icon">
          <Icon class="contact-us__phone" name="phone" width="32" height="32" />
        </span>
        Contact us
      </button>
    </div>
    <Dialog :component="ContactUsDialog" :open="isContactUsOpen" @close="isContactUsOpen = false" />
  </section>
</template>

<script setup lang="ts">
import ContactUsDialog from "@/components/ContactUsDialog.vue"

const isContactUsOpen = ref(false)
</script>

<style lang="scss">
.contact-us {
  display: grid;
  place-items: center;
  height: 23rem;
  color: var(--color-tertiary);
  text-align: center;
  background: #3e484b url("/img/contact-us.webp") no-repeat 50% 0 / cover;

  @media (min-resolution: 144dpi), (min-resolution: 1.5dppx) {
    background-image: url("/img/contact-us@2x.webp");
  }

  .container {
    display: grid;
    gap: 1rem;
    place-items: center;
  }

  &__title {
    line-height: 1.5;
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

      .contact-us__btn:hover & {
        transform: rotate(-45deg);
      }
    }

    &::after {
      --size: 3.5rem;
      transition: transform 0.3s;

      .contact-us__btn:hover & {
        transform: rotate(135deg);
      }
    }
  }

  &__phone {
    grid-area: 1 / -1;
    transition: transform 0.3s;

    .contact-us__btn:hover & {
      transform: scale(1.3);
    }
  }
}
</style>
