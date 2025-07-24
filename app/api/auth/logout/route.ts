import supabase from "@/app/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { error } = await supabase.auth.signOut();

  return NextResponse.json(
    { message: error ? "Error" : `Disconnected` },
    { status: error ? error.status : 200 }
  );
}

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Se déconnnecter
 *     description: Se déconnnecter
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
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
 *                   example: "Disconnected"
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
