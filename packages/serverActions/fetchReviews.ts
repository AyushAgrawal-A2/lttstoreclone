'use server';

// import { unstable_cache } from 'next/cache';
import getProductReviews from '../cheerio/reviews';

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
  // return await unstable_cache(
  //   () =>
  //     getProductReviews({
  //       lttProductId,
  //       page: page.toString(),
  //       reviewStarsFilter,
  //     }),
  //   ['reviews', lttProductId, page.toString()]
  // )();
}
