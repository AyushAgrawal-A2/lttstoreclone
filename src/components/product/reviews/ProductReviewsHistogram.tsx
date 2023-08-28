"use client";

import RatingStars from "@/src/components/common/RatingStars";

interface ProductReviewsHistogramProps {
  reviewStats: ReviewStats;
  changeFilter: (stars: string) => void;
}

export default function ProductReviewsHistogram({
  reviewStats,
  changeFilter,
}: ProductReviewsHistogramProps) {
  const totalReviews = Object.keys(reviewStats).reduce(
    (sum, star_x) => sum + reviewStats[star_x as keyof ReviewStats],
    0,
  );
  return (
    <div className="py-4">
      <div className="text-2xl font-semibold">Customer Reviews</div>
      <div className="flex">
        <div className="pr-4 border-r">
          <RatingStars stars={5} />
          <div className="text-fgTertiary">Based on {totalReviews} reviews</div>
        </div>
        <div className="px-4 border-r">
          {Object.keys(reviewStats)
            .sort((a, b) => b.localeCompare(a))
            .map((star_x, idx) => {
              const stars = 5 - idx;
              const percent = Math.round(
                (reviewStats[star_x as keyof ReviewStats] / totalReviews) * 100,
              );
              return (
                <div
                  key={stars}
                  onClick={() => changeFilter(stars.toString())}
                  className="flex items-center text-sm hover:cursor-pointer hover:opacity-50"
                >
                  <RatingStars stars={stars} />
                  <div className="h-[18px] w-[100px] m-1 border border-neutral-700">
                    <div
                      className={`h-full bg-gradient`}
                      style={{ width: `${percent}px` }}
                    ></div>
                  </div>
                  <div className="w-10 px-1">{percent}%</div>
                  <div>({reviewStats[star_x as keyof ReviewStats]})</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
