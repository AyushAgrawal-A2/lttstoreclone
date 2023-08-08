'use server';

import { getProductCards } from '../prisma/products';

export default async function fetchProductCards(
  collection: string,
  page: number,
  perPage: number,
  sortBy?: string
) {
  return await getProductCards({
    collection,
    page,
    perPage,
    sortBy,
    filter: undefined,
  });
}
