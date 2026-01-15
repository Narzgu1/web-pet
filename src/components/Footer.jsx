import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/contact" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Contact Us
            </Link>
            <Link to="/privacy" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
              <i className="fab fa-tiktok text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
              <i className="fab fa-telegram text-xl"></i>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400 font-medium">
            © 2026 PetCareHub
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;