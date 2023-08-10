'use client';

import API_ENDPOINT from '@/packages/config/api_endpoints';
import ProductReviewsHistogram from './ProductReviewsHistogram';
import ProductReview from './ProductReview';
import PageChanger from '../../common/PageChanger';
import Loading from '../../common/Loading';
import { useEffect, useState, useTransition } from 'react';
import { load } from 'cheerio';

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
    const searchParams = new URLSearchParams({
      lttProductId,
      page: page.toString(),
      reviewStarsFilter,
    });
    const path = `${API_ENDPOINT}/reviews?${searchParams.toString()}`;
    fetch(path)
      .then((res) => res.json())
      .then((reviewsResponse) => {
        setLoading(false);
        setReviewsResponse(reviewsResponse);
      })
      .catch(console.log);
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
