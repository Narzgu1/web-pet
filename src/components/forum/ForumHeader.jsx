export default function ForumHeader({ searchQuery, setSearchQuery, onCreatePost }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Community Forum</h1>
            <p className="text-gray-600 mt-1">Share experiences and ask questions</p>
          </div>
          <button 
            onClick={onCreatePost}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap"
          >
            + Create Post
          </button>
        </div>
  
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>
      </div>
    );
  }