export default function FacilityCard({ facility, isSelected, onClick }) {
    const typeColors = {
      'Veterinary': 'bg-red-100 text-red-700',
      'Pet Store': 'bg-blue-100 text-blue-700',
      'Park': 'bg-green-100 text-green-700',
      'Grooming': 'bg-purple-100 text-purple-700'
    };
  
    return (
      <div 
        onClick={() => onClick(facility)}
        className={`p-4 rounded-lg border-2 transition-all cursor-pointer mb-3 ${
          isSelected 
            ? 'border-blue-500 bg-blue-50 shadow-md' 
            : 'border-transparent bg-white hover:border-gray-200 shadow-sm'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 leading-tight">{facility.name}</h3>
          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${typeColors[facility.type] || 'bg-gray-100'}`}>
            {facility.type}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            <span>📍</span> {facility.address}
          </p>
          <p className="flex items-center gap-2">
            <span>📞</span> {facility.phone}
          </p>
          <p className="flex items-center gap-2 text-xs italic">
            <span>🕒</span> {facility.hours}
          </p>
        </div>
      </div>
    );
  }