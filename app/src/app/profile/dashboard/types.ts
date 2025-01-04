export interface TrendingItemProps {
  category: string;
  hashtag: string;
  subtext: string;
  promotedBy: string;
  pillCount?: string;
}

export interface ProfileStatsProps {
  following: number;
  followers: number;
}

export interface UserProfileProps {
  name: string;
  handle: string;
  location: string;
  joinDate: string;
  stats: ProfileStatsProps;
  techScore: number;
}

export interface NavigationItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

export interface PostProps {
  author: string;
  handle: string;
  timestamp: string;
  content: string;
  image: string;
  verified?: boolean;
}
