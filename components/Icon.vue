<template>
  <svg :width="width" :height="height">
    <use :xlink:href="`/img/icons.svg#${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
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
</script>
