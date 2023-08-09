import scrapeHomeBanner from '@/packages/cheerio/homeBanner';
import { saveHomeBanner } from '@/packages/prisma/home';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// export const runtime = 'edge';

export async function GET() {
  const homeBanner: HomeBanner[] = await scrapeHomeBanner();
  await saveHomeBanner({ homeBanner });
  return NextResponse.json({ homeBanner });
}
