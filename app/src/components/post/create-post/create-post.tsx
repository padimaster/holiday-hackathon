"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/actions/post";
import { useFormStatus } from "react-dom";
import { PenLine, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MarkdownPreview } from "./markdown-preview";
import { MarkdownTips } from "./markdown-tips";
import { ImageUpload } from "./image-upload";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const { toast } = useToast();

  async function handleSubmit(formData: FormData) {
    if (!content.trim()) return;

    const result = await createPost(formData);

    if (result.success) {
      setContent("");
      setImagePreview(null);
      setIsPreview(false);
      formRef.current?.reset();
      toast({
        title: "Success",
        description: "Your tech pill has been posted!",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to post. Please try again.",
        variant: "destructive",
      });
    }
  }

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

  const characterCount = content.length;
  const maxCharacters = 280;
  const remainingChars = maxCharacters - characterCount;
  const isOverLimit = characterCount > maxCharacters;

  return (
    <div className="border-b border-gray-800">
      <form ref={formRef} action={handleSubmit} className="p-4">
        <div className="flex gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder/32/32" />
            <AvatarFallback>TP</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            {/* Edit/Preview Toggle */}
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

            {/* Content Area */}
            {!isPreview ? (
              <Textarea
                name="content"
                placeholder="Share your knowledge..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] bg-transparent border-none resize-none focus:ring-0"
                maxLength={maxCharacters}
              />
            ) : (
              <MarkdownPreview content={content} />
            )}

            {/* Bottom Actions */}
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
                    remainingChars <= 20 ? "text-yellow-500" : "text-gray-500",
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
