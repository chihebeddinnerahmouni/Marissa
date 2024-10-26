import React from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../App";

interface Props {
  category: any;
}

const AgesButtons: React.FC<Props> = ({ category }) => {
   
   const { who, setWho } = React.useContext(AppContext);
    const { t, i18n } = useTranslation();

    const handleIncrement = () => {
     setWho((adultesNumber: number) => adultesNumber + 1)
     }
    const handleDecrement = () => { 
setWho((adultesNumber: number) =>
  adultesNumber > 0 ? adultesNumber - 1 : 0
);
    }

    const color =
      who === 0
        ? "border-lightGrey text-lightGrey"
        : "border-main text-main";


  return (
    <div className="w-full flex items-center justify-between">
      <div className="left flex flex-col gap-1">
        <p className="text-[20px] font-medium">{t(category.name)}</p>
        <p className="text-writingGrey">{t(category.howMany)}</p>
      </div>

      <div className="left w-[113px] relative flex items-center justify-center gap-4">
        <button
          className={`absolute w-[35px] h-[35px] rounded-50 border-1 ${color} ${
            i18n.language === "en" ? "left-0" : "left-0"
          }`}
          onClick={handleDecrement}
        >
          -
        </button>

        <p>{who}</p>

        <button
          className={`absolute right-0 w-[35px] h-[35px] rounded-50 border-1 border-main text-main ${
            i18n.language === "en" ? "right-0" : "left-0"
          }`}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AgesButtons;
