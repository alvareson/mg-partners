<template>
  <section :class="['cabin-class', { 'cabin-class--selected': isSelected }]">
    <h3 class="cabin-class__title text-h4">{{ category.title }}</h3>
    <p class="cabin-class__description">{{ category.description }}</p>
    <footer class="cabin-class__bottom">
      <p class="cabin-class__passengers">
        <Icon class="cabin-class__passengers-icon" name="person" />
        Up to {{ category.maxPassengersCapacity }} passengers
      </p>
      <button class="cabin-class__btn" type="button" @click="emitFilterEvent">
        <Icon class="cabin-class__btn-icon" name="chevron-right" />
      </button>
    </footer>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  category: {
    type: Object as PropType<object>,
    required: true,
    default: () => ({}),
  },
  isSelected: {
    type: Boolean,
    required: true,
    default: false,
  }
})

const category = toRef(props, "category")
const isSelected = toRef(props, "isSelected")
const emits = defineEmits(['filterByCategoryId'])

const emitFilterEvent = () => {
  emits('filterByCategoryId', category.value.id)
}
</script>

<style lang="scss">
.cabin-class {
  padding: 2rem;
  border: 0.0625rem solid var(--color-secondary);

  &--selected {
    border: 0.5rem double black;
  }

  &__title {
    margin-bottom: 1rem;
  }

  &__description {
    margin-bottom: 1.5rem;
  }

  &__bottom {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  &__passengers {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.875rem;
    line-height: 1.5;

    &-icon {
      color: var(--color-secondary);
    }
  }

  &__btn {
    --border-opacity: 0.2;
    display: grid;
    place-content: center;
    width: 2rem;
    height: 2rem;
    margin-right: 0.3125rem;
    border: 0.0625rem solid rgba(var(--color-primary-rgb), var(--border-opacity));
    transition: 0.25s;
    transition-property: transform, border;
    transform: rotate(45deg);

    &:hover {
      --border-opacity: 0.6;
      transform: rotate(135deg);
    }

    &-icon {
      transition: 0.25s;
      transition-property: transform, border;
      transform: rotate(-45deg);

      .cabin-class__btn:hover & {
        transform: rotate(-135deg);
      }
    }
  }
}
</style>
