import CalendarCustom from "../ui/CalendarCustom";
// import CheckButton from "./CheckButton";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdThumbUp } from "react-icons/md";
import { FaRegFaceTired } from "react-icons/fa6";

// not used


const DateCheck = ({ ship }: any) => {
  
  const [selectedDate, setSelectedDate] = useState<any>();
  const [availableCheck, setAvailableCheck] = useState<string>("");
  const { t } = useTranslation();
  
  useEffect(() => { 
    const getDatesInRange = (start_date: string, end_date: string) => {
      const start = new Date(start_date);
      const end = new Date(end_date);
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

      ship.Availabilities.forEach(({ start_date, end_date }: any) => {
        const dates = getDatesInRange(start_date, end_date);
        reserveddatesString.push(...dates);
      });

      const isReserved = reserveddatesString.includes(selectedDateString);
      setAvailableCheck(isReserved ? "reserved" : "available");
    };


    if (selectedDate) check();
  }, [selectedDate]);

  return (
    <>
      <div className="w-full py-2 shadow-hardShadow rounded-20 mt-5 flex flex-col gap-3 items-center lg:mt-0">
        <div className="calendarContainer w-full h-[323px] xl:max-w-[550px]">
          <CalendarCustom
            reserved={ship.Availabilities}
            // selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>

      {availableCheck === "available" && (
        <div className="looks mt-5 p-2 bg-white rounded-[5px] w-full flex items-center justify-center gap-4">
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
        <div className="looks mt-5 p-2 bg-white rounded-[5px] w-full flex items-center justify-center gap-4">
          <FaRegFaceTired className="text-3xl text-red-500" />
          <p className="text-sm">
            <span className="font-semibold text-writingMainDark">
              {t("reserved")}
            </span>{" "}
            <span>{t("this_date_is_reserved")}</span>
          </p>
        </div>
      )}

      {/* <CheckButton
        selectedDate={selectedDate}
        reserved={ship.Availabilities}
        setAvailableCheck={setAvailableCheck}
      /> */}
    </>
  );
};

export default DateCheck;
