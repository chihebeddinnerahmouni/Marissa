import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import React from 'react'
import { NavBarContext } from '@/components/ui/NavBar'


const Where = ({selected, handleSelected}:any) => {


  const { t, i18n } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const {Where, setWhere} = React.useContext(NavBarContext);


  return (
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
        handleSelected("where");
        inputRef.current && inputRef.current.focus();
      }}
    >
      <p className="font-primarry text-sm font-semibold text-writingMainDark">
        {t("where")}
      </p>
      <input
        ref={inputRef}
        value={Where.name}
        onChange={(e) => setWhere(e.target.value)}
        type="text"
        className="outline-none w-full font-primarry bg-transparent text-base text-writingGrey"
        placeholder={t("search_destinations")}
      />
    </div>
  );
}

export default Where
