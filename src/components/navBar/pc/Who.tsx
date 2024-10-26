import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import React from "react";
import { AppContext } from "../../../App";
import { useNavigate } from "react-router-dom";


const Who = ({selected, handleSelected, setPcSelected}: any) => {

  const { t, i18n } = useTranslation();
  const { who, when, where } = React.useContext(AppContext);
  const navigate = useNavigate();
  
  const send = (e: any) => { 
    e.preventDefault();
    e.stopPropagation();
        const check = !where || !when || !who;
        if (check) return;

        const newDate = new Date(when);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const date = `${year}-${month}-${day}`;
        setPcSelected("");
        navigate(`/rental?where=${where}&when=${date}&who=${who}&page=1`);
  }


  return (
    <div
      className={`who relative w-[33%] h-full rounded-60 flex flex-col items-start justify-center ${
        i18n.language === "en" ? "pl-6" : "pr-6"
      } ${
        selected === "who"
          ? "bg-white"
          : selected
          ? "hover:bg-darkGrey"
          : "bg-white hover:bg-lightGrey"
      }`}
      onClick={() => handleSelected("who")}
    >
      <p className="font-primarry text-sm font-semibold text-writingMainDark">
        {t("whos_in")}
      </p>
      <p className="text-writingGrey text-base">
        {who === 0 ? t("add_guests") : who}
      </p>
      <button
        className={`absolute bg-main w-[55px] h-[55px] flex items-center justify-center rounded-50 top-1/2 transform -translate-y-1/2 hover:bg-mainHover ${i18n.language === "en" ? "right-1" : "left-1"
          }`}
        onClick={send}
      >
        <CiSearch className=" text-[30px] text-white" />
      </button>
    </div>
  );};

export default Who;
