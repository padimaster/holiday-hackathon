'use client'

import PostItem from "@/components/post/post-item";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePosts } from "@/hooks/post/use-post";
import { Skeleton } from "@/components/ui/skeleton";

export default function Posts() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8">
        <Alert className="bg-red-500/10 text-red-300 border-red-500/20">
          <AlertDescription>
            Failed to load posts. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="px-4 py-8">
        <Alert className="bg-purple-500/10 text-purple-300 border-purple-500/20">
          <AlertDescription>
            No tech pills yet. Be the first to share your knowledge!
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-800">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}
