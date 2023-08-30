import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import verifyAccessToken from "./auth/verifyAccessToken";

export const config = {
  matcher: ["/((?!assets|_next/|icon.png).*)"],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  console.log(request.nextUrl.pathname);
  console.log(request.nextUrl.searchParams);
  const token = request.cookies.get("auth")?.value;
  if (token) {
    console.log(await verifyAccessToken(token));
  }
  return response;
}
