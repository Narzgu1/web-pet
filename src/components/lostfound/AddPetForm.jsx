import { useState } from 'react';

export default function AddPetForm({ onAddPet, onCancel }) {
  const [formData, setFormData] = useState({
    status: 'Lost',
    type: 'Dog',
    breed: '',
    location: '',
    description: '',
    contactName: '',
    contactPhone: '',
    image: 'https://placehold.co/400x300?text=Pet+Photo'
  });

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.breed.trim() || !formData.location.trim() || !formData.contactName.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newPet = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };

    onAddPet(newPet);
    setFormData({
      status: 'Lost',
      type: 'Dog',
      breed: '',
      location: '',
      description: '',
      contactName: '',
      contactPhone: '',
      image: 'https://placehold.co/400x300?text=Pet+Photo'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-blue-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Report a Pet</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="status"
                value="Lost"
                checked={formData.status === 'Lost'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mr-2"
              />
              <span className="text-red-600 font-medium">Lost</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="status"
                value="Found"
                checked={formData.status === 'Found'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mr-2"
              />
              <span className="text-green-600 font-medium">Found</span>
            </label>
          </div>
        </div>

        {/* Pet Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pet Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {petTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Breed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breed / Description *
          </label>
          <input
            type="text"
            value={formData.breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Golden Retriever, Tabby Cat"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Central Park, New York"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Details
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Describe any distinctive features, behavior, or circumstances..."
          />
        </div>

        {/* Contact Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo URL (optional)
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/pet-photo.jpg"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Submit Report
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}