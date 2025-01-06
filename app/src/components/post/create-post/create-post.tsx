"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import { PenLine, Eye, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MarkdownPreview } from "./markdown-preview";
import { MarkdownTips } from "./markdown-tips";
import { ImageUpload } from "./image-upload";
import { ICreatePostDto } from "@/backend/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createPostSchema } from "@/backend/posts/post.validations";
import { useCreatePost } from "@/hooks/post/use-post";
import { useSession } from "next-auth/react";

export default function CreatePost() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const { data: session } = useSession();

  const imageInputRef = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;
  const { toast } = useToast();

  const form = useForm<ICreatePostDto>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
      title: "",
      profileId: "",
    },
  });

  useEffect(() => {
    if (session?.user?.id) {
      form.setValue("profileId", session.user.id);
    }
  }, [session, form]);

  const { mutateAsync } = useCreatePost();

  const onSubmit = async (values: ICreatePostDto) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("profileId", values.profileId);
      formData.append("title", values.title);
      
      if (imageInputRef.current?.files?.[0]) {
        formData.append("image", imageInputRef.current.files[0]);
      }

      await mutateAsync(formData);
      form.reset();
      setImagePreview(null);
      setIsPreview(false);
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const content = form.watch("content");
  const title = form.watch("title");
  const characterCount = content.length;
  const maxCharacters = 280;
  const remainingChars = maxCharacters - characterCount;
  const isOverLimit = characterCount > maxCharacters;

  const profile = session?.user?.profile;

  return (
    <div className="border-b border-gray-800">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-shrink-0">
              <Avatar className="w-12 h-12 bg-gray-800">
                {isAvatarLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-full">
                    <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                  </div>
                )}
                <AvatarImage
                  src={profile?.avatar}
                  onLoad={() => setIsAvatarLoading(false)}
                  className={cn(isAvatarLoading && "opacity-0")}
                />
                <AvatarFallback className="bg-gray-800 text-gray-400">
                  {profile?.name?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div
                className={cn(
                  "space-y-4",
                  !isPreview && "border-b border-gray-800 pb-4"
                )}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<ICreatePostDto, "title">;
                  }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Post title..."
                          className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-500 text-2xl font-bold px-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!isPreview && (
                  <FormField
                    control={form.control}
                    name="content"
                    render={({
                      field,
                    }: {
                      field: ControllerRenderProps<ICreatePostDto, "content">;
                    }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Share your knowledge..."
                            className="min-h-[120px] bg-transparent border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-500 text-white/80"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {isPreview && (
                <div className="min-h-[120px]">
                  <MarkdownPreview content={content} title={title} />
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "transition-all duration-200",
                        !isPreview && "text-purple-500"
                      )}
                      onClick={() => setIsPreview(false)}
                    >
                      <PenLine className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "transition-all duration-200",
                        isPreview && "text-purple-500"
                      )}
                      onClick={() => setIsPreview(true)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <ImageUpload
                      imagePreview={imagePreview}
                      onImageSelect={handleImageSelect}
                      onImageRemove={handleImageRemove}
                      inputRef={imageInputRef}
                    />
                    <MarkdownTips />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "text-sm transition-colors",
                      remainingChars <= 20
                        ? "text-yellow-500"
                        : "text-gray-500",
                      isOverLimit && "text-red-500"
                    )}
                  >
                    {remainingChars}
                  </div>
                  <SubmitButton
                    disabled={
                      isOverLimit ||
                      !content.trim() ||
                      !title.trim() ||
                      !session?.user?.id
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className={cn(
        "bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-200",
        (disabled || pending) && "opacity-50 cursor-not-allowed",
        "min-w-[100px]"
      )}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Posting...</span>
        </div>
      ) : (
        "Drop"
      )}
    </Button>
  );
}
