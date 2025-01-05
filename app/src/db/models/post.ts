import { Schema, model, models, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  createdAt: Date;
  profileId: Schema.Types.ObjectId;
  imageUrl?: string;
  tags?: string[];
  likes: number;
  redrops: number;
  replies: number;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  profileId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  imageUrl: { type: String, required: false },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
  redrops: { type: Number, default: 0 },
  replies: { type: Number, default: 0 },
});

export const Post = models.Post || model<IPost>('Post', postSchema);