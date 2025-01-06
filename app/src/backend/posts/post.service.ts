import { Post } from "./post.model";
import { ICreatePostDto, IUpdatePostDto } from "./post.type";
import { PostErrorCode, ERROR_DEFINITIONS } from "./post.error";
import { IPost, IPopulatedPost } from "./post.type";
import { getMinimalProfile } from "../profiles/profile.service";
import { parsePost, parsePopulatedPost } from "./post.lib";
import { connectDB } from "../database/connection";

export const createPost = async (
  createPostDto: ICreatePostDto
): Promise<IPost> => {
  connectDB();
  const post = new Post(createPostDto);
  const savedPost = await post.save();
  return parsePost(savedPost);
};

export const getPostById = async (
  postId: string,
  populate: boolean = false
): Promise<IPost | IPopulatedPost> => {
  connectDB();
  const query = Post.findById(postId);

  if (populate) {
    const populatedPost = await query.populate({
      path: "profileId",
      select: "_id handle name avatar",
      model: "Profile",
    });

    if (!populatedPost) {
      throw new Error(ERROR_DEFINITIONS[PostErrorCode.NOT_FOUND].message);
    }
    return parsePopulatedPost(populatedPost);
  }

  const post = await query;
  if (!post) {
    throw new Error(ERROR_DEFINITIONS[PostErrorCode.NOT_FOUND].message);
  }
  return parsePost(post);
};

export const updatePost = async (
  postId: string,
  updatePostDto: IUpdatePostDto
): Promise<IPost> => {
  connectDB();
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $set: updatePostDto },
    { new: true, runValidators: true }
  );

  if (!updatedPost) {
    throw new Error(ERROR_DEFINITIONS[PostErrorCode.NOT_FOUND].message);
  }

  return parsePost(updatedPost);
};

export const getPostsByHandle = async (
  handle: string,
  populate: boolean = false,
  limit: number = 10,
  offset: number = 0
): Promise<{
  posts: Array<IPost | IPopulatedPost>;
  total: number;
}> => {
  connectDB();
  const profile = await getMinimalProfile(handle);
  const profileId = profile?._id;

  const query = Post.find({ profileId })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  if (populate) {
    const [posts, total] = await Promise.all([
      query.populate({
        path: "profileId",
        select: "_id handle name avatar",
        model: "Profile",
      }),
      Post.countDocuments({ profileId }),
    ]);

    return {
      posts: posts.map((post) => parsePopulatedPost(post)),
      total,
    };
  }

  const [posts, total] = await Promise.all([
    query,
    Post.countDocuments({ profileId }),
  ]);

  return {
    posts: posts.map(parsePost),
    total,
  };
};

export const getAllPosts = async (
  populate: boolean = false,
  limit: number = 10,
  offset: number = 0
): Promise<{
  posts: Array<IPost | IPopulatedPost>;
  total: number;
}> => {
  connectDB();
  const query = Post.find().sort({ createdAt: -1 }).skip(offset).limit(limit);

  if (populate) {
    const [posts, total] = await Promise.all([
      query.populate({
        path: "profileId",
        select: "_id handle name avatar",
        model: "Profile",
      }),
      Post.countDocuments(),
    ]);

    return {
      posts: posts.map((post) => parsePopulatedPost(post)),
      total,
    };
  }

  const [posts, total] = await Promise.all([query, Post.countDocuments()]);

  return {
    posts: posts.map(parsePost),
    total,
  };
};
