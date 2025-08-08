import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router'
import { Video } from 'lucide-react'

interface HeaderProps {
  onMenuToggle: () => void
}

function Header({ onMenuToggle }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-col ml-2 md:ml-8">

          
           <Link to="/dashboard" className="flex items-center space-x-2">
            <Video className="h-4 w-4 md:h-8 md:w-8 text-purple-400" />
            <span className="text-base md:text-2xl font-bold text-gray-900">Friggle.ai</span>
          </Link>
          <h1 className="ml-1 md:ml-10 mt-1 text-xs md:text-sm font-normal text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-700">
            Welcome, <span className="font-medium">{user?.name || 'Admin'}</span>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
