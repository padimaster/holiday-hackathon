import { IPopulatedPostDB, IPostDB } from "./post.model";
import { IPopulatedPost, IPost } from "./post.type";

export const parsePost = (post: IPostDB): IPost => ({
  _id: post.id.toString(),
  title: post.title,
  content: post.content,
  profileId: post.profileId.toString(),
  imageUrl: post.imageUrl,
  tags: post.tags,
  createdAt: post.createdAt.toISOString(),
  engagement: {
    likes: post.likes,
    redrops: post.redrops,
    replies: post.replies,
  },
});

export const parsePopulatedPost = (
  post: IPopulatedPostDB
): IPopulatedPost => ({
  _id: post.id.toString(),
  title: post.title,
  content: post.content,
  imageUrl: post.imageUrl,
  tags: post.tags,
  createdAt: post.createdAt.toISOString(),
  engagement: {
    likes: post.likes,
    redrops: post.redrops,
    replies: post.replies,
  },
  profile: {
    _id: post.profile._id.toString(),
    handle: post.profile.handle,
    name: post.profile.name,
    avatar: post.profile.avatar,
  },
});
