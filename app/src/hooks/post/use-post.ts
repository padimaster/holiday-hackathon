import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import {
  ICreatePostDto,
  IPost,
  IPopulatedPost,
  IUpdatePostDto,
} from "@/backend/posts";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

interface UsePostsOptions {
  populate?: boolean;
  limit?: number;
  handle?: string;
  enabled?: boolean;
}

interface PostsResponse {
  posts: Array<IPost | IPopulatedPost>;
  total: number;
}

export const usePosts = (options: UsePostsOptions = {}) => {
  const { populate = false, limit = 10, handle, enabled = true } = options;

  return useInfiniteQuery<PostsResponse, Error>({
    queryKey: ["posts", { populate, limit, handle }],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        populate: String(populate),
        limit: String(limit),
        offset: String(pageParam),
        ...(handle && { handle }),
      });

      const { data } = await api.get(`/posts?${params}`);
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const offset = allPages.length * limit;
      return offset < lastPage.total ? offset : undefined;
    },
    enabled,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<IPost, Error, ICreatePostDto>({
    mutationFn: async (newPost) => {
      const { data } = await api.post("/posts", newPost);
      return data;
    },
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["post", newPost._id], newPost);
    },
  });
};

export const useUpdatePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<IPost, Error, IUpdatePostDto>({
    mutationFn: async (updateData) => {
      const { data } = await api.patch(`/posts/${postId}`, updateData);
      return data;
    },
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["post", postId], updatedPost);
    },
  });
};
