import supabase from "@/app/supabase";
import { ProductType, ProductZod } from "@/app/types";
import getDataFromToken from "@/app/utils/getDataFromToken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = req?.headers?.get("authorization");
  const userId = getDataFromToken(token);

  const body = (await req.json()) as ProductType;
  if (!ProductZod.parse(body))
    return NextResponse.json({ message: `Wrong data` }, { status: 500 });

  const { error } = await supabase
    .from("products")
    .insert({
      ...body,
      user_id: userId,
    })
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ message: "Error", error }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "Product created",
    },
    { status: 201 }
  );
}
