import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Modal from './Modal'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode) // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const { login, register } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'login') {
      const result = login(formData.email, formData.password)
      if (result.success) {
        onClose()
        setFormData({ name: '', email: '', password: '' })
      } else {
        setError(result.error)
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('All fields are required')
        return
      }
      const result = register(formData.name, formData.email, formData.password)
      if (result.success) {
        onClose()
        setFormData({ name: '', email: '', password: '' })
      } else {
        setError(result.error)
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-extrabold">{mode === 'login' ? 'Login' : 'Register'}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 font-bold">
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your name"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white shadow hover:bg-blue-600 transition"
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login')
            setError('')
          }}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    </Modal>
  )
}

export default AuthModal

