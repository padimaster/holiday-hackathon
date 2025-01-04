export type Post = {
  id: string;
  content: string;
  imageUrl?: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    address: string;
  };
  createdAt: Date;
  likes: number;
  reposts: number;
  replies: number;
};
