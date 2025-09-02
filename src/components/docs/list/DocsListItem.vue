<template>
  <div class="d-docs-list-item">
    <section class="d-docs-list-item-image">
      <img class="d-docs-list-item-image__img" :src="imgPath" alt="" @error="onImageLoadError" />
    </section>

    <section class="d-docs-list-item-info">
      <span class="d-docs-list-item-info__title d-text-s2">{{ data.name }}</span>
      <span class="d-docs-list-item-info__title d-text-p2 d-text-secondary"
        >{{ data.size || '-' }} MB</span
      >
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { UserDocsItem } from '@/interfaces/docs.interfaces.ts'

const IMG_PLACEHOLDER_PATH = '/images/picture-placeholder.png'

interface Props {
  data: UserDocsItem
}

const props = defineProps<Props>()

const imgPath = computed(() => {
  return props.data.image || IMG_PLACEHOLDER_PATH
})

function onImageLoadError(e: Event) {
  if (e.target instanceof HTMLImageElement) {
    if (e.target.src === IMG_PLACEHOLDER_PATH) {
      console.warn('Ошибка при загрузке плейсхолдера')
      return
    }

    e.target.src = IMG_PLACEHOLDER_PATH
  }
}
</script>

<style lang="scss" scoped>
$item-height: 70px;

.d-docs-list-item {
  width: 100%;
  display: flex;
  min-height: $item-height;
  border: 1px solid $color-border;
  border-radius: 0.625rem;
  margin-bottom: 1.125rem;
  overflow: hidden;
  background-color: $color-bg-secondary;

  &:hover {
    cursor: pointer;

    .d-docs-list-item-info {
      background-color: $color-blue-500;
    }

    .d-docs-list-item-info__title {
      color: $color-text-white;
    }

    .d-docs-list-item-info__size {
      color: $color-gray-300;
    }
  }
}

.d-docs-list-item-image {
  width: auto;
  min-height: 100%;
  aspect-ratio: 1/1;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.d-docs-list-item-info {
  padding: 0.9375rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
  border-left: 1px solid $color-border;

  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 0;
    margin-bottom: 0.375rem;
  }

  &__size {
    color: $color-text-secondary;
  }
}
</style>
