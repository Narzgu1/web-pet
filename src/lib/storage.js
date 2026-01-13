// Простой репозиторий для работы с localStorage

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error writing to localStorage:', error)
      return false
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  },

  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  },
}

// Ключи для хранения данных
export const STORAGE_KEYS = {
  USER: 'petcarehub_user',
  PETS: 'petcarehub_pets',
  POSTS: 'petcarehub_posts',
  LOST_FOUND: 'petcarehub_lost_found',
  FACILITIES: 'petcarehub_facilities',
}

