import { getBlogCards } from '@/packages/prisma/blogs';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const perPage = parseInt(searchParams.get('perPage') ?? '12');
  const respone = await getBlogCards({
    page: isNaN(page) ? 1 : page,
    perPage: isNaN(perPage) ? 12 : perPage,
  });
  return NextResponse.json(respone);
}
