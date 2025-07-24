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

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products
 *     description: Get products
 *     tags:
 *       - Product
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
 *                   example: "Products infos"
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Titre
 *                       example: "New product"
 *                     description:
 *                       type: string
 *                       description: Description
 *                       example: "New product description"
 *                     image_url:
 *                       type: string
 *                       description: Image url
 *                       example: "https://new_image_url.com/"
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
