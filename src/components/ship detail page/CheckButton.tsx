import { FaCheckDouble } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import React from "react";

// not used


interface CheckButtonProps {
  reserved: { start_date: string; end_date: string }[],
  selectedDate: any,
  setAvailableCheck: any
}


const CheckButton: React.FC<CheckButtonProps> = ({ reserved, selectedDate, setAvailableCheck }) => {
  

  const { t } = useTranslation("");
  

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

  reserved.forEach(({ start_date, end_date }) => {
    const dates = getDatesInRange(start_date, end_date);
    reserveddatesString.push(...dates);
  });

  const isReserved = reserveddatesString.includes(selectedDateString);
  setAvailableCheck(isReserved ? "reserved" : "available");
};
  

    return (
      <button
        className="w-full h-[60px] mt-5 rounded-10 border-[1px] border-darkGrey flex items-center justify-center gap-2 lg:h-[70px] lg:mt-7"
        onClick={check}
      >
        <FaCheckDouble className="text-[20px] text-writingMainDark" />
        <span className="text-writingMainDark font-medium">
          {t("click_to_check_the_availability")}
        </span>
      </button>
    );
};

export default CheckButton;
