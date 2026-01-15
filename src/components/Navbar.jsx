import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/forum', label: 'Forum' },
    { path: '/pet-profile', label: 'Pet Profile' },
    { path: '/facilities', label: 'Facilities Map' },
    { path: '/lost-found', label: 'Lost & Found' },
    { path: '/admin', label: 'Admin' },
  ];

  const getActionButton = () => {
    if (location.pathname === '/pet-profile') {
      return (
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors">
          Edit Profile
        </button>
      );
    }
    if (location.pathname === '/lost-found') {
      return (
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors">
          Report Pet
        </button>
      );
    }
    if (location.pathname === '/admin') {
      return (
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors">
          Admin Actions
        </button>
      );
    }
    return null;
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <i className="fas fa-paw text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">PetCareHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Вызов функции кнопки действия */}
            {getActionButton()}

            {user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600">Hello, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;