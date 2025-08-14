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
  },
  deleteUser: async (userId: string) => {
    const response = await authClient.delete('/admin/user', { data: { userId } });
    return response.data;
  },
  toggleUserActive: async (userId: string) => {
    const response = await authClient.patch('/admin/user/toggleActive', { userId });
    return response.data;
  },
  toggleUserAdmin: async (userId: string) => {
    const response = await authClient.patch('/admin/user/toggleAdmin', { userId });
    return response.data;
  }
};