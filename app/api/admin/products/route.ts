import supabase from "@/app/supabase";
import { ProductType, ProductZod } from "@/app/types";
import getDataFromToken from "@/app/utils/getDataFromToken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = req?.headers?.get("authorization");
  const userId = getDataFromToken(token);

  const body = (await req.json()) as ProductType;
  if (!ProductZod.parse(body))
    return NextResponse.json({ message: `Wrong data` }, { status: 500 });

  const { error } = await supabase
    .from("products")
    .insert({
      ...body,
      user_id: userId,
    })
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ message: "Error", error }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "Product created",
    },
    { status: 201 }
  );
}

/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     summary: Create a product
 *     description: Create a product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Nouveau produit"
 *               description:
 *                 type: string
 *                 example: "Description du produit"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 99.99
 *             required:
 *               - title
 *               - price
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product created"
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
 *         description: Non autorisé (token manquant ou invalide)
 *       404:
 *         description: Erreur lors de la création
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
 *                   description: Détails de l'erreur Supabase
 */
