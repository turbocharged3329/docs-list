<template>
  <TheHeader />
  <main class="d-main-content d-box-shadow">
    <DocsSidebar />
    <DocsDocContent />
  </main>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import DocsSidebar from '@/components/docs/DocsSidebar.vue'
import DocsDocContent from '@/components/docs/DocsDocContent.vue'
</script>

<style lang="scss" scoped>
.d-main-content {
  width: 100%;
  display: flex;
  height: calc(
    100vh - $header-height - $header-margin-bottom - $body-padding-top - $body-padding-bottom
  );
  border-radius: 0.625rem;
  overflow: hidden;

  @media screen and (max-width: 767px) {
    height: calc(
      100vh - $header-height - $header-margin-bottom - $body-padding-top--mobile -
        $body-padding-bottom--mobile
    );
    position: relative;
  }
}
</style>
