import { getProductCards } from '@/packages/fs/products.fs';
import { NextResponse } from 'next/server';

export function GET(
  request: Request,
  { params }: { params: { collection: string } }
) {
  const collection = params.collection;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const perPage = parseInt(searchParams.get('perPage') ?? '12');
  const sortBy = searchParams.get('sortBy') ?? '';
  const searchText = searchParams.get('searchText') ?? '';
  const { productCards, totalCards } = getProductCards(
    collection,
    page,
    perPage,
    sortBy,
    [],
    searchText
  );
  return NextResponse.json({ productCards, totalCards });
}
