import supabase from "@/app/supabase";
import { ProductType, ProductZod } from "@/app/types";
import getDataFromToken from "@/app/utils/getDataFromToken";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { message: "Error", error },
      { status: Number(error.code) }
    );
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req?.headers?.get("authorization");
  const userId = getDataFromToken(token);
  const { id } = await params;

  const body = (await req.json()) as ProductType;
  if (!ProductZod.parse(body))
    return NextResponse.json({ message: `Wrong data` }, { status: 500 });

  const query = supabase.from("products");

  const { error } = await query
    .update({
      ...body,
      updated_at: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSSSZ"),
    })
    .eq("user_id", userId)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ message: "Error", error }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "Product updated",
    },
    { status: 200 }
  );
}
