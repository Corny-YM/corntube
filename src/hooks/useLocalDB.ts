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
  url: string // `/watch?v=${videoId}`
  id: string
}

const useLocalDB = () => {
  const indexedDB = window.indexedDB
  let historyDB: IDBDatabase | null = null

  if (!indexedDB) return

  const open = indexedDB.open('history', 1)

  const init = () => {
    open.onupgradeneeded = () => {
      const db = open.result
      const store = db.createObjectStore('watch-history', {
        keyPath: 'id',
      })
      store.createIndex('timestamp', 'timestamp', { unique: false })
    }
  }

  open.onsuccess = (e: Event) => {
    historyDB = (e.target as IDBOpenDBRequest)?.result
  }

  open.onerror = () => {
    console.error(open.error)
  }

  const insert = (data: IDataItem) => {
    if (!historyDB) return
    const tx = historyDB.transaction('watch-history', 'readwrite')
    const store = tx.objectStore('watch-history')
    store.put(data)
  }

  const clearAll = () => {
    if (!historyDB) return
    const tx = historyDB.transaction('watch-history', 'readwrite')
    const store = tx.objectStore('watch-history')
    store.clear()
  }

  return { init, insert, clearAll } as const
}

export default useLocalDB
