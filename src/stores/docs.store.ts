import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { UserDocsGetQuery, UserDocsItem } from '@/interfaces/docs.interfaces.ts'
import { DocsService } from '@/services/docs.ts'

export const useDocsStore = defineStore('docs', () => {
  const items = ref<Array<UserDocsItem>>([])
  const isLoading = ref(false)
  const isError = ref(false)

  const isListEmpty = computed(() => !items.value.length)

  async function getItems(params: UserDocsGetQuery) {
    try {
      isError.value = false
      isLoading.value = true

      const { data, status } = await DocsService.getUserDocs(params)

      if (status === 200 && data) {
        items.value = data
      } else {
        isError.value = true
      }
    } catch (error) {
      console.error(error)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  function resetState() {
    items.value = []
    isLoading.value = false
    isError.value = false
  }

  return {
    items,
    isListEmpty,
    isLoading,
    isError,

    getItems,
    resetState,
  }
})
