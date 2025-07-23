import supabase from "@/app/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    return NextResponse.json(
      { message: "Error", error },
      { status: Number(error.code) }
    );
  }

  return NextResponse.json(
    {
      message: "Products infos",
      data,
    },
    { status: 200 }
  );
}
