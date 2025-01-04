import { getPosts } from "@/actions/post";
import PostItem from "@/components/post/post-item";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default async function Posts() {
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
