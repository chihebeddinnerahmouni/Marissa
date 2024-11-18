import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ar } from "react-day-picker/locale";
import { enUS } from "react-day-picker/locale";
import { useTranslation } from "react-i18next";
import { NavBarContext } from "../ui/NavBar";



const SetWhen = () => {
    const { i18n } = useTranslation();
  const { when , setWhen } = React.useContext(NavBarContext);
  const today = new Date();

  return (
    <div className={`flex flex-col items-center`} style={{ direction: "ltr" }}>
      <DayPicker
        mode="single"
        selected={when}
        onSelect={setWhen}
        className=""
        disabled={{ before: today }} 
        locale={i18n.language === "en" ? enUS : ar}
      />
    </div>
  );
};

export default SetWhen;
