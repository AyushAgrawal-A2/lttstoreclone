import {
  faStar as faEmpty,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type RatingStarsProps = {
  stars: number;
};

export default function RatingStars({ stars }: RatingStarsProps) {
  const star = Math.round(stars * 2);
  const full = Math.floor(star / 2);
  const half = star - 2 * full;
  const empty = 5 - full - half;

  return (
    <div>
      {Array(full)
        .fill(0)
        .map((_, idx) => (
          <FontAwesomeIcon
            key={`full${idx}`}
            icon={faStar}
            className="text-LTTOrange"
          />
        ))}
      {Array(half)
        .fill(0)
        .map((_, idx) => (
          <FontAwesomeIcon
            key={`half${idx}`}
            icon={faStarHalfStroke}
            className="text-LTTOrange"
          />
        ))}
      {Array(empty)
        .fill(0)
        .map((_, idx) => (
          <FontAwesomeIcon
            key={`empty${idx}`}
            icon={faEmpty}
            className="text-LTTOrange"
          />
        ))}
    </div>
  );
}
