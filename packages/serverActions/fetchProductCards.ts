'use server';

import { getProductCards } from '../prisma/products';

// import API_ENDPOINT from '../config/api_endpoints';

export default async function fetchProductCards(
  collection: string,
  page: number,
  perPage: number,
  sortBy?: string,
  searchText?: string,
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
