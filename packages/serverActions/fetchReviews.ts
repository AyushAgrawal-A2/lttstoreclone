import API_ENDPOINT from '../config/api_endpoints';

export default async function fetchReviews(
  lttProductId: string,
  page: number,
  reviewStarsFilter: string
) {
  const searchParams = new URLSearchParams({
    lttProductId,
    page: page.toString(),
    reviewStarsFilter,
  });
  const path = `${API_ENDPOINT}/reviews?${searchParams.toString()}`;
  return await fetch(path)
    .then((res) => res.json())
    .catch(console.log);
}
