import { useTranslation } from "react-i18next";
import React from "react";
import { NavBarContext } from "@/components/ui/NavBar";

const Date = () => {

  const { t, i18n } = useTranslation();
  const { when, selected, setSelected } = React.useContext(NavBarContext)

  return (
    <>
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
        onClick={() => setSelected("when")}
      >
        <p className="font-primarry text-sm font-semibold text-writingMainDark">
          {t("date")}
        </p>

        <div className="day text-writingGrey text-base flex items-center gap-3">
          {when ? <p>{when.toLocaleDateString()}</p> : <p>{t("add_date")}</p>}
        </div>
      </div>
      {selected !== "who" && selected !== "when" && (
        <hr className="h-[70%] w-[1px] bg-[#d4d4d4] transform: rotate(90deg)" />
      )}
    </>
  );
};

export default Date;
