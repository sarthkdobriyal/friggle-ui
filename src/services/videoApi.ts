import { authClient } from "@/utils/api-client";

// Video generation API
export const videoApi = {
  generateVideo: async (prompt: string) => {
    const response = await authClient.post('/video/generate', { prompt });
    return response.data;
  }
};