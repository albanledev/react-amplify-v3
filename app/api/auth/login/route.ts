import supabase from "@/app/supabase";
import { NextResponse } from "next/server";
import { z } from "zod";

const LoginZod = z.object({
  email: z.string(),
  password: z.string(),
});
export type Login = z.infer<typeof LoginZod>;

export async function POST(req: Request) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY
  ) {
    return NextResponse.json(
      { message: "Supabase env variables missing" },
      { status: 500 }
    );
  }

  const body = (await req.json()) as Login;
  if (!LoginZod.safeParse(body).success) {
    return NextResponse.json(
      { message: `Error while signing in user` },
      { status: 500 }
    );
  }

  const { email, password } = body;

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      {
        message: `Error while signing in user`,
        error: JSON.stringify(error),
      },
      { status: 500 }
    );
  }

  const { session, user } = data;
  const { expires_in, expires_at, refresh_token, token_type, access_token } =
    session;

  return NextResponse.json(
    {
      message: `Connected`,
      user: user,
      session: {
        access_token,
        refresh_token,
        token_type,
        expires_at,
        expires_in,
      },
    },
    { status: 200 }
  );
}
