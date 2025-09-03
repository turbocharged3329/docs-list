<template>
  <div class="d-docs-doc-content" :class="{ 'd-docs-doc-content--empty': !selectedItem }">
    <p v-if="!selectedItem" class="d-text-p2 d-text-secondary">
      Выберите документ, чтобы посмотреть его содержиое
    </p>

    <template v-else>
      <section class="d-docs-doc-content-image">
        <img class="d-docs-doc-content-image__img" :src="imgPath" @error="onImageLoadError" />
      </section>

      <section class="d-docs-doc-content-info">
        <h6 class="d-text-s1">{{ selectedItem?.name }}</h6>
        <div class="d-docs-doc-content-info__btns-wrapper">
          <DButton variant="accent" @click="downloadDoc">Скачать</DButton>
          <DButton variant="danger" :disabled="!selectedItem.image">Удалить</DButton>
        </div>

        <h6 class="d-text-s1">Описание:</h6>
        <p class="d-docs-doc-content-info__description d-text-p2 d-text-secondary">
          {{ selectedItem?.description || '' }}
        </p>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useDocsStore } from '@/stores/docs.store.ts'
import { storeToRefs } from 'pinia'
import { useImage } from '@/composables/useImage.ts'
import { computed } from 'vue'
import DButton from '@/components/common/DButton.vue'
import { downloadTextAsTxt } from '@/utils.ts'

const docsStore = useDocsStore()
const { selectedItem } = storeToRefs(docsStore)

const selectedItemImagePath = computed(() => selectedItem.value?.image || null)

const { imgPath, onImageLoadError } = useImage(selectedItemImagePath)

function downloadDoc() {
  if (selectedItem.value) {
    downloadTextAsTxt(selectedItem.value.name, selectedItem.value.description || '')
  }
}
</script>

<style scoped lang="scss">
$box-padding: 30px;

.d-docs-doc-content {
  background-color: $color-bg-secondary;
  width: 100%;
  height: 100%;
  display: flex;
  padding: $box-padding;

  &--empty {
    justify-content: center;
    align-items: center;
  }
}

.d-docs-doc-content-image {
  width: 45.9%;
  height: 100%;

  &__img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

.d-docs-doc-content-info {
  width: 47.5%;
  margin-left: auto;
  display: flex;
  flex-direction: column;

  &__btns-wrapper {
    display: flex;
    justify-content: flex-start;
    gap: 1.25vw;
    margin-bottom: 47px;
  }

  &__description {
    overflow-y: auto;
  }
}
</style>
