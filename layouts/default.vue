<template>
  <div class="layout" :class="{ homepage: isHomePage }">
    <LayoutHeader class="layout__header" />
    <main class="layout__body">
      <slot />
    </main>
    <LayoutFooter class="layout__footer" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isHomePage = computed(() => {
  if (typeof route.name !== "string") return
  return route.name.split("___")[0] === "index"
})
</script>
