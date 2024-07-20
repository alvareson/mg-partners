<template>
  <svg :width="iconWidth" :height="iconHeight">
    <use :xlink:href="iconUrl" />
  </svg>
</template>

<script setup lang="ts">
import spriteUrl from "/img/icons.svg?url"

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: 24,
  },
  height: {
    type: [String, Number],
    default: 24,
  },
})

const { width: iconWidth, height: iconHeight, name: iconName } = toRefs(props)

const iconUrl = computed(() => `${spriteUrl}#${iconName.value}`)
</script>

<style lang="scss"></style>
