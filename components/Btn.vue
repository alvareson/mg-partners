<template>
  <button class="btn" :type="typeValue">
    <slot />
  </button>
</template>

<script setup lang="ts">
enum Type {
  Button = "button",
  Submit = "submit",
}

const props = defineProps({
  type: {
    type: String as PropType<`${Type}`>,
    default: Type.Button,
  },
  submit: {
    type: Boolean,
    default: false,
  },
})

const { submit } = toRefs(props)
const typeValue = computed(() => (submit.value ? "submit" : "button"))
</script>

<style lang="scss">
.btn {
  padding: 1rem 3rem;
  font-weight: 500;
  color: var(--color-white);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: var(--color-secondary);
}
</style>
