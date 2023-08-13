'use server';

import { unstable_cache } from 'next/cache';
import { getProduct, getProductCards } from '../prisma/products';

export default async function fetchProduct(name: string) {
  return await unstable_cache(async () => {
    const path = '/products/' + name;
    const product = await getProduct(path);
    const { productCards: recommendations } = await getProductCards({
      collection: 'all-products-1',
      page: 1,
      perPage: 8,
      sortBy: 'bestseller,asc',
    });
    return { product, recommendations };
  }, ['products', name])();
}
