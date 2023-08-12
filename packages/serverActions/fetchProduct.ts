'use server';

import { getProduct, getProductCards } from '../prisma/products';

export default async function fetchProduct(name: string) {
  const path = '/products/' + name;
  const productPromise = getProduct(path);
  const recommendationsPromise = getProductCards({
    collection: 'all-products-1',
    page: 1,
    perPage: 8,
    sortBy: 'bestseller,asc',
  });
  const [product, { productCards: recommendations }] = await Promise.all([
    productPromise,
    recommendationsPromise,
  ]);
  return { product, recommendations };
}
