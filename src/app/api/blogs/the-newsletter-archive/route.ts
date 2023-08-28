import cachedGetBlogCards from "@/src/cachedFns/cachedGetBlogCards";
import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = parseInt(searchParams.get("perPage") ?? "12");
  const respone = await cachedGetBlogCards(
    isNaN(page) ? 1 : page,
    isNaN(perPage) ? 12 : perPage
  );
  return NextResponse.json(respone);
}
