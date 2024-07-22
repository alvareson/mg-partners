<template>
  <Teleport to="body">
    <Transition name="fade" @after-enter="onAfterEnter">
      <div v-if="open" class="dialog-overlay" @click="$emit('close')"></div>
    </Transition>
    <!-- <Transition name="slide-from-right" @after-enter="onAfterEnter">
      <div v-if="open" ref="dialog" class="dialog-content" tabindex="0" @keydown.esc="$emit('close')">
        <component class="dialog__container" :is="component" @close="$emit('close')" v-bind="$attrs" />
      </div>
    </Transition> -->
    <Transition name="slide-from-right" @after-enter="onAfterEnter">
      <div v-if="open" ref="dialog" class="dialog" tabindex="0" @mousedown.self="$emit('close')" @keydown.esc="$emit('close')">
        <component class="dialog__container" :is="component" @close="$emit('close')" v-bind="$attrs" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineEmits(["close"])

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  component: {
    type: Object,
    default: null,
  },
})

const open = toRef(props, "open")
const dialog = ref<HTMLDivElement | null>(null)

const onAfterEnter = () => {
  dialog.value?.focus()
}

const getScrollBarWidth = () => {
  const scrollDiv = document.createElement("div")
  scrollDiv.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"
  document.body.appendChild(scrollDiv)
  const scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollBarWidth
}

watch(open, value => {
  const html = document.documentElement
  if (value) {
    html.classList.add("overflow")
    if (html.scrollHeight > html.clientHeight) html.style.setProperty("--scrollbar-width", `${getScrollBarWidth()}px`)
  } else {
    html.classList.remove("overflow")
    html.style.setProperty("--scrollbar-width", "")
  }
})
</script>

<style lang="scss">
.dialog {
  position: fixed;
  inset: 0;
  z-index: 1001;
  display: grid;
  padding-right: var(--scrollbar-width, 0);
  transition: opacity 0.3s;

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &__container {
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 2rem);
    margin: auto;
    background: var(--color-white);
  }
}

.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 1001;
  background: rgba(var(--color-quaternary-rgb), 0.5);
  transition: opacity 0.3s;
}

.dialog-content {
  position: fixed;
  top: 0;
  right: 0;
  width: 42rem;
  max-height: 100vh;
  overflow: auto;
  z-index: 1002;
  background: var(--color-white);
  transition: transform 0.3s ease;
}

.dialog__container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  background: var(--color-white);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-from-right-enter-active, .slide-from-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-from-right-enter-from {
  transform: translateX(100%);
}

.slide-from-right-leave-to {
  transform: translateX(100%);
}
</style>
