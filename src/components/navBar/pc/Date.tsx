import { useTranslation } from "react-i18next";
import React from "react";
import { AppContext } from "../../../App";

const Date = ({selected, handleSelected}: any) => {

  const { t, i18n } = useTranslation();
  const { when, daysRange } = React.useContext(AppContext)

  return (
    <div
      className={`relative whene w-[33%] h-full rounded-60 flex flex-col items-start justify-center ${
        i18n.language === "en" ? "pl-6" : "pr-6"
      } ${
        selected === "when"
          ? "bg-white"
          : selected
          ? "hover:bg-darkGrey"
          : "bg-white hover:bg-lightGrey"
      }`}
      onClick={() => handleSelected("when")}
    >
      <p className="font-primarry text-sm font-semibold text-writingMainDark">
        {t("date")}
      </p>

      <div className="day text-writingGrey text-base flex items-center gap-3">
        {when ? <p>{when.toLocaleDateString()}</p> : <p>{t("add_date")}</p>}
        {daysRange ? (
          <div className="range flex items-center gap-[2px]">
            <div className="flex h-[20px] flex-col items-center justify-center text-[14px]">
              <span className="mb-[-18px]">+</span>
              <span className="mb-[-2px]">-</span>
            </div>
            <span>
              {daysRange} {t("days")}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Date;
