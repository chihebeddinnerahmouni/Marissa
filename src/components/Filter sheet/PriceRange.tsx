import { useTranslation } from "react-i18next"
import { useState } from "react"
import pricesArray from "@/assets/files/prices_pourcentage_array";



const PriceRange = () => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(999);

  const handleFromChange = (event: any) => {
    const newValue = event.target.value;
    if (newValue < toValue && newValue < 1000) {
      setFromValue(newValue);
    }
  };

  const handleToChange = (event: any) => {
    const newValue = event.target.value;
    if (newValue > fromValue && newValue < 1000) {
      if (newValue > 100)
        setToValue(newValue);
    }
  };

    const { t, i18n } = useTranslation();
  return (
    <div className="w-full bg-white ">
      <p className="filterTitleCss">{t("price_range")}</p>

      <div className="chart w-full h-32 mt-[-60px] flex gap-[1px] items-end">
        {pricesArray.map((price, index) => {
          return (
            <div
              key={index}
              className={`chart_item flex-grow
               ${
                 price.max >= fromValue && price.min <= toValue
                   ? "bg-writingMainDark"
                   : "bg-darkGrey"
               }`}
              style={{ height: `${price.pourcentage}%` }}
            ></div>
          );
        })}
      </div>

      <div className="range_container">
        <div className="sliders_control">
          <input
            id="fromSlider"
            type="range"
            value={fromValue}
            min="0"
            max="1000"
            onChange={handleFromChange}
          />
          <input
            id="toSlider"
            type="range"
            value={toValue}
            min="0"
            max="1000"
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
              value={fromValue}
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
              value={toValue}
              onChange={handleToChange}
            />
            <p className={`absolute top-[50%] translate-y-[-50%] text-sm text-writingGrey ${
                i18n.language === "en" ? "left-1" : "right-1"
              }`}>
              {t("max")}
            </p>
          </div>

          <button
            className="text-sm font-medium text-writingMainDark"
            onClick={() => {
              setFromValue(0);
              setToValue(1000);
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
