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
      message: `Registered`,
      user: userSignIn,
      session,
    },
    { status: 201 }
  );
}

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register
 *     description: Register
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
 *       201:
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
