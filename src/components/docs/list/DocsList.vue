<template>
  <div class="d-docs-list d-scrollbar-hidden">
    <p v-if="isListEmpty && !isLoading && !isError" class="d-text-p2 d-text-secondary">
      Ничего не найдено
    </p>
    <p v-else-if="isError" class="d-text-p2 d-text-danger">Ошибка при выполнении запроса</p>
    <p v-else-if="isLoading" class="d-text-p2 d-text-secondary">Заргрузка...</p>
    <DocsListItem v-else v-for="item in items" :key="item.id" :data="item" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import DocsListItem from '@/components/docs/list/DocsListItem.vue'
import { useDocsStore } from '@/stores/docs.store.ts'

const docsStore = useDocsStore()
const { items, isListEmpty, isLoading, isError } = storeToRefs(docsStore)
</script>

<style scoped>
.d-docs-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}
</style>
