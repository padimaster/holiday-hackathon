export interface Profile {
  handle: string;
  name: string;
  avatar: string;
  bio: string;
  location?: string;
  joinedDate: string;
  website?: string;
  following: number;
  followers: number;
  techScore: number;
  role?: string;
  organization?: string;
}
