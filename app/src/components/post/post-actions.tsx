'use client';

import { Button } from '@/components/ui/button';
import { Post } from '@/types/post';
import { MessageCircle, Repeat2, Heart, Share } from 'lucide-react';
import { useState } from 'react';

interface PostActionsProps {
  post: Post;
}

export default function PostActions({ post }: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  return (
    <div className="flex space-x-8 text-gray-500">
      <Button
        variant="ghost"
        size="sm"
        className="hover:text-purple-500 space-x-2"
      >
        <MessageCircle className="w-5 h-5" />
        <span>{post.replies}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={`hover:text-green-500 space-x-2 ${
          reposted ? 'text-green-500' : ''
        }`}
        onClick={() => setReposted(!reposted)}
      >
        <Repeat2 className="w-5 h-5" />
        <span>{post.reposts + (reposted ? 1 : 0)}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={`hover:text-red-500 space-x-2 ${
          liked ? 'text-red-500' : ''
        }`}
        onClick={() => setLiked(!liked)}
      >
        <Heart className="w-5 h-5" />
        <span>{post.likes + (liked ? 1 : 0)}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className="hover:text-purple-500"
      >
        <Share className="w-5 h-5" />
      </Button>
    </div>
  );
}