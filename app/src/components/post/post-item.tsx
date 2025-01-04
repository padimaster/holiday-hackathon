// components/post/post-item.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import PostActions from "./post-actions";
import { Post } from "@/types/post";
import Image from "next/image";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <article className="hover:bg-gray-900/50 transition-colors">
      <div className="px-4 py-3">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium truncate">{post.author.name}</span>
              <span className="text-gray-500">@{post.author.handle}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <div className="mt-2 break-words">{post.content}</div>

            {post.imageUrl && (
              <div className="mt-3 rounded-xl overflow-hidden">
                <Image
                  src={post.imageUrl}
                  width={400}
                  height={400}
                  alt="Post content"
                  className="w-full h-auto"
                />
              </div>
            )}

            <div className="mt-3">
              <PostActions post={post} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
