
import { useAuth } from '@/context/AuthContext';
import React from 'react';

const Dashboard: React.FC = () => {

  
  const { user } = useAuth();

  console.log("User in dashboard:", user);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-300 mt-2">Welcome to your Friggle.ai dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Videos Created</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Credits Remaining</h3>
            <p className="text-3xl font-bold text-green-600">87</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">This Month</h3>
            <p className="text-3xl font-bold text-purple-600">5</p>
          </div>
        </div>

        {/* Recent Videos */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Videos</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
            <div className="p-6">
              <p className="text-gray-300">No videos created yet. Start creating your first AI video!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
