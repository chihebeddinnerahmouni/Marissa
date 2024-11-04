
import StarRatings from "react-star-ratings"
import { useTranslation } from "react-i18next";

const RatingByStars = ({ title, rating }: any) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between flex-wrap">
      <p className="text-sm font-medium text-writingGrey lg:text-base">
        {t(title)}
      </p>
      <StarRatings
        rating={Math.floor(rating)}
        starRatedColor="#FFD700"
        numberOfStars={5}
        name="rating"
        starDimension="20px"
        starSpacing="1px"
      />
    </div>
  );
}

export default RatingByStars
