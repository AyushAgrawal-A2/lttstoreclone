import API_ENDPOINT from '../config/api_endpoints';

export default async function loadMoreBlogCards(
  page: number,
  perPage: number,
) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });
  const path = `${API_ENDPOINT}/blogs/the-newsletter-archive/?${searchParams.toString()}`;
  return await fetch(path)
    .then((res) => res.json())
    .catch(console.log);
}
