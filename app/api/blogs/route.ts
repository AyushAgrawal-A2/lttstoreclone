import { getBlogCards } from '@/packages/fs/blogs.fs';
import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const perPage = parseInt(searchParams.get('perPage') ?? '12');
  const blogCards = getBlogCards(page, perPage);
  return NextResponse.json({ blogCards });
}
