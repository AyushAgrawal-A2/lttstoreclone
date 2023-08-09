import { getProduct, getProductCards } from '@/packages/prisma/products';
import { NextResponse } from 'next/server';

// export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  const path = '/products/' + name;
  const product = await getProduct(path);
  if (product) {
    const recommendations = (
      await getProductCards({
        collection: 'all-products-1',
        page: 1,
        perPage: 8,
        sortBy: 'bestseller,asc',
      })
    ).productCards;
    return NextResponse.json({ product, recommendations });
  } else NextResponse.json({ error: 'Product not found' }, { status: 404 });
}
