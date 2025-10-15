type Video = {
  id: string;
  _id?: string;
  userId: string;
  video_url: string;
  thumbnailUrl?: string;
  title?: string;
  prompt?: string;
  createdAt?: string;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  credits: number;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  totalVideosGenerated: number;
  totalVideosGeneratedThisMonth: number;
}

type ErrorType = {
  message: string;
  code?: number;
}



export type { Video, User, ErrorType };