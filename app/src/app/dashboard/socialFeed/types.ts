export interface UserInfo {
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
}

export interface PostData {
  user: UserInfo;
  timestamp: string;
  content: string;
  imageUrl?: string;
  linkPreview?: {
    title: string;
    description: string;
    url: string;
    image?: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface TrendingTopic {
  category: string;
  hashtag: string;
  stats: string;
  promotedBy?: string;
}
