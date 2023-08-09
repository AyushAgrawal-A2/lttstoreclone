'use client';

import ProductReviewsHistogram from './ProductReviewsHistogram';
import ProductReview from './ProductReview';
import PageChanger from '../../common/PageChanger';
import Loading from '../../common/Loading';
import { useEffect, useState, useTransition } from 'react';
import fetchReviews from '@/packages/serverActions/fetchReviews';

type ProductReviewsProps = {
  reviewStats: ReviewStats;
  lttProductId: string;
};

export default function ProductReviews({
  reviewStats,
  lttProductId,
}: ProductReviewsProps) {
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const [reviewStarsFilter, setReviewStarsFilter] = useState('');
  const [reviewsResponse, setReviewsResponse] = useState<ReviewResponse>();
  const totalPages = Math.ceil((reviewsResponse?.total_count ?? 0) / 5);

  useEffect(() => {
    startTransition(
      async () =>
        await fetchReviews({
          lttProductId,
          page: page.toString(),
          reviewStarsFilter,
        })
          .then(setReviewsResponse)
          .catch((error) => {
            console.log(error);
          })
    );
  }, [lttProductId, page, reviewStarsFilter]);

  function changeReviewStarsFilter(stars: string) {
    if (reviewStarsFilter === stars) return;
    setPage(1);
    setReviewStarsFilter(stars);
  }

  if (!reviewsResponse) return <Loading />;
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
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
      <div className={`${!isPending && 'hidden'}`}>
        <Loading />
      </div>
    </div>
  );
}
