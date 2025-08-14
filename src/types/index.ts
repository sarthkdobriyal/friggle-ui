type Video = {
  id: string;
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
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



export type { Video, User };