import { authClient, unauthClient } from "@/utils/api-client";

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
  },
  enhancePrompt: async (userInput: string) => {
    const response = await authClient.post('/video/enhancePrompt', { userInput });
    return response.data;
  },
  getExampleVideos: async () => {
    const response = await unauthClient.get('/video/examples');
    return response.data;
  }
};