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

export const Product = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  image_url: z.string(),
});

export type Product = z.infer<typeof Product>;

export const ProductsZod = z.array(Product);
export type Products = z.infer<typeof ProductsZod>;

export const CommentAddZod = z.object({
  content: z.string(),
  product_id: z.string(),
});

export type CommentAddType = z.infer<typeof CommentAddZod>;
