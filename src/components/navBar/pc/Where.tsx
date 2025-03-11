import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import React from 'react'
import { NavBarContext } from '@/components/ui/NavBar'



const Where = () => {


  const { t, i18n } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const {Where, selected, setSelected} = React.useContext(NavBarContext);


  return (
    <>
      <div
        className={`where w-[33%] h-full rounded-60 flex flex-col items-start justify-center pr-2 ${
          i18n.language === "en" ? "pl-6" : "pr-6"
        } ${
          selected === "where"
            ? "bg-white"
            : selected
            ? "hover:bg-darkGrey"
            : "bg-white hover:bg-lightGrey"
        } `}
        onClick={() => {
          setSelected("where");
          inputRef.current && inputRef.current.focus();
        }}
      >
        <p className="font-primarry text-sm font-semibold text-writingMainDark">
          {t("where")}
        </p>
        <p className="text-writingGrey">
          {Where.name ? Where.name : t("search_destinations")}
        </p>
      </div>
      {selected !== "when" && selected !== "where" && (
        <hr className="h-[70%] w-[1px] bg-[#d4d4d4] transform: rotate(90deg)" />
      )}
    </>
  );
}

export default Where
