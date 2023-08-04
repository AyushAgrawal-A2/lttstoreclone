import { getBlog } from '@/packages/fs/blogs.fs';
import { NextResponse } from 'next/server';

export function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const blogName = params.name;
  const blog = getBlog(blogName);
  if (blog) return NextResponse.json(blog);
  else return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
}
