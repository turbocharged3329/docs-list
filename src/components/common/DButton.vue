<template>
  <button
    :class="['d-button', `d-button--${variant}`, { 'd-button--disabled': disabled }]"
    :disabled
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const BTN_DEFAULT_VARIANT_VALUE = 'default'

interface Props {
  variant?: string
  disabled?: boolean
}

const { variant = BTN_DEFAULT_VARIANT_VALUE, disabled = false } = defineProps<Props>()
</script>

<style scoped lang="scss">
.d-button {
  padding: 0.4375rem 1.6875rem;
  border: 1px solid $color-border;
  border-radius: 0.5rem;
  color: $color-text-secondary;
  background-color: transparent;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.2;
  min-width: 7.125rem;

  &--default {
    &:hover {
      background-color: $color-border;
      color: $color-text-white;
    }
  }

  &--accent {
    border-color: $color-blue-500;
    color: $color-blue-500;

    &:hover {
      background-color: $color-blue-500;
      color: $color-text-white;
    }
  }

  &--danger {
    border-color: $color-danger;
    color: $color-danger;

    &:hover {
      background-color: $color-danger;
      color: $color-text-white;
    }
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
