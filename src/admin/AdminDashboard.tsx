import React, { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Siderbar'

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const stats = [
    { title: 'Total Users', value: '1,234', icon: '👥' },
    { title: 'Total Videos', value: '567', icon: '🎥' },
    { title: 'Total Admins', value: '12', icon: '👑' },
    { title: 'Active Sessions', value: '89', icon: '🔴' }
  ]

  const renderContent = () => {
    switch (currentPage) {
      case 'users':
        return <div className="p-6"><h2 className="text-2xl font-bold">Users Management</h2></div>
      case 'videos':
        return <div className="p-6"><h2 className="text-2xl font-bold">Videos Management</h2></div>
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex h-screen">
        <Sidebar 
          isOpen={sidebarOpen}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard