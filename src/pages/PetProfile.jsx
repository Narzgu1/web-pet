import { useState, useEffect } from 'react'
import { storage, STORAGE_KEYS } from '../lib/storage'
import Modal from '../components/Modal'
import petsData from '../data/pets.json'

const PetProfile = () => {
  const [selectedPet, setSelectedPet] = useState(null)
  const [pets, setPets] = useState([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false)
  const [vaccinationStatus, setVaccinationStatus] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [visitForm, setVisitForm] = useState({
    date: '',
    reason: '',
    notes: '',
  })
  const [vetVisits, setVetVisits] = useState([])

  useEffect(() => {
    const savedPets = storage.get(STORAGE_KEYS.PETS)
    if (savedPets && savedPets.length > 0) {
      setPets(savedPets)
      setSelectedPet(savedPets[0])
    } else {
      setPets(petsData)
      setSelectedPet(petsData[0])
      storage.set(STORAGE_KEYS.PETS, petsData)
    }
  }, [])

  useEffect(() => {
    if (selectedPet) {
      setVaccinationStatus(selectedPet.vaccinationStatus || false)
      const savedVisits = storage.get(`petcarehub_visits_${selectedPet.id}`) || []
      setVetVisits(savedVisits)
    }
  }, [selectedPet])

  const handleToggle = (e) => {
    const newStatus = e.target.checked
    setVaccinationStatus(newStatus)
    if (selectedPet) {
      const updatedPets = pets.map((pet) =>
        pet.id === selectedPet.id ? { ...pet, vaccinationStatus: newStatus } : pet
      )
      setPets(updatedPets)
      setSelectedPet({ ...selectedPet, vaccinationStatus: newStatus })
      storage.set(STORAGE_KEYS.PETS, updatedPets)
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file && selectedPet) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedPets = pets.map((pet) =>
          pet.id === selectedPet.id ? { ...pet, avatar: reader.result } : pet
        )
        setPets(updatedPets)
        setSelectedPet({ ...selectedPet, avatar: reader.result })
        storage.set(STORAGE_KEYS.PETS, updatedPets)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEdit = () => {
    setEditForm({
      name: selectedPet.name,
      breed: selectedPet.breed,
      age: selectedPet.age,
      gender: selectedPet.gender,
    })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    if (selectedPet) {
      const updatedPets = pets.map((pet) =>
        pet.id === selectedPet.id ? { ...pet, ...editForm } : pet
      )
      setPets(updatedPets)
      setSelectedPet({ ...selectedPet, ...editForm })
      storage.set(STORAGE_KEYS.PETS, updatedPets)
      setIsEditModalOpen(false)
    }
  }

  const handleAddVisit = (e) => {
    e.preventDefault()
    const newVisit = {
      id: Date.now(),
      date: visitForm.date,
      reason: visitForm.reason,
      notes: visitForm.notes,
    }
    const updatedVisits = [newVisit, ...vetVisits]
    setVetVisits(updatedVisits)
    storage.set(`petcarehub_visits_${selectedPet.id}`, updatedVisits)
    setVisitForm({ date: '', reason: '', notes: '' })
    setIsVisitModalOpen(false)
  }

  const handleDeleteVisit = (visitId) => {
    const updatedVisits = vetVisits.filter((visit) => visit.id !== visitId)
    setVetVisits(updatedVisits)
    storage.set(`petcarehub_visits_${selectedPet.id}`, updatedVisits)
  }

  if (!selectedPet) return <div>Loading...</div>

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: My Pets */}
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold">My Pets</h2>
              <button className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition">
                Add New
              </button>
            </div>

            <div className="space-y-4">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  onClick={() => setSelectedPet(pet)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer ${
                    selectedPet.id === pet.id
                      ? 'bg-blue-50 border-blue-100'
                      : 'border-gray-50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={pet.avatar}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      alt={`${pet.name} the ${pet.type.toLowerCase()}`}
                    />
                    <div>
                      <p className="font-bold text-sm">{pet.name}</p>
                      <p className="text-xs text-gray-400">{pet.type}</p>
                    </div>
                  </div>
                  <button
                    className={`text-xs font-bold hover:text-blue-600 ${
                      selectedPet.id === pet.id ? 'text-blue-500' : 'text-gray-300'
                    }`}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content: Profile Details */}
        <section className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-extrabold">Pet Profile: {selectedPet.name}</h1>
              <div className="flex gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <span className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold transition">
                    Change Avatar
                  </span>
                </label>
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Details Card */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-extrabold text-lg mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-semibold">Breed:</span>
                    <span className="font-bold">{selectedPet.breed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-semibold">Age:</span>
                    <span className="font-bold">{selectedPet.age}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-semibold">Gender:</span>
                    <span className="font-bold">{selectedPet.gender}</span>
                  </div>
                </div>
              </div>

              {/* Health Records Card */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-extrabold text-lg mb-4">Health Records</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400 font-semibold">Vaccination Status:</span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold ${
                        vaccinationStatus ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      {vaccinationStatus ? 'Up to date' : 'Needs update'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vaccinationStatus}
                        onChange={handleToggle}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-semibold">Last Vet Visit:</span>
                  <span className="font-bold">
                    {vetVisits.length > 0 ? vetVisits[0].date : selectedPet.lastVetVisit}
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="mt-8">
              <h3 className="font-extrabold text-lg mb-4">Photo Gallery</h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {selectedPet.photos?.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    className="w-24 h-24 rounded-2xl object-cover shadow-sm border-2 border-white"
                    alt={`${selectedPet.name} photo ${index + 1}`}
                  />
                ))}
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 cursor-pointer hover:border-blue-300 hover:text-blue-300 transition">
                  <span className="text-2xl">+</span>
                </div>
              </div>
            </div>

            {/* Vet Visits History */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-lg">Vet Visits History</h3>
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition"
                >
                  Add Visit
                </button>
              </div>
              {vetVisits.length === 0 ? (
                <p className="text-sm text-gray-500">No visits recorded yet</p>
              ) : (
                <div className="space-y-3">
                  {vetVisits.map((visit) => (
                    <div
                      key={visit.id}
                      className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-sm">{visit.reason}</p>
                        <p className="text-xs text-gray-500">{visit.date}</p>
                        {visit.notes && <p className="text-xs text-gray-600 mt-1">{visit.notes}</p>}
                      </div>
                      <button
                        onClick={() => handleDeleteVisit(visit.id)}
                        className="text-red-500 hover:text-red-600 text-sm font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reminders */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-extrabold text-lg mb-4">Reminders</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-semibold">Next Vet Visit:</span>
                  <span className="font-bold text-blue-600">{selectedPet.nextVetVisit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-semibold">Annual Vaccinations:</span>
                  <span className="font-bold text-red-500">{selectedPet.annualVaccinations}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <form onSubmit={handleSaveEdit}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold">Edit Pet Profile</h3>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-700 font-bold"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={editForm.name || ''}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Breed</label>
              <input
                type="text"
                value={editForm.breed || ''}
                onChange={(e) => setEditForm({ ...editForm, breed: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
              <input
                type="text"
                value={editForm.age || ''}
                onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select
                value={editForm.gender || ''}
                onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="rounded-xl px-5 py-2 text-sm font-bold border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-bold text-white shadow hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Visit Modal */}
      <Modal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)}>
        <form onSubmit={handleAddVisit}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold">Add Vet Visit</h3>
            <button
              type="button"
              onClick={() => setIsVisitModalOpen(false)}
              className="text-gray-400 hover:text-gray-700 font-bold"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={visitForm.date}
                onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Reason</label>
              <input
                type="text"
                value={visitForm.reason}
                onChange={(e) => setVisitForm({ ...visitForm, reason: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Annual checkup"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
              <textarea
                value={visitForm.notes}
                onChange={(e) => setVisitForm({ ...visitForm, notes: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
                placeholder="Additional notes..."
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsVisitModalOpen(false)}
              className="rounded-xl px-5 py-2 text-sm font-bold border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-bold text-white shadow hover:bg-blue-600"
            >
              Add Visit
            </button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default PetProfile
