import { email, z } from "zod";

export const UserZod = z.object({
  id: z.string(),
  created_at: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
});

export type UserType = z.infer<typeof UserZod>;

export const UsersZod = z.array(UserZod);
export type UsersType = z.infer<typeof UsersZod>;

export const ProductZod = z.object({
  title: z.string(),
  description: z.string().optional(),
  image_url: z.string(),
});

export type ProductType = z.infer<typeof ProductZod>;

export const CommentZod = z.object({
  id: z.string(),
  content: z.string(),
  created_at: z.string(),
  product_id: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
});
export type CommentType = z.infer<typeof CommentZod>;

export const CommentsZod = z.array(CommentZod);
export type CommentsType = z.infer<typeof CommentsZod>;

export const Product = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  image_url: z.string(),
  comments: CommentsZod,
  users: z.object({
    name: z.string(),
  }),
  created_at: z.string(),
});

export type Product = z.infer<typeof Product>;

export const ProductsZod = z.array(Product);
export type Products = z.infer<typeof ProductsZod>;

export const CommentAddZod = z.object({
  content: z.string(),
  product_id: z.string(),
});

export type CommentAddType = z.infer<typeof CommentAddZod>;
