'use server';

import { getProduct } from '../prisma/products';

export default async function fetchProduct(path: string) {
  return await getProduct(path);
}
