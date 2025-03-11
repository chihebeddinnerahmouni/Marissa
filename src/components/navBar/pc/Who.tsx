import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { NavBarContext } from "@/components/ui/NavBar";


const Who = () => {

  const { t, i18n } = useTranslation();
  const { who, when, Where, setWhere, setWhen, setWho, selected, setSelected } = React.useContext(NavBarContext);
  const navigate = useNavigate();
  
  const send = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      const newDate = new Date(when);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const day = newDate.getDate();
      const date = `${year}-${month}-${day}`;

      const whereTo = Where.id === 0 ? "" : Where.id;
      const whenTo = when === "" ? "" : date;
      const whoTo = who === 0 ? "" : who;

      let queryParams = [];
      if (whereTo) queryParams.push(`where=${whereTo}`);
      if (whenTo) queryParams.push(`when=${whenTo}`);
      if (whoTo) queryParams.push(`who=${whoTo}`);

      const queryString = queryParams.join("&");

      setSelected("");
      setWhere({ id: 0, name: "" });
      setWhen("");
      setWho(0);
      navigate(`/rental?${queryString}`);
    },
    [who, when, Where]
  );


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
      onClick={() => setSelected("who")}
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
