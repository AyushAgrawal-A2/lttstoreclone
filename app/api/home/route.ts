import { getBlogCards } from '@/packages/fs/blogs.fs';
import { getHomeBanner } from '@/packages/fs/homeBanner.fs';
import { getProductCards } from '@/packages/fs/products.fs';
import { NextResponse } from 'next/server';

export function GET() {
  const home: Home = {
    banner: getHomeBanner(),
    featured: getProductCards('top-sellers', 1, 3).productCards,
    bestseller: getProductCards('all-products-1', 1, 6, 'bestseller')
      .productCards,
    blogs: getBlogCards(1, 3),
  };
  return NextResponse.json(home);
}
