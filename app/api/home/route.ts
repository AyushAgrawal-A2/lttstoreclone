import { getBlogCards } from '@/packages/prisma/blogs';
import { getHomeBanner } from '@/packages/prisma/homeBanner';
import { getProductCards } from '@/packages/prisma/products';
import { NextResponse } from 'next/server';

export async function GET() {
  const home: Home = {
    homeBanner: await getHomeBanner(),
    featured: (
      await getProductCards({ collection: 'top-sellers', page: 1, perPage: 3 })
    ).productCards,
    bestseller: (
      await getProductCards({
        collection: 'all-products-1',
        page: 1,
        perPage: 6,
        sortBy: {
          rank: 'bestseller',
          direction: 'asc',
        },
      })
    ).productCards,
    blogs: await getBlogCards({ page: 1, perPage: 3 }),
  };
  return NextResponse.json(home);
}
