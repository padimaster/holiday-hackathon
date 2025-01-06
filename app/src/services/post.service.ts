import axios from "axios";

interface PostQueryParams {
  populate?: boolean;
  limit?: number;
  offset?: number;
  handle?: string;
}

const BASE_URL = "/api/posts";

export const getAllPosts = async (params: PostQueryParams = {}) => {
  const response = await axios.get(BASE_URL, { params });
  return response.data;
};

export const getPostsByHandle = async (
  handle: string,
  params: Omit<PostQueryParams, "handle"> = {}
) => {
  const response = await axios.get(BASE_URL, {
    params: {
      ...params,
      handle,
    },
  });
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPost = async (data: any) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};
