import StarRatings from "react-star-ratings";
import { useTranslation } from "react-i18next";
import { IoShareOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import { useState } from "react";
import isloggedin from "../../lib/isLogedin";
import { useMutation } from "@tanstack/react-query";
import {axios_error_handler} from "@/functions/axios_error_handler";
import { lineSpinner } from "ldrs";

lineSpinner.register(); 
const favoriteFunc = async (listing_id: number) => {
  const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL_LISTING}/api/favourites/toggle-favourite`,
      {
        listing_id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
      return data;
}


const ShipDescription = ({ ship }: any) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(ship.isFavourite);
  const { mutate, isPending } = useMutation({
    mutationFn: favoriteFunc,
    onError: (error) => {
      axios_error_handler(error, t);
    },
    onSuccess: () => {
      setIsFavorite(!isFavorite);
    },
  });
  const favoriteHandler = () => {
    mutate(ship.id);
  }



  return (
    <>
      <div className="titleButtons mt-3 lg:mt-5 md:flex md:justify-between md:items-start">
        <p className="font-semibold text-writingMainDark lg:text-[25px] md:w-[80%] lg:w-[90%] lg:font-bold">
          {ship.title}
        </p>

        <div className="buttons flex gap-3 mt-3 lg:mt-0">
          {isloggedin() && (
            <button
              className={`w-[35px] h-[35px]  border-1 rounded-50 flex items-center justify-center lg:w-[40px] lg:h-[40px] lg:border-2
            ${
              isFavorite
                ? "bg-main text-white border-main"
                : "border-writingMainDark"
            }`}
              onClick={favoriteHandler}
              disabled={isPending}
            >
              {isPending ? (
                <l-line-spinner
                  size="15"
                  stroke="3"
                  speed="1"
                  color="black"
                ></l-line-spinner>
              ) : (
                <CiHeart className="text-2xl lg:text-[26px]" />
              )}
            </button>
          )}
          <button
            className={`w-[35px] h-[35px] border-writingMainDark border-1 rounded-50 flex items-center justify-center lg:w-[40px] lg:h-[40px] lg:border-2`}
          >
            <IoShareOutline className="text-writingMainDark text-2xl lg:text-[26px]" />
          </button>
        </div>
      </div>

      {/* stars and ... */}
      <div className="others flex flex-col items-start mt-3 gap-2 md:items-center md:flex-row lg:gap-4 lg:mt-2">
        <StarRatings
          rating={ship.rating}
          starRatedColor="#FFD700"
          starEmptyColor="#dddcdc"
          numberOfStars={5}
          name="rating"
          starDimension="17px"
          starSpacing="2px"
        />
        <p className="text-sm text-writingMainDark">
          ({Array.isArray(ship.reviews) ? ship.reviews.length : 0}{" "}
          {t("reviews")})
        </p>
        <p className="text-[15px] font-medium text-writingMainDark lg:text-[17px]">
          {ship.region}
        </p>
      </div>
    </>
  );
};

export default ShipDescription;
