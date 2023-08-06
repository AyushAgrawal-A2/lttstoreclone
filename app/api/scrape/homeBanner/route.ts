import scrapeHomeBanner from '@/packages/cheerio/homeBanner';
import { saveHomeBanner } from '@/packages/prisma/homeBanner';
import { NextResponse } from 'next/server';

export async function GET() {
  const homeBanner: HomeBanner[] = await scrapeHomeBanner();
  saveHomeBanner({ homeBanner });
  return NextResponse.json(homeBanner);
}
