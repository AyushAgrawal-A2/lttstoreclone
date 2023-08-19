import { getProduct, getProductCards } from '@/src/prisma/products';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { product: string } }
) {
  const path = '/products/' + params.product;
  const productPromise = getProduct(path);
  const recommendationsPromise = getProductCards({
    collection: 'all-products-1',
    page: 1,
    perPage: 8,
    sortBy: 'bestseller,asc',
  });
  const [product, { productCards: recommendations }] = await Promise.all([
    productPromise,
    recommendationsPromise,
  ]);
  if (product) return NextResponse.json({ product, recommendations });
  else NextResponse.json({ error: 'Product not found' }, { status: 404 });
}
