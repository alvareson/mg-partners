import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('thtml', {
    mounted: (el: HTMLElement, binding: any) => {
      el.innerHTML = binding.value
    },
    getSSRProps(binding: any) {
      return {
        innerHTML: binding.value
      }
    }
  })
})