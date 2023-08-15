'use client';

import Loading from '../../common/Loading';
import PageChanger from '../../common/PageChanger';
import ProductReview from './ProductReview';
import ProductReviewsHistogram from './ProductReviewsHistogram';
import { useEffect, useState, useTransition } from 'react';
// import fetchReviews from '@/packages/serverActions/fetchReviews';

type ProductReviewsProps = {
  reviewStats?: ReviewStats;
  lttProductId: string;
};

export default function ProductReviews({
  reviewStats,
  lttProductId,
}: ProductReviewsProps) {
  const [page, setPage] = useState(1);
  const [reviewStarsFilter, setReviewStarsFilter] = useState('');
  const [reviewsResponse, setReviewsResponse] = useState<ReviewResponse>();
  const [isPending, startTransition] = useTransition();

  function changePage(nextPage: number) {
    if (page === nextPage) return;
    setPage(nextPage);
  }

  function changeFilter(stars: string) {
    if (reviewStarsFilter === stars) return;
    setPage(1);
    setReviewStarsFilter;
  }

  useEffect(() => {
    async function loadReviews() {
      const searchParams = new URLSearchParams({
        lttProductId,
        page: page.toString(),
        reviewStarsFilter,
      });
      const path = `/api/reviews?${searchParams.toString()}`;
      const reviewsResponse = await fetch(path)
        .then((res) => res.json())
        .catch(console.log);
      // const reviewsResponse = await fetchReviews(
      //   lttProductId,
      //   nextPage,
      //   reviewStarsFilter
      // );
      setReviewsResponse(reviewsResponse);
    }
    startTransition(() => loadReviews());
  }, [lttProductId, page, reviewStarsFilter]);

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
