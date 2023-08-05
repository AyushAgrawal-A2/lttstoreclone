import scrapeProducts from '@/packages/cheerio/products';
import { saveProducts } from '@/packages/prisma/products';
import { NextResponse } from 'next/server';

export async function GET() {
  const products: Product[] = await scrapeProducts();
  saveProducts({ products });
  return NextResponse.json({ products });
}
