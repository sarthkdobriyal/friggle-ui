import { adminApi } from "@/services/adminApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import type { User } from '@/types';

// Video type definition
type Video = {
  _id: string;
  video_url: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  userId: {
    _id: string;
    email: string;
  };
};

interface VideosProps {
  selectedUser?: User | null;
}

function Videos({ selectedUser }: VideosProps) {
  const { data: videos, isLoading, error } = useQuery<Video[]>({
    queryKey: ['admin-videos'],
    queryFn: () => adminApi.getAllVideos(),
  });

  // Extract unique users for filter dropdown
  const users = useMemo(() => {
    if (!videos) return [];
    const emails = videos.map((v) => v.userId?.email).filter(Boolean);
    const uniqueEmails = Array.from(new Set(emails));
    // Ensure selectedUser email is present
    if (selectedUser?.email && !uniqueEmails.includes(selectedUser.email)) {
      uniqueEmails.push(selectedUser.email);
    }
    return uniqueEmails;
  }, [videos, selectedUser]);

  // Filter state
  const [userFilter, setUserFilter] = useState<string>("");

  // Automatically select user if selectedUser changes
  useEffect(() => {
    if (selectedUser?.email) {
      setUserFilter(selectedUser.email);
    }
  }, [selectedUser]);

  // Filter videos by selected user
  const filteredVideos = useMemo(() => {
    if (!videos) return [];
    if (!userFilter) return videos;
    return videos.filter((v) => v.userId?.email === userFilter);
  }, [videos, userFilter]);

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading videos</div>;

  return (
    <div className="px-6 py-8">
      {/* Heading and filter row */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">All Videos</h2>
        <div>
          <label className="text-sm font-medium mr-2">Sort by user:</label>
          <select
            className="border rounded px-2 py-1"
            value={userFilter}
            onChange={e => setUserFilter(e.target.value)}
          >
            <option value="">All Users</option>
            {users.map(email => (
              <option key={email} value={email}>{email}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Videos grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video._id} className="border rounded-lg p-4 shadow-sm bg-white">
            <video
              src={video.video_url}
              controls
              className="w-full h-48 object-cover rounded"
            />
            <div className="mt-4">
              <div className="text-sm text-gray-700">
                <strong>Prompt:</strong> {video.prompt}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <strong>User:</strong> {video.userId?.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;