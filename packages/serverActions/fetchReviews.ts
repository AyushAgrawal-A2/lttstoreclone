'use server';

import getProductReviews from '../cheerio/reviews';

interface FetchReviewsParams {
  lttProductId: string;
  page: string;
  reviewStarsFilter: string;
}

export default async function fetchReviews({
  lttProductId,
  page,
  reviewStarsFilter,
}: FetchReviewsParams) {
  return await getProductReviews({
    lttProductId,
    page,
    reviewStarsFilter,
  });
}
