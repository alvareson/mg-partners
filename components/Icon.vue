<template>
  <svg :width="iconWidth" :height="iconHeight" :style="svgStyle">
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
  strokeWidth: {
    type: Number,
    default: .5,
  }
})

const { width: iconWidth, height: iconHeight, name: iconName, strokeWidth } = toRefs(props)

const iconUrl = computed(() => `${spriteUrl}#${iconName.value}`)

const svgStyle = computed(() => ({
  stroke: 'currentColor',
  strokeWidth: `${strokeWidth.value}px`,
  fill: 'currentColor'
}))
</script>

<style lang="scss"></style>
