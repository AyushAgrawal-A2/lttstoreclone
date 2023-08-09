import scrapeBlogs from '@/packages/cheerio/blogs';
import { saveBlogs } from '@/packages/prisma/blogs';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  const { blogCards, blogContents } = await scrapeBlogs();
  await saveBlogs({ blogCards, blogContents });
  return NextResponse.json({ blogCards, blogContents });
}
