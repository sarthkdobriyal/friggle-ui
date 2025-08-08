import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Video, Menu, X } from 'lucide-react';

interface HeaderProps {
  isAuthenticated?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header className={`bg-black/10 backdrop-blur-lg `}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">Friggle.ai</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex  items-center space-x-4">
              {!isAuthenticated  ? (
                // Public navigation
                <>
                  <Link to="/" className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActiveLink('/') 
                      ? 'text-white text-base' 
                      : 'text-gray-300 hover:text-white text-sm'
                  }`}>
                    Home
                  </Link>
                  <Link to="/make-videos" className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActiveLink('/make-videos') 
                      ? 'text-white text-base' 
                      : 'text-gray-300 hover:text-white text-sm'
                  }`}>
                    Make Videos
                  </Link>
                  <Link to="/about" className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActiveLink('/about') 
                      ? 'text-white text-base' 
                      : 'text-gray-300 hover:text-white text-sm'
                  }`}>
                    About Us
                  </Link>
                  <Link to="/login" className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActiveLink('/login') 
                      ? 'text-white text-base' 
                      : 'text-gray-300 hover:text-white text-sm'
                  }`}>
                    Login
                  </Link>
                  <Link to={ isAuthenticated ?  "/dashboard" : "/register"} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  </Link>
                </>
              ) : (
                // Authenticated navigation
                <>
                  <Link to="/dashboard" className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActiveLink('/dashboard') 
                      ? 'text-white text-base' 
                      : 'text-gray-300 hover:text-white text-sm'
                  }`}>
                    Dashboard
                  </Link>
                  <Link to="/generate-videos" className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActiveLink('/generate-videos') 
                      ? 'text-white text-base' 
                      : 'text-gray-300 hover:text-white text-sm'
                  }`}>
                    Make Videos
                  </Link>
                  <Link to="/credits" className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActiveLink('/credits') 
                      ? 'text-white text-base' 
                      : 'text-gray-300 hover:text-white text-sm'
                  }`}>
                    Credits
                  </Link>
                  <Link to="/payment" className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActiveLink('/payment') 
                      ? 'text-white text-base' 
                      : 'text-gray-300 hover:text-white text-sm'
                  }`}>
                    Payment
                  </Link>
                  
                  {/* User menu */}
                  <div className="flex items-center space-x-4 ml-24 ">
                    <span className="text-sm text-gray-50">
                      Welcome,
                      <span className='block justify-self-end'>
                       {user?.name}
                      </span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 text-red-400 hover:cursor-pointer hover:bg-red-400 hover:text-white px-3 py-2 border border-red-400 ml-4 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white p-2 rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-lg rounded-lg mt-2">
              {!isAuthenticated ? (
                // Public mobile navigation
                <>
                  <Link 
                    to="/" 
                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                      isActiveLink('/') 
                        ? 'text-white text-lg' 
                        : 'text-gray-300 hover:text-white text-base'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/make-videos" 
                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                      isActiveLink('/make-videos') 
                        ? 'text-white text-lg' 
                        : 'text-gray-300 hover:text-white text-base'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Make Videos
                  </Link>
                  <Link 
                    to="/about" 
                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                      isActiveLink('/about') 
                        ? 'text-white text-lg' 
                        : 'text-gray-300 hover:text-white text-base'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    to="/login" 
                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                      isActiveLink('/login') 
                        ? 'text-white text-lg' 
                        : 'text-gray-300 hover:text-white text-base'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to={isAuthenticated ? "/dashboard" : "/register"} 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white block px-3 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-center font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  </Link>
                </>
              ) : (
                // Authenticated mobile navigation
                <>
                  <div className="px-3 py-2 text-sm text-gray-50 border-b border-gray-600 mb-2">
                    Welcome, {user?.name}
                  </div>
                  <Link 
                    to="/dashboard" 
                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                      isActiveLink('/dashboard') 
                        ? 'text-white text-lg' 
                        : 'text-gray-300 hover:text-white text-base'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/generate-videos" 
                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                      isActiveLink('/generate-videos') 
                        ? 'text-white text-lg' 
                        : 'text-gray-300 hover:text-white text-base'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Make Videos
                  </Link>
                  <Link 
                    to="/credits" 
                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                      isActiveLink('/credits') 
                        ? 'text-white text-lg' 
                        : 'text-gray-300 hover:text-white text-base'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Credits
                  </Link>
                  <Link 
                    to="/payment" 
                    className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                      isActiveLink('/payment') 
                        ? 'text-white text-lg' 
                        : 'text-gray-300 hover:text-white text-base'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Payment
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-red-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
