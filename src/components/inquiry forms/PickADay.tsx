import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CalendarCustom from "../ui/CalendarCustom";

interface PickADayProps {
  setIsCalendarOpen: any;
  setDate: any;
  date: any;
}

const PickADay: React.FC<PickADayProps> = ({
  setIsCalendarOpen,
  setDate,
  date,
}) => {
  const { t } = useTranslation();
  const [isDayGood, setIsDayGood] = useState<string>("good");

  return (
    <div className="calendarCont px-5 py-7 bg-[#ffffff] absolute top-[0px] rounded-10 w-full flex flex-col items-center">
      <p className="text-[18px] font-medium text-writingMainDark">{date}</p>

      <div className="con w-full mt-7 bg-[#fff1f4] border-2 overflow-hidden rounded-[10px]">
        <div className="calendarCont w-full ">
          <CalendarCustom />
        </div>

        {isDayGood === "good" && (
          <div className="looks mt- p-2 rounded-[5px] bg-[#fff5f7] w-full flex items-center gap-4">
            <img
              src="https://cdn.vectorstock.com/i/1000x1000/87/92/perfect-vector-27808792.webp"
              alt=""
              className="w-8 h-8 rounded-50 object-cover object-center"
            />
            <p className="text-sm">
              <span className="font-semibold text-writingMainDark">
                Looks Good,
              </span>{" "}
              <span>this date is available</span>
            </p>
          </div>
        )}
        {isDayGood === "inDemande" && (
          <p className="text-sm">
            <span className="font-semibold">In Demand,</span>{" "}
            <span>Others are asking about this available date.</span>
          </p>
        )}
      </div>

      <button
        onClick={() => { setDate("10-1-2021"); setIsCalendarOpen(false); setIsDayGood("good") }}
        className="w-full h-10 bg-mainBlue text-white bg-main rounded-[5px] mt-10"
      >
        {t("confirm")}
      </button>
    </div>
  );
};

export default PickADay;
