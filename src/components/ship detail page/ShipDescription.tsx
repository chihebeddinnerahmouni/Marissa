import StarRatings from "react-star-ratings";
import { useTranslation } from "react-i18next";
import { IoShareOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

const ShipDescription = ({ ship }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="titleButtons mt-3 lg:mt-5 md:flex md:justify-between md:items-start">
        <p className="font-medium text-writingMainDark lg:text-[25px] md:w-[80%] lg:w-[90%]">
          {ship.name}
        </p>

        <div className="buttons flex gap-3 mt-3 lg:mt-0">
          <button
            className={`w-[35px] h-[35px] border-writingMainDark border-1 rounded-50 flex items-center justify-center lg:w-[40px] lg:h-[40px] lg:border-2`}
          >
            <IoShareOutline className="text-writingMainDark text-2xl lg:text-[26px]" />
          </button>
          <button
            className={`w-[35px] h-[35px] border-writingMainDark border-1 rounded-50 flex items-center justify-center lg:w-[40px] lg:h-[40px] lg:border-2`}
          >
            <CiHeart className="text-writingMainDark text-2xl lg:text-[26px]" />
          </button>
        </div>
      </div>

      {/* stars and ... */}
      <div className="others flex flex-col items-start mt-3 gap-2 md:items-center md:flex-row lg:gap-4 lg:mt-2">
        <StarRatings
          rating={ship.rate}
          starRatedColor="#FFD700"
          starEmptyColor="#dddcdc"
          numberOfStars={5}
          name="rating"
          starDimension="17px"
          starSpacing="2px"
        />
        <p className="text-sm text-writingMainDark">
          ({ship.reviews} {t("reviews")})
        </p>
        <p className="text-sm text-writingMainDark">
          {ship.booking} {t("booking")}
        </p>
        <p className="text-[15px] font-medium text-writingMainDark lg:text-[17px]">
          {ship.location}
        </p>
      </div>
    </>
  );
};

export default ShipDescription;
