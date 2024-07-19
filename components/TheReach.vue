<template>
  <section class="the-reach" id="the-reach">
    <div class="the-reach__wrapper">
      <picture class="the-reach__img">
        <img :src="rangeMap" alt="Range map" class="stretched-img" />
      </picture>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  rangeMap: {
    type: String as PropType<string>,
    required: true,
  },
})
const rangeMap = toRef(props, "rangeMap")
</script>

<style lang="scss">
.the-reach {
  width: 84vw;
  overflow: hidden;

  @media (max-width: 86.5rem) {
    width: 100vw;
  }

  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: auto;
  }
}

.stretched-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
</style>
