import scrapeBlogs from '@/packages/cheerio/blogs';
import { saveBlogs } from '@/packages/prisma/blogs';
import { NextResponse } from 'next/server';

export async function GET() {
  const { blogCards, blogContents } = await scrapeBlogs();
  await saveBlogs({ blogCards, blogContents });
  return NextResponse.json({ blogCards, blogContents });
}
