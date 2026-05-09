import { useCallback } from 'react'

const STORAGE_KEY = 'somniwatch_history'
const MAX_ITEMS = 20

export interface HistoryItem {
  id: string
  title: string
  thumbnail: string
  videoUrl: string
  watchedAt: number
  roomId: string
  lastPosition?: number
}

export function useWatchHistory() {
  const getHistory = useCallback((): HistoryItem[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    } catch { return [] }
  }, [])

  const addToHistory = useCallback((item: Omit<HistoryItem, 'id' | 'watchedAt'>) => {
    const history = getHistory().filter(h => h.videoUrl !== item.videoUrl)
    const newItem: HistoryItem = { ...item, id: crypto.randomUUID(), watchedAt: Date.now() }
    const updated = [newItem, ...history].slice(0, MAX_ITEMS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }, [getHistory])

  const updatePosition = useCallback((videoUrl: string, position: number) => {
    const history = getHistory()
    const updated = history.map(h => h.videoUrl === videoUrl ? { ...h, lastPosition: position } : h)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }, [getHistory])

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { getHistory, addToHistory, updatePosition, clearHistory }
}
