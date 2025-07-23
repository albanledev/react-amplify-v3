import supabase from "@/app/supabase";
import { UserType, UserZod } from "@/app/types";
import getDataFromToken from "@/app/utils/getDataFromToken";
import dayjs from "dayjs";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req?.headers?.get("authorization");
  const userId = getDataFromToken(token);

  const searchParams = req.nextUrl.searchParams;
  const isProducts = searchParams.get("products");
  const isComments = searchParams.get("comments");

  let query = "*";

  if (isProducts === "true") query += ",products(*)";
  if (isComments === "true") query += ",comments(*)";

  const { data, error } = await supabase
    .from("users")
    .select(query)
    .eq("id", userId);

  if (error) {
    return NextResponse.json({ message: "Error", error }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "User infos",
      data,
    },
    { status: 200 }
  );
}

export async function PUT(req: NextRequest) {
  const token = req?.headers?.get("authorization");
  const userId = getDataFromToken(token);

  const body = (await req.json()) as UserType;
  if (!UserZod.parse(body))
    return NextResponse.json({ message: `Wrong data` }, { status: 500 });

  let query = supabase.from("users");

  const { error } = await query
    .update({
      ...body,
      updated_at: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSSSZ"),
    })
    .eq("id", userId);

  if (error) {
    return NextResponse.json({ message: "Error", error }, { status: 404 });
  }

  const { data } = await query.select("*").eq("id", userId);

  return NextResponse.json(
    {
      message: "User infos",
      data,
    },
    { status: 200 }
  );
}
