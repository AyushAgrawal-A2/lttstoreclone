'use client';

import ProductReviewsHistogram from './ProductReviewsHistogram';
import ProductReview from './ProductReview';
import PageChanger from '../../common/PageChanger';
import Loading from '../../common/Loading';
import { useEffect, useState } from 'react';
import fetchReviews from '@/packages/serverActions/fetchReviews';

type ProductReviewsProps = {
  reviewStats: ReviewStats;
  lttProductId: string;
};

export default function ProductReviews({
  reviewStats,
  lttProductId,
}: ProductReviewsProps) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [reviewStarsFilter, setReviewStarsFilter] = useState('');
  const [reviewsResponse, setReviewsResponse] = useState<ReviewResponse>();
  const totalPages = Math.ceil((reviewsResponse?.total_count ?? 0) / 5);

  useEffect(() => {
    setLoading(true);
    fetchReviews(lttProductId, page, reviewStarsFilter).then(
      (reviewsResponse) => {
        setLoading(false);
        setReviewsResponse(reviewsResponse);
      }
    );
  }, [lttProductId, page, reviewStarsFilter]);

  function changeReviewStarsFilter(stars: string) {
    if (reviewStarsFilter === stars) return;
    setLoading(true);
    setPage(1);
    setReviewStarsFilter(stars);
  }

  if (!reviewsResponse) return <Loading loading={true} />;
  if (reviewsResponse.reviews.length === 0) return <></>;

  return (
    <div
      id="customerReviews"
      className="m-10">
      <ProductReviewsHistogram
        reviewStats={reviewStats}
        changeReviewStarsFilter={changeReviewStarsFilter}
      />
      <div className={`${loading && 'opacity-25'}`}>
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
      <Loading loading={loading} />
    </div>
  );
}
