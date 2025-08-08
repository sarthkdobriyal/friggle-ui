import { authClient } from "@/utils/api-client";

// Admin API
export const adminApi = {
  getStats: async () => {
    const response = await authClient.get('/admin/stats');
    return response.data;
  },
  getAllUsers: async () => {
    const response = await authClient.get('/admin/allUsers');
    return response.data;
  },
  getAllVideos: async () => {
    const response = await authClient.get('/admin/allVideos');
    return response.data;
  }
};