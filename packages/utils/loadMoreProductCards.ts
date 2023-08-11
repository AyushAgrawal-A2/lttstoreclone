import API_ENDPOINT from '../config/api_endpoints';

export default async function loadMoreProductCards(
  collection: string,
  page: number,
  perPage: number,
  sortBy: string | undefined
) {
  const apiSearchParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
    sortBy: sortBy ?? '',
  });
  const path = `${API_ENDPOINT}/collections/${collection}?${apiSearchParams.toString()}`;
  return await fetch(path)
    .then((res) => res.json())
    .catch(console.log);
}
