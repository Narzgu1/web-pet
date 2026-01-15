import { useState, useEffect } from 'react';
import LostFoundHeader from '../components/lostfound/LostFoundHeader';
import PetCard from '../components/lostfound/PetCard';
import AddPetForm from '../components/lostfound/AddPetForm';
import initialPets from '../data/pets.json';

export default function LostFound() {
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  // Загружаем данные из localStorage или используем начальные
  useEffect(() => {
    const savedPets = localStorage.getItem('lostFoundPets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    } else {
      setPets(initialPets);
    }
  }, []);

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    if (pets.length > 0) {
      localStorage.setItem('lostFoundPets', JSON.stringify(pets));
    }
  }, [pets]);

  // Фильтрация по статусу и поиску
  const filteredPets = pets.filter(pet => {
    const matchesStatus = statusFilter === 'All' || pet.status === statusFilter;
    const matchesSearch = 
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleAddPet = (newPet) => {
    setPets([newPet, ...pets]);
    setShowAddForm(false);
  };

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <LostFoundHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onAddPet={() => setShowAddForm(true)}
        />

        {/* Форма добавления */}
        {showAddForm && (
          <AddPetForm 
            onAddPet={handleAddPet}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map(pet => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                onClick={handlePetClick}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No pets found matching your criteria
            </div>
          )}
        </div>

        {/* Модальное окно (опционально, добавим позже) */}
        {selectedPet && (
          <PetModal 
            pet={selectedPet}
            onClose={() => setSelectedPet(null)}
          />
        )}
      </div>
    </div>
  );
}

// Простая модалка для просмотра деталей
function PetModal({ pet, onClose }) {
  const statusColor = pet.status === 'Lost' 
    ? 'bg-red-100 text-red-700 border-red-200' 
    : 'bg-green-100 text-green-700 border-green-200';

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-64 bg-gray-200">
          <img 
            src={pet.image} 
            alt={pet.breed}
            className="w-full h-full object-cover"
          />
          <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold border ${statusColor}`}>
            {pet.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{pet.breed}</h2>
            <p className="text-gray-600">{pet.type}</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600">{pet.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-xl">📅</span>
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">{pet.date}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{pet.description}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
            <p className="text-gray-700">{pet.contactName}</p>
            {pet.contactPhone && (
              <p className="text-blue-600">{pet.contactPhone}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50">
          <button 
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}