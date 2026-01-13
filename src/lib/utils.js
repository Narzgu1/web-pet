// Утилиты для форматирования дат
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Форматирование времени назад (2 hours ago, 1 day ago)
export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  return formatDate(dateString)
}

// Валидация email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Валидация телефона
export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]+$/
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10
}

