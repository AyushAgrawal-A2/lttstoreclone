"use server";

import getProductReviews from "@/src/cheerio/reviews";

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
}
