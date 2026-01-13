import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import facilitiesData from '../data/facilities.json'
import Modal from '../components/Modal'

// Fix for default marker icons in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
})

const Facilities = () => {
  const [selectedFacility, setSelectedFacility] = useState(facilitiesData[0])
  const [filters, setFilters] = useState({
    veterinarian: true,
    petShops: false,
    parks: true,
  })
  const [facilities, setFacilities] = useState(facilitiesData)
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    // Убеждаемся, что Leaflet загружен
    if (typeof window !== 'undefined') {
      setIsMapReady(true)
    }
  }, [])

  const handleFilterChange = (filter) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter],
    })
  }

  const filteredFacilities = facilities.filter((facility) => {
    if (filters.veterinarian && facility.type === 'Veterinarian') return true
    if (filters.petShops && facility.type === 'Pet Shop') return true
    if (filters.parks && facility.type === 'Park') return true
    return false
  })

  const handleMarkerClick = (facility) => {
    setSelectedFacility(facility)
    setInfoModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-64 bg-white border-r p-6 hidden md:block overflow-y-auto">
          <h2 className="font-extrabold text-lg mb-6">Filter Facilities</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.veterinarian}
                onChange={() => handleFilterChange('veterinarian')}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600">
                Veterinarian Clinics
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.petShops}
                onChange={() => handleFilterChange('petShops')}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600">Pet Shops</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.parks}
                onChange={() => handleFilterChange('parks')}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600">Parks</span>
            </label>
          </div>
          <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition shadow-md">
            Apply Filters
          </button>
        </aside>

        {/* Map Area */}
        <main className="flex-1 relative bg-gray-200">
          {isMapReady ? (
            <MapContainer
              center={[50.4501, 30.5234]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredFacilities.map((facility) => (
                <Marker
                  key={facility.id}
                  position={[facility.lat, facility.lng]}
                  eventHandlers={{
                    click: () => handleMarkerClick(facility),
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{facility.name}</h3>
                      <p className="text-sm text-gray-600">{facility.type}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading map...</p>
            </div>
          )}
        </main>

        {/* Info Panel */}
        <aside className="w-80 bg-white border-l p-6 hidden lg:block overflow-y-auto">
          <h2 className="font-extrabold text-lg mb-6">Facility Information</h2>

          <div className="rounded-2xl border border-gray-100 p-5 shadow-sm bg-gray-50">
            <h3 className="font-extrabold text-xl">{selectedFacility.name}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">{selectedFacility.description}</p>
            <div className="mt-4 flex items-center gap-1 text-orange-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(selectedFacility.rating) ? '★' : '☆'}</span>
              ))}
              <span className="text-xs text-gray-500 font-bold ml-2">
                {selectedFacility.rating} ({selectedFacility.reviews} reviews)
              </span>
            </div>
            <button className="w-full mt-6 bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition">
              Get Directions
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <button className="w-full border-2 border-dashed border-gray-200 text-gray-400 font-bold py-4 rounded-2xl hover:border-blue-300 hover:text-blue-400 transition">
              + Add New Location
            </button>
          </div>
        </aside>
      </div>

      {/* Facility Info Modal */}
      <Modal isOpen={infoModalOpen} onClose={() => setInfoModalOpen(false)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold">{selectedFacility.name}</h3>
          <button
            onClick={() => setInfoModalOpen(false)}
            className="text-gray-400 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Type</p>
            <p className="text-sm font-semibold">{selectedFacility.type}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Description</p>
            <p className="text-sm text-gray-700">{selectedFacility.description}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Rating</p>
            <div className="flex items-center gap-1 text-orange-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(selectedFacility.rating) ? '★' : '☆'}</span>
              ))}
              <span className="text-xs text-gray-500 font-bold ml-2">
                {selectedFacility.rating} ({selectedFacility.reviews} reviews)
              </span>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition">
            Get Directions
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Facilities
