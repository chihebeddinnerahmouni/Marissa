import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ar } from "react-day-picker/locale";
import { enUS } from "react-day-picker/locale";
import { useTranslation } from "react-i18next";
import { AppContext} from "../../App";



const SetWhen = () => {
    const { i18n } = useTranslation();
  const { when , setWhen } = React.useContext(AppContext);

  return (
    <div className={`flex flex-col items-center`} style={{ direction: "ltr" }}>
      <DayPicker
        mode="single"
        selected={when}
        onSelect={setWhen}
        className=""
        locale={i18n.language === "en" ? enUS : ar}
      />

      {/* <div className="ranges mt-6 flex items-center justify-between w-full gap-2">
        {DaysRangeArray.map((range: number) => (
          <RangeButton
            key={range}
            range={range}
            selectedRange={daysRange}
            setSelectedRange={setDaysRange}
          />
        ))}
      </div> */}
    </div>
  );
};

export default SetWhen;
