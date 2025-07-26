import supabase from "@/app/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*");

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*");

  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select("*");

  if (usersError ?? productsError ?? commentsError) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: "All infos",
      data: {
        users: users,
        products: products,
        comments: comments,
      },
    },
    { status: 200 }
  );
}

/**
 * @swagger
 * /api/admin/infos:
 *   get:
 *     summary: Récupère les statistiques des utilisateurs, produits et commentaires
 *     description: Retourne le nombre d'utilisateurs, produits et commentaires
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Users and Products"
 *                 data:
 *                   type: object
 *                   properties:
 *                     numberUsers:
 *                       type: integer
 *                       description: Nombre total d'utilisateurs
 *                       example: 42
 *                     numberProducts:
 *                       type: integer
 *                       description: Nombre total de produits
 *                       example: 150
 *                     numberComments:
 *                       type: integer
 *                       description: Nombre total de commentaires
 *                       example: 320
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error"
 */
