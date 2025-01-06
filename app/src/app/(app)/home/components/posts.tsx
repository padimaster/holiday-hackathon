"use client";

import PostItem from "@/components/post/post-item";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { usePosts } from "@/hooks/post/use-post";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { IPopulatedPost } from "@/backend/posts";

export default function Posts() {
  const { data: session } = useSession();
  const handle = session?.user?.handle || "";

  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({
    populate: true,
    limit: 10,
    handle,
    enabled: !!handle,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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

  const allPosts =
    data?.pages.flatMap((page) => page.posts as IPopulatedPost[]) || [];

  if (!allPosts.length) {
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
      {allPosts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={ref} className="p-4">
          <Skeleton className="w-full h-32" />
        </div>
      )}
    </div>
  );
}
