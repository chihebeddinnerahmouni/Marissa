import { useTranslation } from "react-i18next"
// import prices_array from "@/assets/files/prices_pourcentage_array";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingLine from "../ui/LoadingLine";

interface PriceRangeProps {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({minPrice, setMinPrice, maxPrice, setMaxPrice}) => {

  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [pricesArray, setPricesArray] = useState<any>([]);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  
  const handleFromChange = (event: any) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue < maxPrice && newValue < 12399) {
      setMinPrice(newValue);
    } else if (newValue >= maxPrice) {
      setMinPrice(maxPrice - 1);
    }
  };

  const handleToChange = (event: any) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue > minPrice && newValue < 12399) {
      setMaxPrice(newValue);
    } else if (newValue <= minPrice) {
      setMaxPrice(minPrice + 1);
    }
  };
 


  useEffect(() => { 
    axios.get(`${url}/api/listing/price-distribution`)
      .then((response) => {
        setPricesArray(response.data);
        setLoading(false);
      }
    )
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);



    
  return (
    <div className="w-full bg-white ">
      <p className="filterTitleCss">{t("price_range")}</p>

      <div className="chart w-full h-32 mt-[-60px] flex gap-[1px] items-end">
        {loading ? (
          <LoadingLine />
        ) : (
          pricesArray.map((price: any, index: number) => {
            return (
              <div
                key={index}
                className={`chart_item flex-grow ${
                  price.max >= minPrice && price.min <= maxPrice
                    ? "bg-writingMainDark"
                    : "bg-darkGrey"
                }`}
                style={{ height: `${price.pourcentage}%` }}
              ></div>
            );
          })
        )}
      </div>

      <div className="range_container">
        <div className="sliders_control">
          <input
            id="fromSlider"
            type="range"
            value={minPrice}
            min="0"
            max="12399"
            onChange={handleFromChange}
          />
          <input
            id="toSlider"
            type="range"
            value={maxPrice}
            min="0"
            max="12399"
            onChange={handleToChange}
          />
        </div>
        <div className="inputs flex h-[35px] mt-5 items-center justify-between gap-2">
          <div className="relative min flex-grow h-full rounded-10 bg-white overflow-hidden border-1 border-greyBorder flex items-center">
            <input
              type="number"
              min="0"
              max="1000"
              className={`w-full h-full text-sm outline-none text-writingMainDark ${
                i18n.language === "en" ? "ml-10" : "mr-10"
              }`}
              value={minPrice}
              onChange={handleFromChange}
            />
            <p
              className={`absolute top-[50%] translate-y-[-50%] text-sm text-writingGrey ${
                i18n.language === "en" ? "left-1" : "right-1"
              }`}
            >
              {t("min")}
            </p>
          </div>

          <div className="seper w-[20px] h-[2px] bg-writingGrey rounded-60"></div>

          <div className="relative max flex-grow h-full rounded-10 bg-white overflow-hidden border-1 border-greyBorder flex items-center">
            <input
              type="number"
              min="0"
              max="1000"
              className={`w-full h-full text-sm outline-none text-writingMainDark ${
                i18n.language === "en" ? "ml-10" : "mr-11"
              }`}
              value={maxPrice}
              onChange={handleToChange}
            />
            <p
              className={`absolute top-[50%] translate-y-[-50%] text-sm text-writingGrey ${
                i18n.language === "en" ? "left-1" : "right-1"
              }`}
            >
              {t("max")}
            </p>
          </div>

          <button
            className="text-sm font-medium text-writingMainDark"
            onClick={() => {
              setMinPrice(0);
              setMaxPrice(12399);
            }}
          >
            {t("reset")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceRange
