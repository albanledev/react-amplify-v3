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
    .eq("id", userId)
    .maybeSingle();

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
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Récupère les informations de l'utilisateur
 *     description: Retourne les informations de l'utilisateur avec options pour inclure produits et commentaires
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: products
 *         schema:
 *           type: boolean
 *         description: Inclure les produits associés
 *       - in: query
 *         name: comments
 *         schema:
 *           type: boolean
 *         description: Inclure les commentaires associés
 *     responses:
 *       200:
 *         description: Informations utilisateur récupérées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User infos"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     products:
 *                       type: array
 *                     comments:
 *                       type: array
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error"
 *                 error:
 *                   type: object
 */

export async function PUT(req: NextRequest) {
  const token = req?.headers?.get("authorization");
  const userId = getDataFromToken(token);

  const body = (await req.json()) as UserType;
  if (!UserZod.safeParse(body).success)
    return NextResponse.json({ message: `Wrong data` }, { status: 500 });

  const query = supabase.from("users");

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

/**
 * @swagger
 * /api/auth/me:
 *   put:
 *     summary: Met à jour les informations de l'utilisateur
 *     description: Met à jour le profil de l'utilisateur authentifié
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
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User infos"
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Wrong data"
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Erreur lors de la mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error"
 *                 error:
 *                   type: object
 */
