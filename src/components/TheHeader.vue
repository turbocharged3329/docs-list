<template>
  <header class="d-main-header">
    <h1 class="d-text-h1">My App</h1>
    <p class="d-text-p1">Username</p>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.d-main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $header-margin-bottom;
  flex-shrink: 0;
  height: $header-height;
}
</style>
