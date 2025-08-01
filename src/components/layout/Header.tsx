import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Video } from 'lucide-react';

interface HeaderProps {
  isAuthenticated?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`bg-black/10 backdrop-blur-lg `}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">Friggle.ai</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!isAuthenticated  ? (
                // Public navigation
                <>
                  <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </Link>
                  <Link to="/make-videos" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Make Videos
                  </Link>
                  <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    About Us
                  </Link>
                  <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link to={ isAuthenticated ?  "/dashboard" : "/register"} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  </Link>
                </>
              ) : (
                // Authenticated navigation
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link to="/generate-videos" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Make Videos
                  </Link>
                  <Link to="/credits" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Credits
                  </Link>
                  <Link to="/payment" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Payment
                  </Link>
                  
                  {/* User menu */}
                  <div className="flex items-center space-x-4 ml-6">
                    <span className="text-sm text-gray-50">
                      Welcome, {user?.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
