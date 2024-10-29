import StarRatings from "react-star-ratings"
import { useTranslation } from "react-i18next";

const ReviewByStars = ({ ship }: any) => {
    const { t } = useTranslation();
  return (
    <div className="w-full grid grid-cols-1 gap-5 2xl:grid-cols-2 lg:gap-x-10">
      <div
        className="flex items-center justify-between flex-wrap"
      >
        <p className="text-sm font-medium text-writingGrey lg:text-base">
          {/* {t(review.title)} */}
          communication
        </p>
        <StarRatings
          rating={Math.floor(ship.averageRatings.communication)}
          starRatedColor="#FFD700"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="1px"
        />
      </div>
    </div>
  );
}

export default ReviewByStars
