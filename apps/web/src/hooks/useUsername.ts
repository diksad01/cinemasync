import { useState } from 'react'

const KEY = 'somniwatch_username'

export function useUsername() {
  const [name, setName] = useState(() => localStorage.getItem(KEY) ?? '')

  const saveName = (newName: string) => {
    const trimmed = newName.trim()
    localStorage.setItem(KEY, trimmed)
    setName(trimmed)
  }

  const clearName = () => {
    localStorage.removeItem(KEY)
    setName('')
  }

  return { name, saveName, clearName, hasName: name.trim().length > 0 }
}
