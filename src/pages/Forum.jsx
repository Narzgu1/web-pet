import { useState, useEffect } from 'react'
import { storage, STORAGE_KEYS } from '../lib/storage'
import Modal from '../components/Modal'
import { useAuth } from '../contexts/AuthContext'
import postsData from '../data/posts.json'

const Forum = () => {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Загружаем посты из localStorage или используем мок-данные
    const savedPosts = storage.get(STORAGE_KEYS.POSTS)
    if (savedPosts && savedPosts.length > 0) {
      setPosts(savedPosts)
    } else {
      setPosts(postsData)
      storage.set(STORAGE_KEYS.POSTS, postsData)
    }
  }, [])

  const categories = ['all', 'Dog Care', 'Cat Care', 'Bird Care', 'Fish Care']

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handlePost = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newPost = {
      id: Date.now(),
      title: formData.get('title'),
      category: formData.get('category'),
      content: formData.get('content'),
      author: user?.name || 'Anonymous',
      authorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=60',
      timeAgo: 'just now',
      createdAt: new Date().toISOString(),
    }

    const updatedPosts = [newPost, ...posts]
    setPosts(updatedPosts)
    storage.set(STORAGE_KEYS.POSTS, updatedPosts)

    setShowToast(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setShowToast(false)
      e.target.reset()
    }, 900)
  }

  const handleViewPost = (post) => {
    setSelectedPost(post)
    setViewModalOpen(true)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-extrabold">Forum Discussions</h1>
            {user && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-bold text-white shadow hover:bg-blue-600 transition"
              >
                Start New Discussion
              </button>
            )}
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No posts found</p>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => handleViewPost(post)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex gap-4">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={post.authorAvatar}
                      alt={`${post.author} profile`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-extrabold">{post.title}</h3>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-semibold">
                        by {post.author} • {post.timeAgo}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">{post.content}</p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5">
            <h3 className="font-extrabold mb-3">Categories</h3>
            <ul className="text-sm font-semibold text-gray-700 space-y-2">
              {categories.slice(1).map((cat) => (
                <li
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer hover:text-blue-600 ${
                    selectedCategory === cat ? 'text-blue-600' : ''
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-extrabold mb-3">Upcoming Events</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <span className="font-semibold">Pet Adoption Fair</span> — Oct 20
              </li>
              <li>
                <span className="font-semibold">Dog Training Workshop</span> — Oct 25
              </li>
              <li>
                <span className="font-semibold">Cat Grooming Tips Webinar</span> — Nov 1
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Create Post Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handlePost}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold">New Discussion</h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-700 font-bold"
            >
              ✕
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <input
              name="title"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Title"
              required
            />
            <select
              name="category"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select category</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <textarea
              name="content"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              rows="5"
              placeholder="Write your post..."
              required
            />
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl px-5 py-2 text-sm font-bold border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-bold text-white shadow hover:bg-blue-600"
            >
              Post
            </button>
          </div>
          {showToast && (
            <p className="mt-4 text-sm font-semibold text-green-600">Posted successfully!</p>
          )}
        </form>
      </Modal>

      {/* View Post Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)}>
        {selectedPost && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold">{selectedPost.title}</h3>
              <button
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={selectedPost.authorAvatar}
                alt={`${selectedPost.author} profile`}
              />
              <div>
                <p className="font-semibold text-sm">{selectedPost.author}</p>
                <p className="text-xs text-gray-500">{selectedPost.timeAgo}</p>
              </div>
              <span className="ml-auto text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                {selectedPost.category}
              </span>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
            </div>
          </>
        )}
      </Modal>
    </main>
  )
}

export default Forum
