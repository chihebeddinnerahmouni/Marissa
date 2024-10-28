import { FaCheckDouble } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import React from "react";



interface CheckButtonProps {
  reserved: string[],
  selectedDate: any,
  setAvailableCheck: any
}


const CheckButton: React.FC<CheckButtonProps> = ({ reserved, selectedDate, setAvailableCheck }) => {
  

  const { t } = useTranslation("");

 const check = () => {
   const selectedDateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
   const isReserved = reserved.includes(selectedDateString);
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
