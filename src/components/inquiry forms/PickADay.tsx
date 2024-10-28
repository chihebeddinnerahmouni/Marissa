import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CalendarCustom from "../ui/CalendarCustom";
import { MdThumbUp } from "react-icons/md";
import { FaRegFaceTired } from "react-icons/fa6";


interface PickADayProps {
  setIsCalendarOpen: any;
  setDate: any;
}

 const reserved = [
{
  "startDate": "2024-11-13",
  "endDate": "2024-11-13"
},
{
  "startDate": "2024-11-27",
  "endDate": "2024-11-27"
},
{
  "startDate": "2024-12-02",
  "endDate": "2024-12-12"
}
  ]

const PickADay: React.FC<PickADayProps> = ({
  setIsCalendarOpen,
  setDate,
}) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<any>();
  const [availableCheck, setAvailableCheck] = useState<string>("");


  useEffect(() => {
    setAvailableCheck("");
  }, [selectedDate]);

  // Function to get dates in range
  const getDatesInRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date).toISOString().split("T")[0]);
    }
    return dates;
  };
  const check = () => {
    const selectedDateString = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    const reserveddatesString: string[] = [];

    reserved.forEach(({ startDate, endDate }) => {
      const dates = getDatesInRange(startDate, endDate);
      reserveddatesString.push(...dates);
    });

    const isReserved = reserveddatesString.includes(selectedDateString);
    setAvailableCheck(isReserved ? "reserved" : "available");
  };
  // end of the check function

  // Function to confirm the date
  const confirm = () => {
    if (availableCheck === "reserved") return;
    const selectedDateString = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
      setDate(selectedDateString);
      setIsCalendarOpen(false);
  };

  return (
    <div className="calendarCont px-5 bg-white py-7 absolute top-[0px] rounded-10 w-full flex flex-col items-center">
      <div className="con w-full mt-7 border-2 overflow-hidden rounded-[10px]">
        <div className="calendarCont w-full ">
          <CalendarCustom
            reserved={reserved}
            setSelectedDate={setSelectedDate}
          />
        </div>
        {availableCheck === "available" && (
          <div className="looks p-2 bg-white rounded-[5px] w-full flex items-center justify-center gap-4">
            <MdThumbUp className="text-3xl text-green-500" />
            <p className="text-sm">
              <span className="font-semibold text-writingMainDark">
                {t("looks_good")}
              </span>{" "}
              <span>{t("this_date_is_available")}</span>
            </p>
          </div>
        )}
        {availableCheck === "reserved" && (
          <div className="looks p-2 bg-white rounded-[5px] w-full flex items-center justify-center gap-4">
            <FaRegFaceTired className="text-3xl text-red-500" />
            <p className="text-sm">
              <span className="font-semibold text-writingMainDark">
                {t("reserved")}
              </span>{" "}
              <span>{t("this_date_is_reserved")}</span>
            </p>
          </div>
        )}
      </div>

      <div className="buttons w-full h-10 mt-10 flex  gap-3">
        <button
          onClick={confirm}
          className="w-full h-full text-white bg-main rounded-[5px]"
        >
          {t("confirm")}
        </button>
        <button
          onClick={check}
          className="w-full h-full text-main bg-white rounded-[5px] border-1 border-main"
        >
          {t("check")}
        </button>
      </div>
    </div>
  );
};

export default PickADay;
