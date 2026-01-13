// Инициализация тестовых данных для демонстрации

import { storage } from './storage'

export const initTestData = () => {
  // Создаем тестового админа, если его еще нет
  const users = storage.get('petcarehub_users') || []
  const adminExists = users.find((u) => u.email === 'admin@petcarehub.com')

  if (!adminExists) {
    users.push({
      id: 1,
      name: 'Admin User',
      email: 'admin@petcarehub.com',
      password: 'admin123', // В реальном приложении - хеширование!
      role: 'admin',
      createdAt: new Date().toISOString(),
    })
    storage.set('petcarehub_users', users)
  }

  // Создаем тестового пользователя
  const userExists = users.find((u) => u.email === 'user@test.com')
  if (!userExists) {
    users.push({
      id: 2,
      name: 'Test User',
      email: 'user@test.com',
      password: 'user123',
      role: 'user',
      createdAt: new Date().toISOString(),
    })
    storage.set('petcarehub_users', users)
  }
}

