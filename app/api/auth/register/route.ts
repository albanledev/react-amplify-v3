import supabase from "@/app/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json()) as { email: string; password: string };

  const { email, password } = body;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error)
    return NextResponse.json(
      {
        message: `Error while signing in user`,
        error: JSON.stringify(error),
      },
      { status: 500 }
    );

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    return NextResponse.json(
      {
        message: `Error while signing in user`,
        error: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
  const { session, user: userSignIn } = response.data;
  return NextResponse.json(
    {
      user: userSignIn,
      token: session.access_token,
      refresh_token: session.refresh_token,
      errorCode: null,
    },
    { status: 201 }
  );
}
