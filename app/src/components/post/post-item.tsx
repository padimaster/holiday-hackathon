// components/post/post-item.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import PostActions from "./post-actions";
import Image from "next/image";
import { IPopulatedPost } from "@/backend/posts";
import { useState } from "react";

interface PostItemProps {
  post: IPopulatedPost;
}

export default function PostItem({ post }: PostItemProps) {
  const [imageError, setImageError] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    }
  };

  return (
    <article className="hover:bg-gray-900/50 transition-colors">
      <div className="px-4 py-3">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={post.profile.avatar} />
            <AvatarFallback>{post.profile.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium truncate">{post.profile.name}</span>
              <span className="text-gray-500">@{post.profile.handle}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <div className="mt-2 break-words">{post.content}</div>

            {post.imageUrl && !imageError && (
              <div
                className={`mt-3 rounded-xl overflow-hidden relative ${
                  aspectRatio
                    ? aspectRatio > 1
                      ? "max-h-[512px]"
                      : "max-h-[680px]"
                    : "max-h-[512px]"
                }`}
              >
                <div
                  className="relative w-full"
                  style={{
                    paddingBottom: aspectRatio
                      ? `${(1 / aspectRatio) * 100}%`
                      : "75%",
                  }}
                >
                  <Image
                    src={post.imageUrl}
                    alt="Post content"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    className="object-contain"
                    onError={() => setImageError(true)}
                    onLoad={handleImageLoad}
                    priority={false}
                    quality={85}
                  />
                </div>
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
