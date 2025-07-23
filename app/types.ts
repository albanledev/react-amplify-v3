import { z } from "zod";

export const UserZod = z.object({
  name: z.string(),
});

export type UserType = z.infer<typeof UserZod>;

export const ProductZod = z.object({
  title: z.string(),
  description: z.string().optional(),
  image_url: z.string(),
});

export type ProductType = z.infer<typeof ProductZod>;

export const CommentAddZod = z.object({
  content: z.string(),
  product_id: z.string(),
});

export type CommentAddType = z.infer<typeof CommentAddZod>;
