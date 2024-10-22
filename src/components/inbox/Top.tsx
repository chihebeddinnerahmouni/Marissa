import { useTranslation } from "react-i18next"
import { LuSailboat } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import React from "react";

interface TopProps { 
    selected: string;
    setSelected: (selected: string) => void;
}

const Top: React.FC<TopProps> = ({selected, setSelected}) => {
    const { t } = useTranslation()
  return (
    <div className="p-4 w-full rounded-b-10 flex justify-between items-center lg:w-[550px] xl:w-[650px]">
      <p className="text-[18px] lg:text-[20px] font-medium text-writingGrey">
        {t("inquiry_sent")}
      </p>
      <div className="buttons flex items-center gap-5">
        <button
          className={`flex flex-col items-center gap-2 ${
            selected === "details" ? "text-main pb-1 border-b-1 border-b-main" : "text-writingGrey hover:text-writingMainDark"
          }`}
          onClick={() => setSelected("details")}
        >
          <LuSailboat className="text-[22px] lg:text-[25px]" />
          <p className="text-[10px] lg:text-[12px]">{t("trip_details")}</p>
        </button>
        <button
          className={`flex flex-col items-center gap-2 ${
            selected === "messages" ? "text-main pb-1 border-b-1 border-main" : "text-writingGrey hover:text-writingMainDark"
          }`}
          onClick={() => setSelected("messages")}
        >
          <MdOutlineEmail className="text-[22px] lg:text-[25px]" />
          <p className="text-[10px] lg:text-[12px]">{t("MESSAGES")}</p>
        </button>
      </div>
    </div>
  );
}

export default Top
