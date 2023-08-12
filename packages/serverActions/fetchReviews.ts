'use server';

import getProductReviews from '../cheerio/reviews';
// import API_ENDPOINT from '../config/api_endpoints';

export default async function fetchReviews(
  lttProductId: string,
  page: number,
  reviewStarsFilter: string
) {
  return await getProductReviews({
    lttProductId,
    page: page.toString(),
    reviewStarsFilter,
  });
  // const searchParams = new URLSearchParams({
  //   lttProductId,
  //   page: page.toString(),
  //   reviewStarsFilter,
  // });
  // const path = `${API_ENDPOINT}/reviews?${searchParams.toString()}`;
  // return await fetch(path)
  //   .then((res) => res.json())
  //   .catch(console.log);
}
