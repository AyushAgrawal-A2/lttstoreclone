'use server';

import API_ENDPOINT from '../config/api_endpoints';

export default async function fetchProductCards(
  collection: string,
  page: number,
  perPage: number,
  sortBy?: string,
  searchText?: string,
  filter = []
) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
    sortBy: sortBy ?? '',
    searchText: searchText ?? '',
  });
  const path = `${API_ENDPOINT}/collections/${collection}?${searchParams.toString()}`;
  return await fetch(path)
    .then((res) => res.json())
    .catch(console.log);
}
