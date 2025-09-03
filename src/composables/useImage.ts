import { computed, type Ref } from 'vue'

const IMG_PLACEHOLDER_PATH = '/images/picture-placeholder.png'

export const useImage = (imgSrc: Ref<string | null>) => {
  const imgPath = computed(() => {
    return imgSrc.value || IMG_PLACEHOLDER_PATH
  })

  function onImageLoadError(e: Event) {
    if (e.target instanceof HTMLImageElement) {
      if (e.target.src.indexOf(IMG_PLACEHOLDER_PATH) !== -1) {
        console.warn('Ошибка при загрузке плейсхолдера')
        return
      }

      e.target.src = IMG_PLACEHOLDER_PATH
    }
  }

  return {
    imgPath,

    onImageLoadError,
  }
}
