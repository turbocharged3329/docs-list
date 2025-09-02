<template>
  <input
    class="d-text-input"
    type="text"
    v-model="modelValue"
    @input="$emit('input')"
    @blur="$emit('blur')"
    @change="$emit('change')"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel<string>()
defineEmits(['blur', 'input', 'change'])
</script>

<style lang="scss" scoped>
.d-text-input {
  width: 100%;
  border-radius: 8px;
  border: 1px solid $color-gray-200;
  padding: 1rem 1.5rem;
  background-color: $color-bg-secondary;
  font-size: inherit;
  font-weight: normal;

  &::placeholder {
    color: $color-text-secondary;
  }

  &:focus {
    outline-color: $color-blue-500;
  }
}
</style>
