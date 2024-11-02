import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NumbersHandlers from "../inquiry forms/NumbersHandlers";

const Prices = () => {
  const { setProgress, steps, price, setPrice, minHours, setMinHours, maxHours, setMaxHours } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [price, setPrice] = useState(0);
  // const [minHours, setMinHours] = useState(0);
  // const [maxHours, setMaxHours] = useState(0);

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

    // sessionStorage.setItem("Listing_details_price", price.toString());
    // sessionStorage.setItem("Listing_details_minHours", minHours.toString());
    // sessionStorage.setItem("Listing_details_maxHours", maxHours.toString());
    navigate("/boats-list/specific-dates");
  };

  return (
    <div className="w-full md:w-[500px]">
      <p className="text-[25px] font-bold mb-5">{t("set_prices")}</p>

        <div className="">
          <label
            htmlFor="pricePerHour"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            {t("price_per_hour")}
          </label>
          <input
            type="number"
            value={price}
            id="pricePerHour"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-main"
            onChange={(e) =>
              setPrice(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)
            }
          />
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
