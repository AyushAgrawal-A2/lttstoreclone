import { getBlogCards } from '@/packages/prisma/blogs';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const perPage = parseInt(searchParams.get('perPage') ?? '12');
  const blogCards = await getBlogCards({ page, perPage });
  return NextResponse.json({ blogCards });
}
