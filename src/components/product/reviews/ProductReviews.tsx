'use client';

import Loading from '../../common/Loading';
import PageChanger from '../../common/PageChanger';
import ProductReview from './ProductReview';
import ProductReviewsHistogram from './ProductReviewsHistogram';
import { useCallback, useEffect, useRef, useState } from 'react';
// import fetchReviews from '@/src/serverActions/fetchReviews';

type ProductReviewsProps = {
  reviewStats: ReviewStats;
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
  const firstLoadRef = useRef<boolean>(true);

  const loadReviews = useCallback(
    async (page: number, reviewStarsFilter: string) => {
      setIsLoading(true);
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

  const changePage = useCallback(
    (page: number) => {
      setPage(page);
      loadReviews(page, reviewStarsFilter);
    },
    [loadReviews, reviewStarsFilter]
  );

  const changeFilter = useCallback(
    (stars: string) => {
      setPage(1);
      setReviewStarsFilter(stars);
      loadReviews(1, stars);
    },
    [loadReviews]
  );

  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      loadReviews(1, '');
    }
  }, [loadReviews]);

  if (!reviewsResponse) return <Loading isLoading={true} />;
  if (!reviewsResponse.reviews.length) return <></>;

  return (
    <div
      id="customerReviews"
      className="m-10">
      <ProductReviewsHistogram
        reviewStats={reviewStats}
        changeFilter={changeFilter}
      />
      <div className="relative">
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
            changePage={changePage}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loading isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
