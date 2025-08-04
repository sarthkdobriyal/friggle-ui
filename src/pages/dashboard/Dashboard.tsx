import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Play } from 'lucide-react';
import { videoApi } from '@/services/videoApi';
import type { Video } from '@/types';

const Dashboard: React.FC = () => {
  const { data: recentVideos, isLoading: isLoadingRecent, error: recentError } = useQuery({
    queryKey: ['recentVideos'],
    queryFn: () => videoApi.getRecentVideos(),
  });

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
            <p className="text-3xl font-bold text-blue-600">{recentVideos?.length || 0}</p>
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
          <div className=" ">
            <div className="p-4">
              {isLoadingRecent ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-2"></div>
                  <p className="text-gray-400 text-sm">Loading videos...</p>
                </div>
              ) : recentError ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">Failed to load recent videos</p>
                </div>
              ) : recentVideos && recentVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {recentVideos.slice(0, 8).map((video: Video) => (
                    <div key={video.id} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded mb-2 relative overflow-hidden">
                        {video.video_url ? (
                          <video
                            src={video.video_url}
                            className="w-full h-full object-cover rounded"
                            controls
                            preload="metadata"
                            poster={video.thumbnailUrl}
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover rounded" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="h-6 w-6 text-purple-400" />
                          </div>
                        )}
                      </div>
                      <p className="text-white text-sm font-medium mb-1 truncate" title={video.title || video.prompt}>
                        {video.title || video.prompt?.substring(0, 25) + '...' || 'Untitled Video'}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : 'Recently created'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300">No videos created yet. Start creating your first AI video!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
