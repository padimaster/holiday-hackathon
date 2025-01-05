import { Schema, model, models, Document } from 'mongoose';

export interface IProfile extends Document {
  handle: string;
  address: string;
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

const profileSchema = new Schema<IProfile>({
  handle: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  bio: { type: String, required: true },
  location: String,
  joinedDate: { type: String, required: true },
  website: String,
  following: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  techScore: { type: Number, default: 0 },
  role: String,
  organization: String,
});

export const Profile = models.Profile || model<IProfile>('Profile', profileSchema);