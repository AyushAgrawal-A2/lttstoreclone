import cachedGetProduct from "@/src/cachedFns/cachedGetProduct";
import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { product: string } }
) {
  const { product, recommendations } = await cachedGetProduct(params.product);
  if (product) return NextResponse.json({ product, recommendations });
  else NextResponse.json({ error: "Product not found" }, { status: 404 });
}
