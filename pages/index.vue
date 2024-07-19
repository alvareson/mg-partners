<template>
  <div class="homepage">
    <Hero />
    <FeaturedProperties />
    <NewDevelopments />
  </div>
</template>

<script setup lang="ts">
import { getHome } from "~/data/pages/api"
// const { locale } = useI18n()

// const { data } = await useAsyncData(`${locale.value}--home`, () => getHome())

// useSeoMeta({
//   title: data.value?.seoTitle,
//   description: data.value?.seoDescription,
//   robots: "noimageindex",
//   keywords: "Dubai real estate, UAE properties, luxury homes Dubai, property investment Dubai, real estate agency UAE, Dubai apartments, luxury villas Dubai, commercial properties Dubai, Dubai real estate market, property for sale Dubai.",
//   author: "Horizon Vista",
//   publisher: "Horizon Vista"
// })
</script>
