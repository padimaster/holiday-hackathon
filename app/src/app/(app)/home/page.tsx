// app/page.tsx
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getPosts } from "@/actions/post";
import CreatePost from "@/components/post/create-post/create-post";
import PostItem from "@/components/post/post-item";
import { Alert, AlertDescription } from "@/components/ui/alert";

async function Posts() {
  const posts = await getPosts();

  if (posts.length === 0) {
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
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="divide-y divide-gray-800">
      <div className="border-b border-gray-800">
        <CreatePost />
      </div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        }
      >
        <Posts />
      </Suspense>
    </main>
  );
}