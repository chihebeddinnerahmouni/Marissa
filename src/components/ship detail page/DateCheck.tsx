import CalendarCustom from "../ui/CalendarCustom";
import CheckButton from "./CheckButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdThumbUp } from "react-icons/md";
import { FaRegFaceTired } from "react-icons/fa6";


const DateCheck = ({ ship }: any) => {
  
  const [selectedDate, setSelectedDate] = useState<any>();
  const [availableCheck, setAvailableCheck] = useState<string>("");
  const { t } = useTranslation();
  
  return (
    <>
      <div className="w-full py-2 shadow-hardShadow rounded-20 mt-5 flex flex-col gap-3 items-center lg:mt-0">
        <div className="calendarContainer w-full h-[323px] xl:max-w-[550px]">
          <CalendarCustom
            reserved={ship.reserved}
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

      <CheckButton
        selectedDate={selectedDate}
        reserved={ship.reserved}
        setAvailableCheck={setAvailableCheck}
      />
    </>
  );
};

export default DateCheck;
