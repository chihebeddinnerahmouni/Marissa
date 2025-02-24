import React, { useState, useCallback } from "react";
import PriceRange from "@/components/Filter sheet/PriceRange";
import Capasity from "@/components/Filter sheet/Capasity";
import Rating from "@/components/Filter sheet/Rating";
import Availability from "@/components/Filter sheet/Availability";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

interface FilterSheetProps {
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
}

const FilterSheet: React.FC<FilterSheetProps> = ({
  setIsSheetOpen,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const roofPrice = 1299;

  const close = () => {
    setIsSheetOpen(false);
  };

  
  const [capacity, setCapacity] = useState<number>(0)
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(0);
  const [availability, setAvailability] = useState<string>("now");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(roofPrice);

  
  const send = useCallback(() => {
    const capacityParams = capacity ? `&capacity=${capacity.toString()}` : "";
    const minRatingParams = minRating
      ? `&minRating=${minRating.toString()}`
      : "";
    const maxRatingParams = maxRating
      ? `&maxRating=${maxRating.toString()}`
      : "";
    const availabilityParams = availability
      ? `&availability=${availability}`
      : "";
    const minPriceParams = minPrice ? `&minPrice=${minPrice.toString()}` : "";
    const maxPriceParams = maxPrice ? `&maxPrice=${maxPrice.toString()}` : "";
    const params = `${capacityParams}${minRatingParams}${maxRatingParams}${availabilityParams}${minPriceParams}${maxPriceParams}`;
    setIsSheetOpen(false);
    navigate(`/rental?${params}`);
  }, []);


  return (
    <Box
      sx={{
        width: { xs: "360px", md: "400px" },
      }}
      role="presentation"
      className={`p-3 min-h-screen flex flex-col items-center justify-between relative lg:p-5`}
      >
      <button
        className={`absolute top-[20px] md:top-[36px] lg:top-[28px] ${
          i18n.language === "en" ? "right-[20px]" : "left-[20px]"
        }`}
        onClick={close}
      >
        <MdOutlineCloseFullscreen className="text-[18px] text-main lg:text-[20px]" />
      </button>
      <div className="content w-full fle flex-col items-center">
        <PriceRange
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          roofPrice={roofPrice}
        />
        <div className="hr w-full h-[0.1px] bg-darkGrey my-4 lg:my-7"/>
        <Capasity capacity={capacity} setCapacity={setCapacity} />
        <div className="hr w-full h-[0.1px] bg-darkGrey my-4 lg:my-7"/>
        <Rating
          minRating={minRating}
          setMinRating={setMinRating}
          maxRating={maxRating}
          setMaxRating={setMaxRating}
        />
        <div className="hr w-full h-[0.1px] bg-darkGrey my-4 lg:my-7"/>
        <Availability
          availability={availability}
          setAvailability={setAvailability}
        />
      </div>

      <button
        className="w-[100%] min-h-[50px] bg-main text-white rounded-10 mt-12 hover:bg-mainHover"
        onClick={send}
      >
        {t("search")}
      </button>
     {/* </div> */}
    </Box>
  );
};

export default FilterSheet;
