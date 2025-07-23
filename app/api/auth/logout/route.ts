import supabase from "@/app/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { error } = await supabase.auth.signOut();

  return NextResponse.json(
    { message: error ? "Error" : `Disconnected` },
    { status: error ? error.status : 200 }
  );
}
