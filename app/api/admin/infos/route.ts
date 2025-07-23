import supabase from "@/app/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("email");

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("title");

  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select("content");

  if (usersError ?? productsError ?? commentsError) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: "Users and Products",
      data: {
        numberUsers: users?.length,
        numberProducts: products?.length,
        numberComments: comments?.length,
      },
    },
    { status: 200 }
  );
}
