import Where from "./Where";
import When from "./When";
import Who from "./Who";
import { useTranslation } from "react-i18next";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../../../App";

const Form = () => {
  const { t } = useTranslation();
  const { setIsFormOpen } = useContext<any>(AppContext);

  return (
    <div className="searchMobileForm p-5 absolute top-0 left-0 w-full h-screen overflow-auto z-30 bg-white flex flex-col justify-between md:px-20 md:py-10">
      <div className="">
        <button
          className="w-[40px] h-[40px] border-[1px] border-main rounded-50 flex justify-center items-center"
          onClick={() => setIsFormOpen(false)}
        >
          <MdOutlineCloseFullscreen className="text-[18px] text-main" />
        </button>
        <Where />
        <When />
        <Who />
      </div>

      <button className="w-[100%] min-h-[50px] bg-main text-white rounded-10 mt-12">
        {t("search")}
      </button>
    </div>
  );
};

export default Form;
