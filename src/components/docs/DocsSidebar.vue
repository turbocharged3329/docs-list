<template>
  <div class="d-docs-sidebar">
    <section class="d-docs-sidebar__search-section">
      <h6 class="d-text-s1">Поиск документа</h6>
      <DTextInput v-model.trim="docSearchQuery" placeholder="Введите ID документа" />
    </section>

    <p class="d-docs-sidebar__mobile-hint d-text-p2 d-text-secondary">
      Выберите документ, чтобы посмотреть его содержимое
    </p>

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

  @media screen and (max-width: 767px) {
    flex-basis: 100%;
  }

  &__search-section {
    margin-bottom: 29px;
    flex-shrink: 0;
  }

  &__mobile-hint {
    display: none;
    margin-bottom: 29px;

    @media screen and (max-width: 767px) {
      display: block;
    }
  }

  &__docs-section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 0;
  }
}
</style>
