<template>
  <div class="d-docs-sidebar">
    <section class="d-docs-sidebar__search-section">
      <h6 class="d-text-s1">Поиск документа</h6>
      <DTextInput v-model.trim="docSearchQuery" placeholder="Введите ID документа" />
    </section>

    <section class="d-docs-sidebar__docs-section">
      <h6 class="d-text-s1">Результаты</h6>
      <DocsList />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import DTextInput from '@/components/common/DTextInput.vue'
import { throttle } from 'lodash-es'
import { useDocsStore } from '@/stores/docs.store.ts'
import DocsList from '@/components/docs/list/DocsList.vue'

const { getItems, resetState } = useDocsStore()

const docSearchQuery = ref('')

const throttleInput = throttle(() => getItems({ search: docSearchQuery.value }), 2000)

watch(docSearchQuery, (value) => {
  if (value.length) {
    throttleInput()

    return
  }

  throttleInput.cancel()
  resetState()
})
</script>

<style lang="scss" scoped>
.d-docs-sidebar {
  flex-basis: 22.3%;
  min-width: 282px;
  display: flex;
  flex-direction: column;
  padding-top: 27px;
  padding-left: 20px;
  padding-right: 22px;
  border-right: 1px solid $color-border;
  background-color: transparent;

  &__search-section {
    margin-bottom: 29px;
    flex-shrink: 0;
  }

  &__docs-section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 0;
  }
}
</style>
