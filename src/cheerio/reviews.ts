import cheerio from "cheerio";

interface GetProductReviewsParams {
  lttProductId: string;
  page: string;
  reviewStarsFilter?: string;
}

async function getProductReviews({
  lttProductId,
  page,
  reviewStarsFilter,
}: GetProductReviewsParams) {
  try {
    const url = new URL(process.env.REVIEWS_URL ?? "");
    url.searchParams.set("product_id", lttProductId);
    url.searchParams.set("page", page);
    if (reviewStarsFilter)
      url.searchParams.set("filter_rating", reviewStarsFilter);
    const { html, total_count } = await fetch(url).then((res) => res.json());
    const response: ReviewResponse = {
      reviews: [],
      total_count,
    };
    const $ = cheerio.load(html);
    $("div.jdgm-rev-widg__reviews div.jdgm-rev").each((i, el) => {
      const stars = parseFloat(
        $(el)
          .find("div.jdgm-rev__header span.jdgm-rev__rating")
          .prop("data-score"),
      );
      const time = $(el)
        .find("div.jdgm-rev__header span.jdgm-rev__timestamp")
        .prop("data-content");
      const author = $(el)
        .find("div.jdgm-rev__header span.jdgm-rev__author")
        .text();
      const verified = $(el).prop("data-verified-buyer") === "true";
      const title = $(el)
        .find("div.jdgm-rev__content b.jdgm-rev__title")
        .text();
      const body = $(el)
        .find("div.jdgm-rev__content div.jdgm-rev__body")
        .text();
      const likes = parseInt($(el).prop("data-thumb-up-count"));
      const dislikes = parseInt($(el).prop("data-thumb-down-count"));
      response.reviews.push({
        author,
        verified,
        time,
        stars,
        title,
        body,
        likes,
        dislikes,
      });
    });
    return response;
  } catch (error) {
    return {
      reviews: [],
      total_count: 0,
    };
  }
}

export default getProductReviews;
