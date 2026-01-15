export default function PetCard({ pet, onClick }) {
    const statusColor = pet.status === 'Lost' 
      ? 'bg-red-100 text-red-700 border-red-200' 
      : 'bg-green-100 text-green-700 border-green-200';
  
    return (
      <div 
        onClick={() => onClick(pet)}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-48 bg-gray-200">
          <img 
            src={pet.image} 
            alt={pet.breed}
            className="w-full h-full object-cover"
          />
          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold border ${statusColor}`}>
            {pet.status}
          </span>
        </div>
  
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-800">{pet.breed}</h3>
              <p className="text-sm text-gray-600">{pet.type}</p>
            </div>
          </div>
  
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{pet.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{pet.date}</span>
            </div>
          </div>
  
          <p className="mt-3 text-gray-700 text-sm line-clamp-2">
            {pet.description}
          </p>
        </div>
      </div>
    );
  }