import scrapeProducts from '@/packages/cheerio/scrapeProducts';
import { saveProducts } from '@/packages/fs/products.fs';
import { NextResponse } from 'next/server';

export async function GET() {
  const products: Product[] = await scrapeProducts();
  saveProducts(products);
  return NextResponse.json(products);
}
