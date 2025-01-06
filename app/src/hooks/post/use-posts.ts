import { useInfiniteQuery } from "@tanstack/react-query";
import { IPost } from "@/backend/posts";
import { getAllPosts, getPostsByHandle } from "@/services/post.service";
import { useCallback, useState } from "react";

interface PostsQueryOptions {
  limit?: number;
  enabled?: boolean;
  populate?: boolean;
}

interface PostsResponse {
  data: IPost[];
  total: number;
}

// Hook for fetching all posts
export const useAllPosts = (options: PostsQueryOptions = {}) => {
  const { limit = 10, enabled = true, populate = false } = options;

  return useInfiniteQuery<PostsResponse, Error>({
    queryKey: ["posts", "all", { limit, populate }],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const data = await getAllPosts({
          limit,
          offset: pageParam,
          populate,
        });
        return data;
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error("Failed to fetch posts");
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const offset = allPages.length * limit;
      return offset < lastPage.total ? offset : undefined;
    },
    enabled,
  });
};

export const useUserPosts = (
  handle: string,
  options: PostsQueryOptions = {}
) => {
  const { limit = 10, enabled = true, populate = false } = options;

  return useInfiniteQuery<PostsResponse, Error>({
    queryKey: ["posts", "user", handle, { limit, populate }],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        return await getPostsByHandle(handle, {
          limit,
          offset: pageParam,
          populate,
        });
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error(`Failed to fetch posts for user: ${handle}`);
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const offset = allPages.length * limit;
      return offset < lastPage.total ? offset : undefined;
    },
    enabled: enabled && Boolean(handle),
  });
};

// Helper function to flatten pages
export const flattenPosts = (pages?: PostsResponse[]) => {
  if (!pages) return [];
  return pages.reduce<IPost[]>((acc, page) => [...acc, ...page.data], []);
};

// Hook for posts pagination state
export const usePostsPagination = () => {
  const defaultState = {
    page: 0,
    limit: 10,
    hasMore: true,
  };

  const [state, setState] = useState(defaultState);

  const loadMore = useCallback(() => {
    setState((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  return {
    ...state,
    loadMore,
    reset,
  };
};
