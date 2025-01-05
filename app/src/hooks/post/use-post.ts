import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IPost } from "@/db/models/post"; // Import the Mongoose interface

// Extend IPost for the populated profile data
export interface PopulatedPost extends Omit<IPost, "profileId"> {
  _id: string; // Ensure _id is always a string in frontend
  profileId: {
    _id: string;
    handle: string;
    name: string;
    avatar: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Export hooks directly
export function usePosts() {
  return useQuery<PopulatedPost[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<PopulatedPost[]>>(
        "/api/posts"
      );
      console.log(data);
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch posts");
      }
      return data.data || [];
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post<ApiResponse<PopulatedPost>>(
        "/api/posts",
        formData
      );
      if (!data.success) {
        throw new Error(data.error || "Failed to create post");
      }
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
