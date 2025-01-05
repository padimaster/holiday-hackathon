"use server";

import { prisma } from "@/lib/prisma/prisma";

export async function createPost(formData: FormData) {
  // Create post
  // const image = formData.get("image") as File;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const profileId = formData.get("profileId") as string;

  // Assuming uploadImage is a function that uploads the image and returns the URL
  // const imageUrl = await uploadImage(image);
  const imageUrl = "null";

  const post = await prisma.post.create({
    data: {
      title,
      content,
      profileId,
      imageUrl,
    },
  });

  return {
    success: true,
    error: "",
    data: post,
  };
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        profile: true,
      },
    });

    return posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      author: {
        address: post.profile.address,
        name: post.profile.name,
        handle: post.profile.handle,
        avatar: post.profile.avatar,
      },
      createdAt: post.createdAt,
      likes: 0, // Assuming likes are not yet implemented
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}