'use client';

import { useState, useEffect } from 'react';
import Loading from './common/Loading';
import ProductReviewsHistogram from './ProductReviewsHistogram';
import ProductReview from './ProductReview';
import PageChanger from './common/PageChanger';

type ProductReviewsProps = {
  reviewStats: ReviewStats;
  lttProductId: string;
};

export default function ProductReviews({
  reviewStats,
  lttProductId,
}: ProductReviewsProps) {
  const [curLTTProductId, setCurLTTProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [reviewStars, setReviewStars] = useState('');
  const [reviewsResponse, setReviewsResponse] = useState<ReviewResponse>();
  const totalPages = Math.ceil((reviewsResponse?.total_count ?? 0) / 5);

  useEffect(() => {
    if (lttProductId !== curLTTProductId) {
      setCurLTTProductId(lttProductId);
      setLoading(true);
      setPage(1);
      setReviewStars('');
    }
    if (!loading) return;
    const apiURL = '/api/reviews';
    const searchParams = new URLSearchParams({
      lttProductId: curLTTProductId,
      page: page.toString(),
      reviewStars,
    });
    const path = `${apiURL}?${searchParams.toString()}`;
    fetch(path)
      .then((res) => {
        if (res.ok) return res.json();
        console.log(res.statusText);
      })
      .then((res) => {
        setLoading(false);
        setReviewsResponse(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lttProductId, curLTTProductId, loading, page, reviewStars]);

  function changePage(nextPage: number) {
    if (page === nextPage) return;
    setLoading(true);
    setPage(nextPage);
  }

  function changeReviewStars(stars: string) {
    if (reviewStars === stars) return;
    setLoading(true);
    setReviewStars(stars);
  }

  return (
    <>
      {reviewsResponse &&
        reviewsResponse.reviews &&
        reviewsResponse.reviews.length > 0 && (
          <div
            id="customerReviews"
            className="m-10">
            <ProductReviewsHistogram
              reviewStats={reviewStats}
              changeReviewStars={changeReviewStars}
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
                changePage={changePage}
              />
            </div>
            <div className={`${!loading && 'hidden'}`}>
              <Loading />
            </div>
          </div>
        )}
    </>
  );
}
