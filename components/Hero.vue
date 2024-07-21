<template>
  <section class="hero">
    <div class="container">
      <div class="hero__search-wrapper">
        <div class="hero__options">
          <button 
            v-for="option in options" 
            :key="option" 
            :class="{'active': selectedOption === option}" 
            @click="selectOption(option)">
            {{ option }}
          </button>
        </div>
        <SearchForm />
      </div>
    </div>
    <div class="hero__video">
      <video autoplay muted loop>
        <source src="/video/panorama.mp4" type="video/mp4" />
      </video>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ['Buy', 'Rent', 'Development']
const selectedOption = ref(options[0])

const selectOption = (option: string) => {
  selectedOption.value = option
}
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

  &__search-wrapper {
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 100%;
  }

  &__options {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    margin-right: 3rem;

    button {
      background: none;
      border: none;
      color: var(--color-secondary);
      font-size: 1.25rem;
      cursor: pointer;

      &.active {
        color: var(--color-white);
      }
    }
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
