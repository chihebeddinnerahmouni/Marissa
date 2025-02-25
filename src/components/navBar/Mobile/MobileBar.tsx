import { IoSearch } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useState, useCallback } from "react";
import Form from "./Form";
import Drawer from "@mui/material/Drawer";


const MobileBar = () => {

  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  return (
    <>
      <button
        className="searchMobile shadow-hardShadow relative w-full h-[50px] flex flex-col justify-center bg-white rounded-60 pr-6"
        onClick={handleClick}
      >
        <IoSearch
          className={`absolute text-writingMainDark text-[20px] top-1/2 transform -translate-y-1/2 ${
            i18next.language === "en" ? "left-4" : "right-4"
          } `}
        />
        <div
          className={`flex flex-col items-start ${
            i18next.language === "en" ? "ml-[50px]" : "mr-[30px]"
          } `}
        >
          <p className="font-medium font-primarry text-[15px] text-writingMainDark">
            {t("where")}
          </p>
          <div className="all relative flex items-center font-primarry">
            <p className="text-[12px] text-writingGrey">{t("any_where")}</p>
            <div className="point w-[3px] h-[3px] bg-writingGrey relative top-[2px] mx-2 rounded-50"></div>
            <p className="text-[12px] text-writingGrey">{t("any_time")}</p>
            <div className="point w-[3px] h-[3px] bg-writingGrey relative top-[2px] mx-2 rounded-50"></div>
            <p className="text-[12px] text-writingGrey">{t("add_guests")}</p>
          </div>
        </div>
      </button>

      {/* {isFormOpen && <Form />} */}
      <Drawer
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
          },
        }}
        anchor="right"
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <Form setIsFormOpen={setIsFormOpen} />
      </Drawer>
    </>
  );
};

export default MobileBar
