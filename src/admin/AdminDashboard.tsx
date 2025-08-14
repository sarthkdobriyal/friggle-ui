import  { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Siderbar'
import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/services/adminApi'
import Videos from './components/Videos'
import Users from './components/Users'
import type { User } from '@/types'


function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getStats(),
  });


  console.log('Admin Dashboard Stats:', stats);


  const handleSeeVideos = (user: User) => {
    setSelectedUser(user);
    setCurrentPage('videos');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'users':
        return <Users onSeeVideos={handleSeeVideos} />
      case 'videos':
        return <Videos selectedUser={selectedUser} />
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats?.map((stat : {
                title: string,
                value: number | string,
              }, index : number) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
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