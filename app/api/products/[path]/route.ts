import { getProduct, getProductCards } from '@/packages/prisma/products';
import { NextResponse } from 'next/server';

// export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { path: string } }
) {
  const name = params.path;
  const path = '/products/' + name;
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
