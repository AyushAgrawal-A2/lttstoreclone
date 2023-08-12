'use client';

import ProductReviewsHistogram from './ProductReviewsHistogram';
import ProductReview from './ProductReview';
import PageChanger from '../../common/PageChanger';
import Loading from '../../common/Loading';
import { useState, useTransition } from 'react';
import fetchReviews from '@/packages/serverActions/fetchReviews';

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
    async function pageTransition(nextPage: number) {
      const reviewsResponse = await fetchReviews(
        lttProductId,
        nextPage,
        reviewStarsFilter
      );
      setPage(nextPage);
      setReviewsResponse(reviewsResponse);
    }
    startTransition(() => pageTransition(nextPage));
  }

  function changeReviewStarsFilter(stars: string) {
    if (reviewStarsFilter === stars) return;
    async function filterTransition(stars: string) {
      const reviewsResponse = await fetchReviews(lttProductId, 1, stars);
      setPage(1);
      setReviewStarsFilter(stars);
      setReviewsResponse(reviewsResponse);
    }
    startTransition(() => filterTransition(stars));
  }

  if (!reviewStats || !reviewsResponse) return <></>;
  if (reviewsResponse.reviews.length === 0) return <></>;

  return (
    <div
      id="customerReviews"
      className="m-10">
      <ProductReviewsHistogram
        reviewStats={reviewStats}
        changeReviewStarsFilter={changeReviewStarsFilter}
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
