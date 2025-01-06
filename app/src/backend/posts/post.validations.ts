import { z } from "zod";
import { ICreatePostDto } from "@/backend/posts";

export const createPostSchema = z.object({
  title: z.string(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(280, "Content must be less than 280 characters"),
  profileId: z.string().min(1, "Profile ID is required"),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
}) satisfies z.ZodType<ICreatePostDto>;
