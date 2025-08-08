

interface SidebarProps {
  isOpen: boolean
  currentPage: string
  onPageChange: (page: string) => void
  onClose: () => void
}

function Sidebar({ isOpen, currentPage, onPageChange, onClose }: SidebarProps) {
  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: '📊' },
    { name: 'Users', id: 'users', icon: '👥' },
    { name: 'Videos', id: 'videos', icon: '🎥' }
  ]

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 h-screen`}>
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id)
                  onClose() // Close sidebar on mobile after selection
                }}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  )
}

export default Sidebar
