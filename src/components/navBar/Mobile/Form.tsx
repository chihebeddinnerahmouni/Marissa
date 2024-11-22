import WhereC from "./Where";
import When from "./When";
import Who from "./Who";
import { useTranslation } from "react-i18next";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { NavBarContext } from "@/components/ui/NavBar";


const Form = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsFormOpen } = useContext<any>(AppContext);
  const { Where, when, who } = useContext(NavBarContext);


  const send = () => {

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
  queryParams.push("page=1");

    const queryString = queryParams.join("&");
    
    navigate(`/rental?${queryString}`);
    setIsFormOpen(false);
  };

  return (
    <div className="searchMobileForm p-5 absolute top-0 left-0 w-full h-screen overflow-auto z-30 bg-white flex flex-col justify-between md:px-20 md:py-10">
      <div className="">
        <button
          className="w-[40px] h-[40px] border-[1px] border-main rounded-50 flex justify-center items-center"
          onClick={() => setIsFormOpen(false)}
        >
          <MdOutlineCloseFullscreen className="text-[18px] text-main" />
        </button>
        <WhereC />
        <When />
        <Who />
      </div>

      <button
        className="w-[100%] min-h-[50px] bg-main text-white rounded-10 mt-12"
        onClick={send}
      >
        {t("search")}
      </button>
    </div>
  );
};

export default Form;
