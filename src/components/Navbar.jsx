import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'

const Navbar = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  
  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/forum', label: 'Forum' },
    { path: '/pet-profile', label: 'Pet Profile' },
    { path: '/facilities', label: 'Facilities Map' },
    { path: '/lost-found', label: 'Lost & Found' },
    { path: '/admin', label: 'Admin' },
  ]

  const getActionButton = () => {
    if (location.pathname === '/pet-profile') {
      return (
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md transition">
          Edit Profile
        </button>
      )
    }
    if (location.pathname === '/lost-found') {
      return (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search pets..."
            className="hidden lg:block border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition">
            Search
          </button>
        </div>
      )
    }
    if (location.pathname === '/facilities') {
      return (
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition">
          Add New Location
        </button>
      )
    }
    if (location.pathname === '/admin') {
      return (
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition">
          Admin Actions
        </button>
      )
    }
    return (
      <button className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-bold text-white shadow hover:bg-blue-600 transition">
        Register Now
      </button>
    )
  }

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              🐾
            </span>
            <span>PetCareHub</span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition ${
                  isActive(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Hello, {user.name}</span>
              {location.pathname === '/admin' && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Admin</span>}
              <button
                onClick={logout}
                className="rounded-xl bg-gray-500 px-5 py-2 text-sm font-bold text-white shadow hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-bold text-white shadow hover:bg-blue-600 transition"
            >
              {location.pathname === '/' ? 'Register Now' : 'Login'}
            </button>
          )}
        </div>
      </div>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </nav>
  )
}

export default Navbar

