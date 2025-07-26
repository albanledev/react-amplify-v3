import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./app/utils/VerifyToken.ts";
import isUserAdmin from "./app/utils/isUserAdmin.ts";

const pathnamesNoToken = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/products",
  "/api/metrics",
  "/signIn",
  "/signUp",
  "/products",
  "/",
];

const isProductDetailPath = (pathname: string) => {
  return /^\/api\/products\/[^/]+$/.test(pathname);
};

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  const token = pathname.includes("api")
    ? request.headers.get("Authorization")
    : request.cookies.get("token")?.value ?? null;

  if (pathname.includes("admin")) {
    return (await isUserAdmin(token))
      ? response
      : NextResponse.json(
          {
            message: `You're not allowed, insert your token in Authorization headers ADMIN`,
          },
          { status: 403 }
        );
  }

  if (pathnamesNoToken.includes(pathname) || isProductDetailPath(pathname))
    return response;

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
  matcher: ["/admin/:path*", "/api/:path*", "/"],
};
