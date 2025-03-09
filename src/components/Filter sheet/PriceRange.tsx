import { useTranslation } from "react-i18next"
import React from "react";
import axios from "axios";
import LoadingLine from "../ui/LoadingLine";
import Slider from '@mui/material/Slider';
import { useCallback } from 'react';
import {useQuery} from "@tanstack/react-query";

interface PriceRangeProps {
  prices: number[];
  setPrices: (value: number[]) => void;
  roofPrice: number;
}

const fetshData = async () => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { data } = await axios.get(`${url}/api/listing/price-distribution`);
  return data;
}

const PriceRange: React.FC<PriceRangeProps> = ({prices, setPrices, roofPrice}) => {

  const { t } = useTranslation();
  const minDistance = 10;
  const mainColor = "#FF385C";

  const { isLoading, data: pricesArray } = useQuery({
    queryKey: ["price-distribution"],
    queryFn: fetshData,
  });


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
       setPrices([Math.min(newValue[0], prices[1] - minDistance), prices[1]]);
     } else {
       setPrices([prices[0], Math.max(newValue[1], prices[0] + minDistance)]);
     }
   }, [prices]);

  
  const handleFromChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      setPrices([Math.min(newValue, prices[1] - 1), prices[1]]);
    },
    [prices[1]]
  );

  const handleToChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      setPrices([prices[0], Math.max(newValue, prices[0] + 1)]);
    },
    [prices[0]]
  );
 




    
  return (
    <div className="w-[320px] ml-1 lg:w-[350px] ">
      <p className="filterTitleCss">{t("price_range")}</p>

      <div className="chart w-full h-32 mt-[0px] flex gap-[1px] items-end">
        {isLoading ? (
          <LoadingLine />
        ) : (
          pricesArray.map((price: any, index: number) => {
            return (
              <div
                key={index}
                className={`chart_item flex-grow ${
                  price.max >= prices[0] && price.min <= prices[1]
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
        <div className="j">
          <Slider
            getAriaLabel={() => "Minimum distance"}
            value={prices}
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
          <NumberInput
            onChange={handleFromChange}
            value={prices[0]}
            text={t("min")}
          />
          <div className="seper w-[20px] h-[2px] bg-writingGrey rounded-60"></div>
          <NumberInput
            onChange={handleToChange}
            value={prices[1]}
            text={t("max")}
          />
          <button
            className="text-sm font-medium text-writingMainDark"
            onClick={() => {
              setPrices([0, roofPrice]);
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




const NumberInput: React.FC<{
  onChange: (event: any) => void,
  text: string
  value: number
}> = ({
  onChange,
  value,
  text
}) => { 

  const { i18n } = useTranslation();

  return (
    <div className="relative flex-grow h-full rounded-lg bg-white overflow-hidden border border-gray-300 flex items-center shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      <input
        type="number"
        className={`w-full h-full text-sm outline-none text-gray-700 ${
          i18n.language === "en" ? "ml-10" : "mr-[60px]"
        }`}
        value={value}
        onChange={onChange}
      />
      <p
        className={`absolute top-1/2 transform -translate-y-1/2 text-sm text-gray-500 ${
          i18n.language === "en" ? "left-3" : "right-2"
        }`}
      >
        {text}:
      </p>
    </div>
  );
}