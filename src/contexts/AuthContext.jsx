import { createContext, useContext, useState, useEffect } from 'react'
import { storage, STORAGE_KEYS } from '../lib/storage'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Загружаем пользователя из localStorage при монтировании
    const savedUser = storage.get(STORAGE_KEYS.USER)
    if (savedUser) {
      setUser(savedUser)
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Простая проверка (в реальном приложении - запрос к API)
    const users = storage.get('petcarehub_users') || []
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      storage.set(STORAGE_KEYS.USER, userWithoutPassword)
      return { success: true }
    }

    return { success: false, error: 'Invalid email or password' }
  }

  const register = (name, email, password, role = 'user') => {
    const users = storage.get('petcarehub_users') || []

    // Проверка на существующего пользователя
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'User with this email already exists' }
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // В реальном приложении - хеширование
      role,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    storage.set('petcarehub_users', users)

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    storage.set(STORAGE_KEYS.USER, userWithoutPassword)

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    storage.remove(STORAGE_KEYS.USER)
  }

  const isAdmin = () => user?.role === 'admin'

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

