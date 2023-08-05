import scrapeHomeBanner from '@/packages/cheerio/homeBanner';
import { saveHomeBanner } from '@/packages/fs/homeBanner.fs';
import { NextResponse } from 'next/server';

export async function GET() {
  const homeBanner: Banner[] = await scrapeHomeBanner();
  saveHomeBanner(homeBanner);
  return NextResponse.json(homeBanner);
}
