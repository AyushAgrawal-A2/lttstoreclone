import scrapeHomeBanner from '@/packages/cheerio/homeBanner';
import { saveHomeBanner } from '@/packages/prisma/home';
import { NextResponse } from 'next/server';

export async function GET() {
  const homeBanner: HomeBanner[] = await scrapeHomeBanner();
  saveHomeBanner({ homeBanner });
  return NextResponse.json(homeBanner);
}
