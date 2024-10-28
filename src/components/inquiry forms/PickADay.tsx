import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CalendarCustom from "../ui/CalendarCustom";

interface PickADayProps {
  setIsCalendarOpen: any;
  setDate: any;
  date: any;
}

  const reserved = [
"2024-11-13", "2024-11-27", "2024-12-02"
  ]

const PickADay: React.FC<PickADayProps> = ({
  setIsCalendarOpen,
  setDate,
  date,
}) => {
  const { t } = useTranslation();
  const [isDayGood, setIsDayGood] = useState<string>("good");
  const [selectedDate, setSelectedDate] = useState<any>();

  return (
    <div className="calendarCont px-5 py-7 bg-[#ffffff] absolute top-[0px] rounded-10 w-full flex flex-col items-center">
      <p className="text-[18px] font-medium text-writingMainDark">{date}</p>

      <div className="con w-full mt-7 bg-[#fff1f4] border-2 overflow-hidden rounded-[10px]">
        <div className="calendarCont w-full ">
          <CalendarCustom
            reserved={reserved}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        {isDayGood === "good" && (
          <div className="looks mt- p-2 rounded-[5px] bg-creme w-full flex items-center gap-4">
            <img
              src="https://cdn.vectorstock.com/i/1000x1000/87/92/perfect-vector-27808792.webp"
              alt=""
              className="w-8 h-8 rounded-50 object-cover object-center"
            />
            <p className="text-sm">
              <span className="font-semibold text-writingMainDark">
                {t("looks_good")}
              </span>{" "}
              <span>{t("this_date_is_available")}</span>
            </p>
          </div>
        )}
        {isDayGood === "inDemande" && (
          <div className="looks mt- p-2 rounded-[5px] bg-creme w-full flex items-center gap-4">
            <img
              src="https://cdn.vectorstock.com/i/1000x1000/87/92/perfect-vector-27808792.webp"
              alt=""
              className="w-8 h-8 rounded-50 object-cover object-center"
            />
            <p className="text-sm">
              <span className="font-semibold">{t("in_demande")}</span>{" "}
              <span>{t("others_are_asking_about_this_available_date")}</span>
            </p>
          </div>
        )}
        {isDayGood === "reserved" && (
          <div className="looks mt- p-2 rounded-[5px] bg-creme w-full flex items-center gap-4">
            <img
              src="https://cdn.vectorstock.com/i/1000x1000/87/92/perfect-vector-27808792.webp"
              alt=""
              className="w-8 h-8 rounded-50 object-cover object-center"
            />
            <p className="text-sm">
              <span className="font-semibold">{t("reserved")}</span>{" "}
              <span>{t("this_date_is_reserved")}</span>
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setDate("10-1-2021");
          setIsCalendarOpen(false);
          setIsDayGood("good");
        }}
        className="w-full h-10 bg-mainBlue text-white bg-main rounded-[5px] mt-10"
      >
        {t("confirm")}
      </button>
    </div>
  );
};

export default PickADay;
