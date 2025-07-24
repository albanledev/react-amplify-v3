import supabase from "@/app/supabase";
import { CommentAddType, CommentAddZod } from "@/app/types";
import getDataFromToken from "@/app/utils/getDataFromToken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = req?.headers?.get("authorization");
  const userId = getDataFromToken(token);

  const body = (await req.json()) as CommentAddType;
  if (!CommentAddZod.safeParse(body).success)
    return NextResponse.json({ message: `Wrong data` }, { status: 500 });

  const { error } = await supabase.from("comments").insert({
    ...body,
    user_id: userId,
  });

  if (error) {
    return NextResponse.json({ message: "Error", error }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "Comment created",
    },
    { status: 201 }
  );
}

/**
 * @swagger
 * /api/commecnts:
 *   post:
 *     summary: Create comment
 *     description: Create comment
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "New comment"
 *               product_id:
 *                 type: string
 *                 example: "23245235645745667567456754"
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
