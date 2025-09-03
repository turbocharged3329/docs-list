<template>
  <div class="d-docs-list d-scrollbar-hidden">
    <p v-if="isListEmpty && !isLoading && !isError" class="d-text-p2 d-text-secondary">
      Ничего не найдено
    </p>

    <section v-else-if="isError" class="d-docs-list__error-container">
      <p class="d-text-p2 d-text-danger">Ошибка при загрузке списка</p>
      <DButton @click="refreshList">Обновить</DButton>
    </section>

    <p v-else-if="isLoading" class="d-text-p2 d-text-secondary">Загрузка...</p>
    <DocsListItem
      v-else
      v-for="item in items"
      :key="item.id"
      :data="item"
      :class="{ 'd-docs-list-item--active': selectedItem?.id === item.id }"
      @click="onItemClick(item)"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import DocsListItem from '@/components/docs/list/DocsListItem.vue'
import { useDocsStore } from '@/stores/docs.store.ts'
import type { UserDocsItem } from '@/interfaces/docs.interfaces.ts'
import DButton from '@/components/common/DButton.vue'

const docsStore = useDocsStore()
const { getItems: refreshList } = docsStore
const { items, isListEmpty, isLoading, isError, selectedItem } = storeToRefs(docsStore)

function onItemClick(item: UserDocsItem) {
  selectedItem.value = item
}
</script>

<style lang="scss" scoped>
.d-docs-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  &__error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
  }
}
</style>
