import supabase from "@/app/supabase";
import { ProductType, ProductZod } from "@/app/types";
import getDataFromToken from "@/app/utils/getDataFromToken";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { message: "Error", error },
      { status: Number(error.code) }
    );
  }

  return NextResponse.json({ data }, { status: 200 });
}

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by id
 *     description: Get product by id
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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req?.headers?.get("authorization");
  const userId = getDataFromToken(token);
  const { id } = await params;

  const body = (await req.json()) as ProductType;
  if (!ProductZod.safeParse(body).success)
    return NextResponse.json({ message: `Wrong data` }, { status: 500 });

  const query = supabase.from("products");

  const { error } = await query
    .update({
      ...body,
      updated_at: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSSSZ"),
    })
    .eq("user_id", userId)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ message: "Error", error }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "Product updated",
    },
    { status: 201 }
  );
}

/**
 * @swagger
 * /api/products/{id}:
 *   post:
 *     summary: Modify product by id
 *     description:  Modify product by id
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
 *                 example: "Product"
 *               description:
 *                 type: string
 *                 example: "23245235645745667567456754"
 *               image_url:
 *                 type: string
 *                 example: "https://sdsd.fr"
 *             required:
 *               - title
 *               - image_url
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
