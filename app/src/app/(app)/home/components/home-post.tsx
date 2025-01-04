"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostProps {
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  reposts: number;
  replies: number;
  hasImage?: boolean;
  imageUrl?: string;
}

export function HomePost({
  author,
  content,
  timestamp,
  likes,
  reposts,
  replies,
  hasImage,
  imageUrl,
}: PostProps) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  return (
    <Card className="bg-transparent border-b border-gray-800 rounded-none hover:bg-gray-900/50 transition-colors">
      <CardHeader className="flex flex-row space-x-4 p-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{author.name}</span>
            <span className="text-gray-500">@{author.handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="whitespace-pre-wrap">{content}</p>
        {hasImage && imageUrl && (
          <div className="mt-4 rounded-2xl overflow-hidden">
            <img src={imageUrl} alt="Post content" className="w-full h-auto" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex space-x-8 text-gray-500">
        <Button
          variant="ghost"
          size="sm"
          className="hover:text-purple-500 space-x-2"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{replies}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`hover:text-green-500 space-x-2 ${
            reposted ? "text-green-500" : ""
          }`}
          onClick={() => setReposted(!reposted)}
        >
          <Repeat2 className="w-5 h-5" />
          <span>{reposts + (reposted ? 1 : 0)}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`hover:text-red-500 space-x-2 ${
            liked ? "text-red-500" : ""
          }`}
          onClick={() => setLiked(!liked)}
        >
          <Heart className="w-5 h-5" />
          <span>{likes + (liked ? 1 : 0)}</span>
        </Button>
        <Button variant="ghost" size="sm" className="hover:text-purple-500">
          <Share className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
