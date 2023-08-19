'use client';

import Loading from '../../common/Loading';
import PageChanger from '../../common/PageChanger';
import ProductReview from './ProductReview';
import ProductReviewsHistogram from './ProductReviewsHistogram';
import { useCallback, useEffect, useState } from 'react';
// import fetchReviews from '@/packages/serverActions/fetchReviews';

type ProductReviewsProps = {
  reviewStats?: ReviewStats;
  lttProductId: string;
};

export default function ProductReviews({
  reviewStats,
  lttProductId,
}: ProductReviewsProps) {
  const [page, setPage] = useState<number>(1);
  const [reviewStarsFilter, setReviewStarsFilter] = useState<string>('');
  const [reviewsResponse, setReviewsResponse] = useState<ReviewResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeFilter = useCallback((stars: string) => {
    setPage(1);
    setReviewStarsFilter(stars);
  }, []);

  const loadReviews = useCallback(
    async (page: number, reviewStarsFilter: string) => {
      const searchParams = new URLSearchParams({
        lttProductId,
        page: page.toString(),
        reviewStarsFilter,
      });
      const path = `/api/reviews?${searchParams.toString()}`;
      const reviewsResponse = await fetch(path, { cache: 'no-store' })
        .then((res) => res.json())
        .catch(console.log);
      // const reviewsResponse = await fetchReviews(
      //   lttProductId,
      //   page,
      //   reviewStarsFilter
      // );
      setReviewsResponse(reviewsResponse);
      setIsLoading(false);
    },
    [lttProductId]
  );

  useEffect(() => {
    setIsLoading(true);
    loadReviews(page, reviewStarsFilter);
  }, [page, reviewStarsFilter, loadReviews]);

  if (!reviewStats) return <></>;
  if (!reviewsResponse || reviewsResponse.reviews.length === 0) return <></>;

  return (
    <div
      id="customerReviews"
      className="m-10">
      <ProductReviewsHistogram
        reviewStats={reviewStats}
        changeFilter={changeFilter}
      />
      <div className={`${isLoading && 'opacity-25'}`}>
        {reviewsResponse.reviews.map((review) => (
          <ProductReview
            key={review.time}
            review={review}
          />
        ))}
        <PageChanger
          page={page}
          totalPages={Math.ceil(reviewsResponse.total_count / 5)}
          changePage={setPage}
        />
      </div>
      <Loading isLoading={isLoading} />
    </div>
  );
}
