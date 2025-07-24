import supabase from "@/app/supabase";
import { NextResponse } from "next/server";
import { z } from "zod";

const LoginZod = z.object({
  email: z.string(),
  password: z.string(),
});
export type Login = z.infer<typeof LoginZod>;

export async function POST(req: Request) {
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     description: Login
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "email@email.email"
 *               password:
 *                 type: string
 *                 example: "password"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while signing in user"
 *                 error:
 *                   type: string
 *                   example: ""
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
 */
