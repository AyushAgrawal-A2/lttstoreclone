'use client';

import Loading from '../../common/Loading';
import PageChanger from '../../common/PageChanger';
import ProductReview from './ProductReview';
import ProductReviewsHistogram from './ProductReviewsHistogram';
import { useState, useTransition } from 'react';
// import fetchReviews from '@/packages/serverActions/fetchReviews';

type ProductReviewsProps = {
  reviewStats?: ReviewStats;
  lttProductId: string;
  initialReviewsResponse: ReviewResponse;
};

export default function ProductReviews({
  reviewStats,
  lttProductId,
  initialReviewsResponse,
}: ProductReviewsProps) {
  const [page, setPage] = useState(1);
  const [reviewStarsFilter, setReviewStarsFilter] = useState('');
  const [reviewsResponse, setReviewsResponse] = useState<ReviewResponse>(
    initialReviewsResponse
  );
  const [isPending, startTransition] = useTransition();

  function changePage(nextPage: number) {
    if (page === nextPage) return;
    startTransition(() => pageTransition(nextPage));
  }

  async function pageTransition(nextPage: number) {
    const searchParams = new URLSearchParams({
      lttProductId,
      page: nextPage.toString(),
      reviewStarsFilter,
    });
    const path = `../api/reviews?${searchParams.toString()}`;
    const reviewsResponse = await fetch(path)
      .then((res) => res.json())
      .catch(console.log);
    // const reviewsResponse = await fetchReviews(
    //   lttProductId,
    //   nextPage,
    //   reviewStarsFilter
    // );
    setPage(nextPage);
    setReviewsResponse(reviewsResponse);
  }

  function changeFilter(stars: string) {
    if (reviewStarsFilter === stars) return;
    startTransition(() => filterTransition(stars));
  }

  async function filterTransition(stars: string) {
    const searchParams = new URLSearchParams({
      lttProductId,
      page: '1',
      stars,
    });
    const path = `../api/reviews?${searchParams.toString()}`;
    const reviewsResponse = await fetch(path)
      .then((res) => res.json())
      .catch(console.log);
    // const reviewsResponse = await fetchReviews(lttProductId, 1, stars);
    setPage(1);
    setReviewStarsFilter(stars);
    setReviewsResponse(reviewsResponse);
  }

  if (!reviewStats) return <></>;
  if (reviewsResponse.reviews.length === 0) return <></>;

  return (
    <div
      id="customerReviews"
      className="m-10">
      <ProductReviewsHistogram
        reviewStats={reviewStats}
        changeFilter={changeFilter}
      />
      <div className={`${isPending && 'opacity-25'}`}>
        {reviewsResponse.reviews.map((review) => (
          <ProductReview
            key={review.time}
            review={review}
          />
        ))}
        <PageChanger
          page={page}
          totalPages={Math.ceil(reviewsResponse.total_count / 5)}
          changePage={changePage}
        />
      </div>
      <Loading loading={isPending} />
    </div>
  );
}
