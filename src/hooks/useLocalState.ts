import { useState, useEffect } from 'react'

export function useLocalState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Check if we're on the client side
  const isClient = typeof window !== 'undefined'

  // Initialize state with initialValue on both server and client
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Load from localStorage after mount
  useEffect(() => {
    if (!isClient) return

    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item) as T)
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error)
    }
  }, [key, isClient])

  // Update localStorage when state changes
  function setValue(value: T | ((prev: T) => T)) {
    try {
      setStoredValue(prev => {
        const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
        if (isClient) {
          window.localStorage.setItem(key, JSON.stringify(newValue))
        }
        return newValue
      })
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }

  // Handle storage events from other tabs/windows
  useEffect(() => {
    if (!isClient) return

    function handleStorageChange(e: StorageEvent) {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T)
        } catch (error) {
          console.error('Error parsing storage event value:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, isClient])

  return [storedValue, setValue]
}
