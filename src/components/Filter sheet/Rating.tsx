import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";

interface RatingProps { 
    minRating: number;
    setMinRating: (value: number) => void;
    maxRating: number;
    setMaxRating: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({minRating, setMinRating, maxRating, setMaxRating}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white">
      <p className="filterTitleCss">{t("rating")}</p>
      <div className="rating flex items-center justify-between mt-3">
        <div className="min flex items-center gap-2">
          <p className="text-writingGrey font-medium text-sm lg:text-[16px]">
            {t("min")}:
          </p>
          <StarRatings
            rating={minRating}
            changeRating={setMinRating}
            starRatedColor="#FFD700"
            starEmptyColor="#dddcdc"
            starHoverColor="#FFD700"
            numberOfStars={5}
            name="rating"
            starDimension="22px"
            starSpacing="1px"
          />
        </div>

        <div className="max flex items-center gap-2">
          <p className="text-writingGrey font-medium text-sm lg:text-base">
            {t("max")}:
          </p>
          <StarRatings
            rating={maxRating}
            changeRating={setMaxRating}
            starRatedColor="#FFD700"
            starEmptyColor="#dddcdc"
            starHoverColor="#FFD700"
            numberOfStars={5}
            name="rating"
            starDimension="22px"
            starSpacing="1px"
          />
        </div>
      </div>
    </div>
  );
};

export default Rating;
