import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NumbersHandlers from "../inquiry forms/NumbersHandlers";

const Prices = () => {
  const { setProgress, steps } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [minHours, setMinHours] = useState(0);
  const [maxHours, setMaxHours] = useState(0);

  useEffect(() => {
    setProgress((100 / steps) * 9);
  }, []);

  const handleContinue = () => {
    const check = !price || !minHours || !maxHours;
    if (check) {
      return Swal.fire({
        title: "Oops...",
        text: "Please enter valid values for all fields!",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
      }
      
      if (minHours > maxHours) {
        return Swal.fire({
          title: "Oops...",
          text: "Minimum hours should be less than maximum hours!",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      }

    sessionStorage.setItem("Listing_details_price", price.toString());
    sessionStorage.setItem("Listing_details_minHours", minHours.toString());
    sessionStorage.setItem("Listing_details_maxHours", maxHours.toString());
    navigate("/boats-list/specific-dates");
  };

  return (
    <div className="w-full md:w-[500px]">
      <p className="text-[25px] font-bold mb-5">{t("set_prices")}</p>

      <div className="">
        <p className="text-sm pb-2">{t("price_per_hour")}</p>
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(Number(e.target.value) < 0 ? 0 : Number(e.target.value));
          }}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:border-main focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105 outline-main"
        />
        {/* <label className="block mb-2">{t("price_per_hour")}</label>
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(Number(e.target.value) < 0 ? 0 : Number(e.target.value));
          }}
          className="w-full p-2 border border-main rounded outline-main"
        /> */}
      </div>

      <div className="hours flex w-full justify-around my-10">
        <div className="minHours flex flex-col items-center">
          <p className="mb-3 text-sm lg:text-base">{t("min_hours")}</p>
          <NumbersHandlers value={minHours} setValue={setMinHours} />
        </div>
        <div className="maxhours flex flex-col items-center">
          <p className="mb-3 text-sm lg:text-base">{t("max_hours")}</p>
          <NumbersHandlers value={maxHours} setValue={setMaxHours} />
        </div>
      </div>

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Prices;
