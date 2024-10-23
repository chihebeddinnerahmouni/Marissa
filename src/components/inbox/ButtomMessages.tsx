import { useTranslation } from "react-i18next";
import { useState } from "react";


const ButtomMessages = () => {
    const { t } = useTranslation();
    const [message, setMessage] = useState("");
    
    

  return (
    <div className="w-full fixed px-4 h-[60px] bg-creme shadow-hardShadow bottom-0 py-2 lg:h-[70px] flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder={t("message")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
           className="relative w-full h-full px-3 rounded-10 bg-emptyInput border-1 border-main text-writingMainDark font-medium outline-main md:w-[500px] xl:w-[600px]"
          />
          
          <button className="w-[70px] h-full bg-main text-white rounded-10 hover:bg-mainHover">
              {t("send")}
          </button>
    </div>
  );
};

export default ButtomMessages
