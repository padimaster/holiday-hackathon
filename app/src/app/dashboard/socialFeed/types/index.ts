export interface TrendingItemProps {
  category: string;
  hashtag: string;
  subtitle: string;
  promotedBy?: string;
  showMoreIcon?: boolean;
}

export interface SocialPostProps {
  avatar: string;
  username: string;
  handle: string;
  timestamp: string;
  content: string;
  isVerified: boolean;
  metrics: {
    replies: number;
    reposts: number;
    likes: number;
    views: number;
  };
  media?: {
    image?: string;
    title?: string;
    description?: string;
    url?: string;
  };
}

export interface NavigationItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}
