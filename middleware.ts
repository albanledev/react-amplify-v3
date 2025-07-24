import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./app/utils/VerifyToken.ts";
import isUserAdmin from "./app/utils/isUserAdmin.ts";

const pathnamesNoToken = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/products",
  "/api/metrics",

];

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  let token = request.nextUrl.pathname.includes("api")
    ? request.headers.get("authorization")
    : request.cookies.get("token")?.value ?? null;

  if (
    request.nextUrl.pathname.includes("admin") &&
    (await isUserAdmin(token))
  ) {
    return NextResponse.json(
      {
        message: `You're not allowed, insert your token in Authorization headers`,
      },
      { status: 403 }
    );
  }

  if (pathnamesNoToken.includes(request.nextUrl.pathname)) return response;

  const verifyToken = await verifyJwtToken(token);

  if (!verifyToken) {
    return NextResponse.json(
      {
        message: `You're not allowed, insert your token in Authorization headers`,
      },
      { status: 403 }
    );
  }

  return response;
};

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
