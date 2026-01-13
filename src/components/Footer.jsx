const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-gray-500">
          <a href="#" className="hover:text-blue-600">Contact Us</a>
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms of Service</a>
        </div>
        <div className="flex items-center gap-4 text-gray-400 text-lg">
          <a href="#" className="hover:text-pink-500 transition" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-blue-600 transition" aria-label="Facebook">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-gray-900 transition" aria-label="TikTok">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          <a href="#" className="hover:text-sky-500 transition" aria-label="Telegram">
            <i className="fa-brands fa-telegram"></i>
          </a>
        </div>
        <div className="text-sm text-gray-400">© 2026 PetCareHub</div>
      </div>
    </footer>
  )
}

export default Footer

