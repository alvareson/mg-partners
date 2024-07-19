<template>
  <section class="hero">
    <div class="container">
      <SearchForm />
    </div>
    <div class="hero__video">
      <video autoplay muted loop>
        <source src="/video/panorama.mp4" type="video/mp4" />
      </video>
    </div>
  </section>
</template>

<script setup lang="ts">
// const { t } = useI18n()
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  z-index: 0;
  display: grid;
  min-height: 45vw;
  color: var(--color-white);
  background: var(--color-white);

  @media (max-width: 63.9375rem) {
    min-height: 30rem;
    aspect-ratio: auto;
  }

  .container {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5rem;
    box-sizing: border-box;
    z-index: 3;
  }

  &__title {
    margin-bottom: clamp(1rem, 0.777rem + 0.915vw, 1.875rem);
    text-align: center;
  }

  &__video {
    position: relative;
    grid-area: 1 / -1;

    video {
      position: absolute; 
      right: 0; 
      bottom: 0;
      min-width: 100%; 
      min-height: 100%;
      width: auto; 
      height: auto; 
      z-index: -100;
      background-size: cover;
      overflow: hidden;
    }

    &::after {
      position: absolute;
      inset: 0;
      content: "";
    }
  }
}
</style>
