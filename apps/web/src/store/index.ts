import { create } from 'zustand'
import type { User, ChatMessage } from '@somniwatch/shared'

interface SomniStore {
  userId: string
  userName: string
  userColor: string
  setUserName: (name: string) => void
  setUserColor: (color: string) => void

  roomId: string | null
  videoUrl: string | null
  videoType: string | null
  hostId: string | null
  users: User[]
  setRoom: (roomId: string | null) => void
  setVideoUrl: (url: string | null, type?: string | null) => void
  setHostId: (id: string | null) => void
  setUsers: (users: User[]) => void

  messages: ChatMessage[]
  addMessage: (msg: ChatMessage) => void
  clearMessages: () => void

  isSyncing: boolean
  setIsSyncing: (v: boolean) => void

  isChatOpen: boolean
  toggleChat: () => void
  setChatOpen: (v: boolean) => void

  isConnected: boolean
  setConnected: (v: boolean) => void
}

const savedName = typeof window !== 'undefined' ? localStorage.getItem('sw_name') || '' : ''
const savedColor = typeof window !== 'undefined' ? localStorage.getItem('sw_color') || '#f0c060' : '#f0c060'

export const useStore = create<SomniStore>((set) => ({
  userId: crypto.randomUUID(),
  userName: savedName,
  userColor: savedColor,
  setUserName: (name) => {
    localStorage.setItem('sw_name', name)
    set({ userName: name })
  },
  setUserColor: (color) => {
    localStorage.setItem('sw_color', color)
    set({ userColor: color })
  },

  roomId: null,
  videoUrl: null,
  videoType: null,
  hostId: null,
  users: [],
  setRoom: (roomId) => set({ roomId }),
  setVideoUrl: (url, type) => set({ videoUrl: url, videoType: type || null }),
  setHostId: (id) => set({ hostId: id }),
  setUsers: (users) => set({ users }),

  messages: [],
  addMessage: (msg) => set((s) => ({ messages: [...s.messages.slice(-200), msg] })),
  clearMessages: () => set({ messages: [] }),

  isSyncing: false,
  setIsSyncing: (v) => set({ isSyncing: v }),

  isChatOpen: true,
  toggleChat: () => set((s) => ({ isChatOpen: !s.isChatOpen })),
  setChatOpen: (v) => set({ isChatOpen: v }),

  isConnected: false,
  setConnected: (v) => set({ isConnected: v }),
}))
