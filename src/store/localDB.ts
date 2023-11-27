import { defineStore } from 'pinia'

interface IDataItem {
  timestamp: number
  title: string
  uploader: string
  uploaderUrl: string
  duration: number
  description: string
  uploaderVerified: boolean
  thumbnailUrl: string
  uploaderAvatar: string
  uploadDate: string
  views: number
  url: string // `/watch?v=${videoId}`
  id: string
}

export const useLocalDBStore = defineStore('history', () => {
  const indexedDB = ref<IDBFactory | null>(window.indexedDB)
  const historyDB = ref<IDBDatabase | null>(null)
  const watchedVideos = ref<IDataItem[]>([])
  const loading = ref(false)

  const open = computed(() => {
    if (!indexedDB.value) return
    return indexedDB.value.open('history', 1)
  })
  const data = computed(() => watchedVideos.value)
  const isLoading = computed(() => loading.value)

  // Methods
  const init = () => {
    if (!open.value) return
    open.value.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      const store = db.createObjectStore('watch-history', {
        keyPath: 'id',
      })
      store.createIndex('timestamp', 'timestamp', { unique: false })
    }
  }

  const openDB = () => {
    if (!open.value) return
    open.value.onsuccess = (e: Event) => {
      historyDB.value = (e.target as IDBOpenDBRequest)?.result
    }
    open.value.onerror = () => {
      console.error(open.value?.error)
    }
  }

  const insert = (data: IDataItem) => {
    if (!historyDB.value) return
    const tx = historyDB.value.transaction('watch-history', 'readwrite')
    const store = tx.objectStore('watch-history')
    store.put(data)
  }

  const getData = (q?: string) => {
    if (!historyDB.value) return
    const transaction = historyDB.value.transaction('watch-history', 'readonly')
    const store = transaction.objectStore('watch-history')
    const result = store.index('timestamp').getAll()

    result.onsuccess = (e) => {
      const query = q?.toLowerCase()!
      const sortedVideos: IDataItem[] = (
        e.target as IDBRequest
      ).result.reverse()
      const queriedVideos = sortedVideos.filter((v) => {
        const uploader = v.uploader.toLowerCase().includes(query)
        if (uploader) return true
        const title = v.title.toLowerCase().includes(query)
        if (title) return true
        return false
      })
      if (query) {
        watchedVideos.value = queriedVideos
      }
      const index = watchedVideos.value.length
      const nextItems = queriedVideos.slice(index, index + 20)
      watchedVideos.value = [...watchedVideos.value, ...nextItems]
      loading.value = false
    }
    result.onerror = (e) => {
      console.error(e.target)
      loading.value = false
    }
  }

  const clearAll = () => {
    if (!historyDB.value) return
    const tx = historyDB.value.transaction('watch-history', 'readwrite')
    const store = tx.objectStore('watch-history')
    store.clear()
  }

  onMounted(() => {
    openDB()
  })

  return {
    data,
    isLoading,
    init,
    insert,
    getData,
    clearAll,
  }
})
