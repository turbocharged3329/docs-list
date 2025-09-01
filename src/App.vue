<template>
  <TheHeader />

  <main class="d-main-content d-box-shadow"></main>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
</script>

<style scoped>
.d-main-content {
  width: 100%;
  flex-grow: 1;
}
</style>
