import { useState, useEffect } from 'react'
import { storage, STORAGE_KEYS } from '../lib/storage'
import Modal from '../components/Modal'
import { useAuth } from '../contexts/AuthContext'
import lostFoundData from '../data/lostFound.json'

const LostFound = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    petName: '',
    location: '',
    description: '',
    status: 'Lost',
    contact: '',
    image: null,
  })
  const [filter, setFilter] = useState('all') // 'all', 'Lost', 'Found'
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const savedPosts = storage.get(STORAGE_KEYS.LOST_FOUND)
    if (savedPosts && savedPosts.length > 0) {
      setPosts(savedPosts)
    } else {
      setPosts(lostFoundData)
      storage.set(STORAGE_KEYS.LOST_FOUND, lostFoundData)
    }
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPost = {
      id: Date.now(),
      name: formData.petName,
      status: formData.status,
      location: formData.location,
      description: formData.description,
      contact: formData.contact,
      image: formData.image || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=60',
      author: user?.name || 'Anonymous',
      createdAt: new Date().toISOString(),
    }

    const updatedPosts = [newPost, ...posts]
    setPosts(updatedPosts)
    storage.set(STORAGE_KEYS.LOST_FOUND, updatedPosts)

    setFormData({
      petName: '',
      location: '',
      description: '',
      status: 'Lost',
      contact: '',
      image: null,
    })
    alert('Report submitted successfully!')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleViewPet = (pet) => {
    setSelectedPet(pet)
    setViewModalOpen(true)
  }

  const filteredPosts = filter === 'all' ? posts : posts.filter((post) => post.status === filter)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Report Form */}
        <section className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-2xl font-extrabold mb-6">Report a Lost or Found Pet</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="petName" className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                  Pet Name
                </label>
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Charlie"
                  required
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Last seen near..."
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Color, collar, behavior..."
                  required
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                  Contact Info
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Phone or email"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
                  Photo
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-xl" />
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-extrabold py-4 rounded-2xl shadow-lg transition"
              >
                Submit Report
              </button>
            </form>
          </div>

          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-extrabold text-blue-800">Stay Informed</h3>
            <p className="text-sm text-blue-600 mt-1">Receive notifications about local lost pet reports.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md transition">
              Enable Notifications
            </button>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold">Current Lost & Found Posts</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('Lost')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                  filter === 'Lost'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Lost
              </button>
              <button
                onClick={() => setFilter('Found')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                  filter === 'Found'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Found
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((pet) => (
              <div
                key={pet.id}
                onClick={() => handleViewPet(pet)}
                className="bg-white rounded-3xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <img
                  src={pet.image}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-gray-50 mb-4"
                  alt={`${pet.name} the ${pet.status.toLowerCase()} pet`}
                />
                <h3 className="font-extrabold text-lg">{pet.name}</h3>
                <p
                  className={`text-xs font-bold uppercase mt-1 ${
                    pet.status === 'Lost' ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {pet.status}
                </p>
                <p className="text-sm text-gray-500 mt-2">{pet.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* View Pet Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)}>
        {selectedPet && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold">{selectedPet.name}</h3>
              <button
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-center mb-4">
              <img
                src={selectedPet.image}
                className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-gray-100"
                alt={selectedPet.name}
              />
              <p
                className={`text-sm font-bold uppercase mt-2 ${
                  selectedPet.status === 'Lost' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {selectedPet.status}
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Location</p>
                <p className="text-sm font-semibold">{selectedPet.location || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Description</p>
                <p className="text-sm text-gray-700">{selectedPet.description}</p>
              </div>
              {selectedPet.contact && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Contact</p>
                  <p className="text-sm font-semibold">{selectedPet.contact}</p>
                </div>
              )}
              {selectedPet.author && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Reported by</p>
                  <p className="text-sm text-gray-600">{selectedPet.author}</p>
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </main>
  )
}

export default LostFound
