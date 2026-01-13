import { useState, useEffect } from 'react'
import { storage, STORAGE_KEYS } from '../lib/storage'
import postsData from '../data/posts.json'
import lostFoundData from '../data/lostFound.json'

const Admin = () => {
  const [posts, setPosts] = useState([])
  const [lostFoundPosts, setLostFoundPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts') // 'posts', 'lostfound', 'stats'

  useEffect(() => {
    const savedPosts = storage.get(STORAGE_KEYS.POSTS) || postsData
    const savedLostFound = storage.get(STORAGE_KEYS.LOST_FOUND) || lostFoundData
    setPosts(savedPosts)
    setLostFoundPosts(savedLostFound)
  }, [])

  const handleApprove = (id, type) => {
    if (type === 'post') {
      const updated = posts.map((post) =>
        post.id === id ? { ...post, approved: true } : post
      )
      setPosts(updated)
      storage.set(STORAGE_KEYS.POSTS, updated)
    } else {
      const updated = lostFoundPosts.map((post) =>
        post.id === id ? { ...post, approved: true } : post
      )
      setLostFoundPosts(updated)
      storage.set(STORAGE_KEYS.LOST_FOUND, updated)
    }
  }

  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'post') {
        const updated = posts.filter((post) => post.id !== id)
        setPosts(updated)
        storage.set(STORAGE_KEYS.POSTS, updated)
      } else {
        const updated = lostFoundPosts.filter((post) => post.id !== id)
        setLostFoundPosts(updated)
        storage.set(STORAGE_KEYS.LOST_FOUND, updated)
      }
    }
  }

  const stats = {
    totalUsers: storage.get('petcarehub_users')?.length || 0,
    totalPosts: posts.length,
    approvedPosts: posts.filter((p) => p.approved).length,
    totalLostFound: lostFoundPosts.length,
    approvedLostFound: lostFoundPosts.filter((p) => p.approved).length,
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 flex-1 overflow-y-auto">
      <h1 className="text-3xl font-extrabold mb-8">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === 'posts'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Forum Posts
        </button>
        <button
          onClick={() => setActiveTab('lostfound')}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === 'lostfound'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Lost & Found
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 font-semibold transition ${
            activeTab === 'stats'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Statistics
        </button>
      </div>

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-extrabold text-lg mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-extrabold text-lg mb-2">Forum Posts</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalPosts}</p>
            <p className="text-sm text-gray-500 mt-1">
              {stats.approvedPosts} approved
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-extrabold text-lg mb-2">Lost & Found</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalLostFound}</p>
            <p className="text-sm text-gray-500 mt-1">
              {stats.approvedLostFound} approved
            </p>
          </div>
        </div>
      )}

      {/* Forum Posts Table */}
      {activeTab === 'posts' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold">{post.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{post.content}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">{post.author}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {post.approved ? (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">Approved</span>
                      ) : (
                        <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-1 rounded">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {!post.approved && (
                          <button
                            onClick={() => handleApprove(post.id, 'post')}
                            className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-bold transition"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(post.id, 'post')}
                          className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lost & Found Table */}
      {activeTab === 'lostfound' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Pet Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lostFoundPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.image}
                          alt={post.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <p className="text-sm font-semibold">{post.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded font-bold ${
                          post.status === 'Lost'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-green-50 text-green-600'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{post.location || 'Not specified'}</td>
                    <td className="px-6 py-4">
                      {post.approved ? (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">Approved</span>
                      ) : (
                        <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-1 rounded">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {!post.approved && (
                          <button
                            onClick={() => handleApprove(post.id, 'lostfound')}
                            className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-bold transition"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(post.id, 'lostfound')}
                          className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  )
}

export default Admin
