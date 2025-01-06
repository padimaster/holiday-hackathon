import axios from "axios";
import { IPost, ICreatePostDto } from "@/backend/posts";

interface PostQueryParams {
  populate?: boolean;
  limit?: number;
  offset?: number;
  handle?: string;
}

interface PostsResponse {
  data: IPost[];
  total: number;
}

const BASE_URL = "http://localhost:3000/api/posts";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllPosts = async (
  params: PostQueryParams = {}
): Promise<PostsResponse> => {
  try {
    const { data } = await api.get<PostsResponse>(BASE_URL, {
      params: {
        populate: params.populate || false,
        limit: params.limit || 10,
        offset: params.offset || 0,
      },
    });
    console.log("post service:", data);
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to fetch posts");
    }
    throw error;
  }
};

export const getPostsByHandle = async (
  handle: string,
  params: Omit<PostQueryParams, "handle"> = {}
): Promise<PostsResponse> => {
  try {
    const { data } = await api.get<PostsResponse>(BASE_URL, {
      params: {
        handle,
        populate: params.populate || false,
        limit: params.limit || 10,
        offset: params.offset || 0,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error ||
          `Failed to fetch posts for handle: ${handle}`
      );
    }
    throw error;
  }
};

export const createPost = async (
  data: ICreatePostDto | FormData
): Promise<{ data: IPost; message: string }> => {
  try {
    const headers: Record<string, string> = {};

    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const { data: responseData } = await api.post(BASE_URL, data, { headers });
    return {
      data: responseData,
      message: "Post created successfully",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to create post");
    }
    throw error;
  }
};

// Helper function to validate and format query params
export const formatQueryParams = (params: PostQueryParams): PostQueryParams => {
  return {
    populate: Boolean(params.populate),
    limit: Math.max(1, Math.min(100, Number(params.limit) || 10)),
    offset: Math.max(0, Number(params.offset) || 0),
    ...(params.handle && { handle: params.handle }),
  };
};
