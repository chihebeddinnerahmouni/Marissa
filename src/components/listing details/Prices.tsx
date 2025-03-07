import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NumbersHandlers from "../inquiry forms/NumbersHandlers";
import PageName from "./PageName";
import InputNumber from "@/components/ui/inputs/InputNumber";

const Prices = () => {
  const { setProgress, steps, price, setPrice, minHours, setMinHours, maxHours, setMaxHours, name, desc, lat, long, selectedFeatures, selectedImages, category, region, guests } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const check = [name, desc, lat, long, selectedFeatures, selectedImages, category, region, guests]
    const checkValues = check.some((item) => !item || item.length === 0);
    if (checkValues) {
      return navigate("/boats-list/title");
    }
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
    navigate("/boats-list/specific-dates");
  };

  return (
    <div className="w-full md:w-[500px]">
      <PageName text={t("set_prices")} />

      <div className="border p-3 rounded shadow-hoverShadow">
          <p className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            {t("price_per_hour")}
          </p>
          <InputNumber
            value={price}
            setValue={(e: any) =>
              setPrice(e.target.value >= 0 ? e.target.value : 0)
            }
            label="Enter Price"
          />

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
      </div>

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Prices;
