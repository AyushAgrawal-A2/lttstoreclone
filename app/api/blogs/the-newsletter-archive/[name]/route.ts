import { getBlog } from '@/packages/prisma/blogs';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const blogPath = '/blogs/the-newsletter-archive/' + params.name;
  const blog = await getBlog({ blogPath });
  if (blog) return NextResponse.json(blog);
  else return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
}
