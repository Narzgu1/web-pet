export default function LostFoundHeader({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, onAddPet }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Lost & Found Pets</h1>
            <p className="text-gray-600 mt-1">Help reunite pets with their families</p>
          </div>
          <button 
            onClick={onAddPet}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap"
          >
            + Report Pet
          </button>
        </div>
  
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by breed, location, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>
  
        {/* Status Filter */}
        <div className="flex gap-3">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('Lost')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === 'Lost'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lost
          </button>
          <button
            onClick={() => setStatusFilter('Found')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === 'Found'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Found
          </button>
        </div>
      </div>
    );
  }