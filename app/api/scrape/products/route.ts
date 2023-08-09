import scrapeProducts from '@/packages/cheerio/products';
import { saveProducts } from '@/packages/prisma/products';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  const products: Product[] = await scrapeProducts();
  await saveProducts({ products });
  return NextResponse.json({ products });
}
