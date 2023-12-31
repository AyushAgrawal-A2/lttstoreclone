import cachedGetProductCards from "@/src/cachedFns/cachedGetProductCards";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { collection: string } }
): Promise<
  NextResponse<{
    productCards: ProductCard[];
    totalCards: number;
  }>
> {
  const collection = params.collection;
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = parseInt(searchParams.get("perPage") ?? "12");
  const sortBy = searchParams.get("sortBy") ?? undefined;
  const searchText = searchParams.get("searchText") ?? "";
  const { productCards, totalCards } = await cachedGetProductCards(
    collection,
    page,
    perPage,
    sortBy,
    searchText
  );
  return NextResponse.json({ productCards, totalCards });
}
