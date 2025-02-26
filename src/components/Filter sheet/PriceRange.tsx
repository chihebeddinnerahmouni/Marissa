import { useTranslation } from "react-i18next"
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingLine from "../ui/LoadingLine";
import Slider from '@mui/material/Slider';
import {useCallback} from 'react';

interface PriceRangeProps {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  roofPrice: number;
}

const PriceRange: React.FC<PriceRangeProps> = ({minPrice, setMinPrice, maxPrice, setMaxPrice, roofPrice}) => {

  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [pricesArray, setPricesArray] = useState<any>([]);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const minDistance = 10;
  const [value1, setValue1] = useState<number[]>([minPrice, maxPrice]);
  const mainColor = "#FF385C";

  function valuetext(value: number) {
    return `${value}°C`;
  }

   const handleChange1 = useCallback((
     _event: Event,
     newValue: number | number[],
     activeThumb: number
   ) => {
     if (!Array.isArray(newValue)) {
       return;
     }

     if (activeThumb === 0) {
       setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
     } else {
       setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
     }
   }, [value1]);

  
  const handleFromChange = useCallback((event: any) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue < maxPrice && newValue < roofPrice) {
      setMinPrice(newValue);
    } else if (newValue >= maxPrice) {
      setMinPrice(maxPrice - 1);
    }
  }, [maxPrice, roofPrice]);

  const handleToChange = useCallback((event: any) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue > minPrice && newValue < roofPrice) {
      setMaxPrice(newValue);
    } else if (newValue <= minPrice) {
      setMaxPrice(minPrice + 1);
    }
  }, [minPrice, roofPrice]);
 


  useEffect(() => { 
    axios.get(`${url}/api/listing/price-distribution`)
      .then((response) => {
        setPricesArray(response.data);
        // console.log(response.data);
        setLoading(false);
      }
    )
      .catch(() => {
        setLoading(false);
      });
  }, []);



    
  return (
    <div className="w-[320px] ml-1 lg:w-[350px] ">
      <p className="filterTitleCss">{t("price_range")}</p>

      <div className="chart w-full h-32 mt-[0px] flex gap-[1px] items-end">
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
        {/* <div className="sliders_control">
          <input
            id="fromSlider"
            type="range"
            value={minPrice}
            min="0"
            max={roofPrice}
            onChange={handleFromChange}
          />
          <input
            id="toSlider"
            type="range"
            value={maxPrice}
            min="0"
            max={roofPrice}
            onChange={handleToChange}
          />
        </div> */}
        <div className="j">
          <Slider
            getAriaLabel={() => "Minimum distance"}
            value={value1}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            min={0}
            max={roofPrice}
            valueLabelFormat={(value) => `${value} €`}
            color="secondary"
            sx={{
              "& .MuiSlider-thumb": {
                backgroundColor: mainColor,
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: mainColor,
              },
              "& .MuiSlider-track": {
                backgroundColor: mainColor,
              },
              "& .MuiSlider-rail": {
                backgroundColor: mainColor,
              },
            }}
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
              setMaxPrice(roofPrice);
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
