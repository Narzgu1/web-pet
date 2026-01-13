import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Forum from './pages/Forum'
import PetProfile from './pages/PetProfile'
import Facilities from './pages/Facilities'
import LostFound from './pages/LostFound'
import Admin from './pages/Admin'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/forum" element={<Forum />} />
              <Route
                path="/pet-profile"
                element={
                  <ProtectedRoute>
                    <PetProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/lost-found" element={<LostFound />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

