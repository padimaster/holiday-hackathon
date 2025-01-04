import { ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ImageUploadProps {
  imagePreview: string | null;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function ImageUpload({
  imagePreview,
  onImageSelect,
  onImageRemove,
  inputRef,
}: ImageUploadProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => inputRef.current?.click()}
            className="text-purple-500 hover:text-purple-400"
          >
            <ImageIcon className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="p-0">
          <div className="bg-gray-900 rounded-lg">
            <div className="px-3 py-2 bg-purple-500/10 border-b border-purple-500/20 rounded-t-lg">
              <div className="flex items-center gap-2 text-purple-400">
                <ImageIcon className="w-4 h-4" />
                <span className="font-medium">Image Upload</span>
              </div>
            </div>
            <div className="p-3 text-sm">
              <p className="text-gray-400">Supported: PNG, JPG, GIF</p>
              <p className="text-gray-400 mt-1">Max size: 5MB</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>

      <input
        type="file"
        name="image"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={onImageSelect}
      />

      {imagePreview && (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-80 rounded-2xl"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full"
            onClick={onImageRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </>
  );
}
