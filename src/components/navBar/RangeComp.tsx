import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import { AppContext } from "../../App";


interface RangeButtonProps { 
    range: number;
    selectedRange: number;
  setSelectedRange: (range: number) => void;
}

const RangeButton: React.FC<RangeButtonProps> = ({ range, selectedRange, setSelectedRange }) => {
    
  const { setPcSelected, setMobileSelected } =
    useContext(AppContext);
  const { t } = useTranslation();

    const isRangeSelected = selectedRange === range;
    const borderColor = isRangeSelected ? "border-main" : "border-lightGrey";


  return (
    <button
      className={`flex-grow text-[12px] rounded-60 h-[35px] flex items-center justify-center gap-1 border-1 ${borderColor}`}
      key={range}
      onClick={(event) => {
        event.stopPropagation();
        setSelectedRange(range);
        setPcSelected("who");
        setMobileSelected("who");
      }}
    >

      {range !== 0 && (
        <div className="flex flex-col justify-center items-center text-[14px] h-[100%]">
          <span className="mb-[-14px]">+</span>
          <span>-</span>
        </div>
      )}
      {range === 0 ? (
        <span>{t("exact_day")}</span>
      ) : range === 1 ? (
        <span>
          {range} {t("day")}
        </span>
      ) : (
        <span>
          {range} {t("days")}
        </span>
      )}
    </button>
  );
}

export default RangeButton

