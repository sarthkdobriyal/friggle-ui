import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Credits: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Credits</h1>
          <p className="text-gray-600 mt-2">Manage your video generation credits</p>
        </div>
        
        {/* Current Credits */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Current Balance</h2>
              <p className="text-gray-600">Available credits for video generation</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-green-600">{user?.credits || 0}</p>
              <p className="text-sm text-gray-500">credits</p>
            </div>
          </div>
        </div>

        {/* Credit Packages */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Buy More Credits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Starter Pack</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">50</span>
                <span className="text-gray-600 ml-2">credits</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-4">$9.99</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Purchase
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Popular</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Pack</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">150</span>
                <span className="text-gray-600 ml-2">credits</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-4">$24.99</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Purchase
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">500</span>
                <span className="text-gray-600 ml-2">credits</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-4">$79.99</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Purchase
              </button>
            </div>
          </div>
        </div>

        {/* Usage History */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage History</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <p className="text-gray-500 text-center">No usage history yet. Start creating videos to see your usage!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
