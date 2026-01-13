import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      {/* Hero */}
      <header className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Welcome to PetCareHub</h1>
          <p className="mt-4 text-gray-500 text-lg">
            Connecting you with the pet community and resources you need
          </p>
          <div className="mt-8">
            <button className="rounded-xl bg-blue-500 px-8 py-3 text-white font-extrabold shadow hover:bg-blue-600 transition">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Cards */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/forum" className="group bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="mx-auto h-28 w-28 rounded-full bg-gray-100 overflow-hidden ring-4 ring-gray-50">
              <img
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=60"
                alt="Forum"
              />
            </div>
            <h3 className="mt-6 text-xl font-extrabold">Forum</h3>
            <p className="mt-2 text-sm text-gray-500">Join discussions and connect with other pet lovers.</p>
          </Link>

          <Link to="/pet-profile" className="group bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="mx-auto h-28 w-28 rounded-full bg-gray-100 overflow-hidden ring-4 ring-gray-50">
              <img
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=60"
                alt="Account"
              />
            </div>
            <h3 className="mt-6 text-xl font-extrabold">Personal Account</h3>
            <p className="mt-2 text-sm text-gray-500">Manage your pet's profile and settings.</p>
          </Link>

          <Link to="/facilities" className="group bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="mx-auto h-28 w-28 rounded-full bg-gray-100 overflow-hidden ring-4 ring-gray-50">
              <img
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                src="https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=400&q=60"
                alt="Map"
              />
            </div>
            <h3 className="mt-6 text-xl font-extrabold">Facilities Map</h3>
            <p className="mt-2 text-sm text-gray-500">Find pet-friendly facilities near you.</p>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/lost-found" className="group bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="mx-auto h-28 w-28 rounded-full bg-gray-100 overflow-hidden ring-4 ring-gray-50">
              <img
                className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                src="https://images.unsplash.com/photo-1591768793355-74d7cab738ff?auto=format&fit=crop&w=400&q=60"
                alt="Lost"
              />
            </div>
            <h3 className="mt-6 text-xl font-extrabold">Lost &amp; Found</h3>
            <p className="mt-2 text-sm text-gray-500">Report and find lost pets in your area.</p>
          </Link>

          <Link to="/admin" className="group bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="mx-auto h-28 w-28 rounded-full bg-blue-50 flex items-center justify-center text-4xl ring-4 ring-gray-50">
              🛠️
            </div>
            <h3 className="mt-6 text-xl font-extrabold">Admin Panel</h3>
            <p className="mt-2 text-sm text-gray-500">Moderate posts, manage facilities, handle user reports.</p>
          </Link>
        </div>
      </main>
    </>
  )
}

export default Home

