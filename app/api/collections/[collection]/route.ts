import { getProductCards } from '@/packages/prisma/products';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { collection: string } }
): Promise<
  NextResponse<{
    productCards: ProductCard[];
    totalCards: number;
  }>
> {
  const collection = params.collection;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const perPage = parseInt(searchParams.get('perPage') ?? '12');
  const sortBy = searchParams.get('sortBy') ?? undefined;
  const searchText = searchParams.get('searchText') ?? '';
  const { productCards, totalCards } = await getProductCards({
    collection,
    page: isNaN(page) ? 1 : page,
    perPage: isNaN(perPage) ? 12 : perPage,
    sortBy,
    searchText,
    filter: undefined,
  });
  return NextResponse.json({ productCards, totalCards });
}
