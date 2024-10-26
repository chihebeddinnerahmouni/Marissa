import ReactModal from "react-modal"
import React, {useState} from "react";
import PriceRange from "@/components/Filter sheet/PriceRange";
import Capasity from "@/components/Filter sheet/Capasity";
import Rating from "@/components/Filter sheet/Rating";
import Availability from "@/components/Filter sheet/Availability";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface FilterSheetProps { 
    isSheetOpen: boolean;
    setIsSheetOpen: (value: boolean) => void;
}



const FilterSheet: React.FC<FilterSheetProps> = ({ isSheetOpen, setIsSheetOpen }) => {
    
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

    const close = () => {
        setIsSheetOpen(false)
  }

  const send = () => {
    const capacityParams = capacity ? `&capacity=${capacity.toString()}` : "";
    const minRatingParams = minRating ? `&minRating=${minRating.toString()}` : "";
    const maxRatingParams = maxRating ? `&maxRating=${maxRating.toString()}` : "";
    const availabilityParams = availability
    const minPriceParams = minPrice ? `&minPrice=${minPrice.toString()}` : "";
    const maxPriceParams = maxPrice ? `&maxPrice=${maxPrice.toString()}` : "";
    const params = `${capacityParams}${minRatingParams}${maxRatingParams}${availabilityParams}${minPriceParams}${maxPriceParams}`;
    setIsSheetOpen(false);
    navigate(`/rental?${params}`);

  };
  
  const [capacity, setCapacity] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(0);
  const [availability, setAvailability] = useState<string>("now");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  

  return (
    <ReactModal
      isOpen={isSheetOpen}
      onRequestClose={() => setIsSheetOpen(false)}
      className={`z-20 bg-white overflow-auto scrollbar-hide outline-none absolute px-6 py-5 w-full h-screen flex flex-col items-center justify-between shadow-2xl
       md:w-[400px] md:top-0 md:p-9 ${
         i18n.language === "en" ? "md:left-0" : "right-0"
       }
       lg:w-[400px] lg:px-6 lg:left-0 lg:top-0
       2xl:w-[400px] 2xl:px-6 ${
         i18n.language === "en" ? "fromLeft" : "fromRight"
       }`}
      overlayClassName={`fixed inset-0 z-20 scrollbar-hide bg-black bg-opacity-10`}
    >
      <button
        className={`absolute top-[20px] md:top-[36px] lg:top-[28px] ${
          i18n.language === "en" ? "right-[20px]" : "left-[20px]"
        }`}
        onClick={close}
      >
        <MdOutlineCloseFullscreen className="text-[18px] text-main lg:text-[20px]" />
      </button>
      <div className="content w-full flex flex-col items-center max-w-[400px]">
        <PriceRange
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        <div className="hr w-full h-[0.1px] bg-darkGrey my-4 lg:my-7"></div>
        <Capasity capacity={capacity} setCapacity={setCapacity} />
        <div className="hr w-full h-[0.1px] bg-darkGrey my-4 lg:my-7"></div>
        <Rating
          minRating={minRating}
          setMinRating={setMinRating}
          maxRating={maxRating}
          setMaxRating={setMaxRating}
        />
        <div className="hr w-full h-[0.1px] bg-darkGrey my-4 lg:my-7"></div>
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
    </ReactModal>
  );
};

export default FilterSheet
