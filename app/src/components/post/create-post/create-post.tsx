"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFormStatus } from "react-dom";
import { PenLine, Eye } from "lucide-react";
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

export default function CreatePost() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;
  const { toast } = useToast();

  const form = useForm<ICreatePostDto>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
      title: "",
      profileId: "", // Set this from your auth context
    },
  });

  const { mutateAsync } = useCreatePost();

  const onSubmit = async (values: ICreatePostDto) => {
    try {
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("profileId", values.profileId);
      formData.append("title", values.title);

      if (imageInputRef.current?.files?.[0]) {
        formData.append("image", imageInputRef.current.files[0]);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await mutateAsync(formData as any);
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
  const characterCount = content.length;
  const maxCharacters = 280;
  const remainingChars = maxCharacters - characterCount;
  const isOverLimit = characterCount > maxCharacters;

  return (
    <div className="border-b border-gray-800">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder/32/32" />
              <AvatarFallback>TP</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex gap-2 border-b border-gray-800">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex-1 rounded-none",
                    !isPreview && "text-purple-500 border-b-2 border-purple-500"
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
                    "flex-1 rounded-none",
                    isPreview && "text-purple-500 border-b-2 border-purple-500"
                  )}
                  onClick={() => setIsPreview(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>

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
                      {!isPreview ? (
                        <Textarea
                          {...field}
                          placeholder="Share your knowledge..."
                          className="min-h-[120px] bg-transparent border-none resize-none focus:ring-0"
                        />
                      ) : (
                        <MarkdownPreview content={field.value} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex gap-2">
                  <ImageUpload
                    imagePreview={imagePreview}
                    onImageSelect={handleImageSelect}
                    onImageRemove={handleImageRemove}
                    inputRef={imageInputRef}
                  />
                  <MarkdownTips />
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "text-sm",
                      remainingChars <= 20
                        ? "text-yellow-500"
                        : "text-gray-500",
                      isOverLimit && "text-red-500"
                    )}
                  >
                    {remainingChars}
                  </div>
                  <SubmitButton disabled={isOverLimit || !content.trim()} />
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
        "bg-purple-600 hover:bg-purple-700 text-white rounded-full",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {pending ? "Posting..." : "Drop"}
    </Button>
  );
}
