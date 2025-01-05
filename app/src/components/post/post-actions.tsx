import { PopulatedPost } from '@/hooks/post/use-post';

interface PostActionsProps {
  post: PopulatedPost;
}

export default function PostActions({ post }: PostActionsProps) {
  return (
    <div className="flex gap-6 text-gray-500">
      <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
        <span>💬</span>
        <span>{post.replies}</span>
      </button>
      <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
        <span>🔄</span>
        <span>{post.redrops}</span>
      </button>
      <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
        <span>❤️</span>
        <span>{post.likes}</span>
      </button>
    </div>
  );
}