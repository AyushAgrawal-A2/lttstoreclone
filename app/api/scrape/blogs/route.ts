import scrapeBlogs from '@/packages/cheerio/scrapeBlogs';
import { saveBlogs } from '@/packages/fs/blogs.fs';
import { NextResponse } from 'next/server';

export async function GET() {
  const blogs: Blog[] = await scrapeBlogs();
  saveBlogs(blogs);
  return NextResponse.json(blogs);
}
