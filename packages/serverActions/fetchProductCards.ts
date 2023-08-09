'use server';

import { getProductCards } from '../prisma/products';

export default async function fetchProductCards(
  collection: string,
  page: number,
  perPage: number,
  sortBy?: string,
  searchText = '',
  filter = []
) {
  return await getProductCards({
    collection,
    page,
    perPage,
    sortBy,
    searchText,
    filter,
  });
}
