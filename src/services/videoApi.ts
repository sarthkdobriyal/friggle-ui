import { authClient } from "@/utils/api-client";

// Video generation API
export const videoApi = {
  generateVideo: async (prompt: string) => {
    const response = await authClient.post('/video/generate', { prompt });
    return response.data;
  },
  getRecentVideos: async () => {
    const response = await authClient.get('/video/recent');
    return response.data;
  },
  getAllVideos: async () => {
    const response = await authClient.get('/video/all');
    return response.data;
  }
};