<template>
  <div
    class="d-docs-doc-content"
    :class="{
      'd-docs-doc-content--empty': !selectedItem,
      'd-docs-doc-content--visible': selectedItem,
    }"
  >
    <DButton class="d-docs-doc-content__back-btn" @click="backToList">Назад</DButton>

    <p v-if="!selectedItem" class="d-text-p2 d-text-secondary d-text-center">
      Выберите документ, чтобы посмотреть его содержимое
    </p>

    <div v-else class="d-docs-doc-content__wrapper">
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
    </div>
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

function backToList() {
  selectedItem.value = null
}
</script>

<style scoped lang="scss">
$box-padding: 30px;

.d-docs-doc-content {
  background-color: $color-bg-secondary;
  width: 100%;
  height: 100%;
  padding: $box-padding;
  display: flex;

  &__wrapper {
    display: flex;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 1024px) {
      flex-direction: column;
      align-items: flex-start;
      flex-basis: 100%;
      overflow-y: auto;
    }
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    flex-basis: 100%;
    position: absolute;
    top: 0;
    left: 100%;
    transition: left 0.3s ease-in-out;

    &--visible {
      left: 0;
    }
  }

  &--empty {
    justify-content: center;
    align-items: center;
  }

  &__back-btn {
    width: 100%;
    margin-bottom: 1.5rem;
    display: none;

    @media screen and (max-width: 767px) {
      display: inline-block;
      flex-shrink: 0;
    }
  }
}

.d-docs-doc-content-image {
  width: 45.9%;
  height: 100%;

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: auto;
    margin-bottom: 1.5rem;
  }

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

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
  }

  &__btns-wrapper {
    display: flex;
    justify-content: flex-start;
    gap: 1.25vw;
    margin-bottom: 47px;

    @media screen and (max-width: 1024px) {
      width: 100%;
      gap: 2.5vw;

      .d-button {
        flex-grow: 1;
      }
    }
  }

  &__description {
    overflow-y: auto;
  }
}
</style>
