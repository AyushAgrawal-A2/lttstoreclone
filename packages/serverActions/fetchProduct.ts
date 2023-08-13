'use server';

import { unstable_cache } from 'next/cache';
import { getProduct, getProductCards } from '../prisma/products';

export default async function fetchProduct(name: string) {
  const [product, { productCards: recommendations }] =
    await unstable_cache(() => {
      const path = '/products/' + name;
      const productPromise = getProduct(path);
      const recommendationsPromise = getProductCards({
        collection: 'all-products-1',
        page: 1,
        perPage: 8,
        sortBy: 'bestseller,asc',
      });
      return Promise.all([productPromise, recommendationsPromise]);
    }, ['products', name])();
  return { product, recommendations };
}
