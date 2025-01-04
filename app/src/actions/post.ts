"use server";

import { Post } from "@/types/post";

export async function createPost(formData: FormData) {
  // Create post
  uploadImage(formData.get("image") as File);
  return {
    success: true,
    error: "",
    data: formData,
  };
}

export async function getPosts() {
  try {
    return [
      {
        id: "1",
        content: "Example tech pill about web3",
        author: {
          address: "0x123",
          name: "Alice",
          handle: "alice",
          avatar: "https://avatars.dicebear.com/api/avataaars/alice.svg",
        },
        createdAt: new Date(),
        likes: 0,
        reposts: 0,
        replies: 0,
      },
      {
        id: "2",
        content: "Example tech pill about web3",
        author: {
          address: "0x123",
          name: "Alice",
          handle: "alice",
          avatar: "https://avatars.dicebear.com/api/avataaars/alice.svg",
        },
        createdAt: new Date(),
        likes: 0,
        reposts: 0,
        replies: 0,
      },
    ] as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function uploadImage(file: File): Promise<string> {
  // TODO: Upload image to IPFS
  return file.name;
}
