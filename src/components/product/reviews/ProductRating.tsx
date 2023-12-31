"use client";

import { useCallback } from "react";
import RatingStars from "@/src/components/common/RatingStars";

type ProductRatingProps = {
  rating: Rating;
};

export default function ProductRating({
  rating: { stars, reviews },
}: ProductRatingProps) {
  const handleClick = useCallback(() => {
    document.getElementById("customerReviews")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, []);

  if (stars === 0 && reviews === 0) return <></>;

  return (
    <div
      className="py-1 hover:cursor-pointer w-max max-w-full mx-auto md:mx-0"
      onClick={handleClick}>
      <RatingStars stars={stars} />
      <span className="my-1 font-semibold text-fgTertiary pl-1">
        {reviews} reviews
      </span>
    </div>
  );
}
