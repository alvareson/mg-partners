<script setup lang="ts">
defineProps(["to"])
</script>

<template>
  <NuxtLink :to="to"><slot /></NuxtLink>
</template>
