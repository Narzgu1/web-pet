import { useState } from 'react';
import MapView from '../components/facilities/MapView';
import FacilityCard from '../components/facilities/FacilityCard';
import initialFacilities from '../data/facilities.json';

export default function Facilities() {
  const [facilities] = useState(initialFacilities);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFacility, setSelectedFacility] = useState(null);

  const types = ['All', 'Veterinary', 'Pet Store', 'Park', 'Grooming'];

  const filteredFacilities = facilities.filter(f => 
    selectedType === 'All' || f.type === selectedType
  );

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Header / Filters */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Facilities Map</h1>
            <p className="text-sm text-gray-600">Find the best places for your pet nearby</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 overflow-y-auto p-4 border-r bg-white">
          <div className="mb-4 text-sm text-gray-500">
            Found {filteredFacilities.length} locations
          </div>
          {filteredFacilities.map(facility => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              isSelected={selectedFacility?.id === facility.id}
              onClick={setSelectedFacility}
            />
          ))}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapView 
            facilities={filteredFacilities} 
            selectedFacility={selectedFacility} 
          />
        </div>
      </div>
    </div>
  );
}