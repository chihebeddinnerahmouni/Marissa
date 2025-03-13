import WhereC from "./Where";
import When from "./When";
import Who from "./Who";
import { useTranslation } from "react-i18next";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { NavBarContext } from "@/components/ui/NavBar";
import ButtonFunc from "@/components/ui/buttons/Button";

interface IProps {
  setIsFormOpen: (arg: boolean) => void;
}


const Form = ({ setIsFormOpen }: IProps) => {
  
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Where, when, who } = useContext(NavBarContext);


  const send = useCallback(() => {
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

    const queryString = queryParams.join("&");

    navigate(`/rental?${queryString}`);
    setIsFormOpen(false);
  }, [Where, when, who]);


  return (
    <div className="p-5 absolut w-[100vw] h-screen overflow-auto z-30 bg-white flex flex-col justify-between md:px20 md:py10">
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
      <ButtonFunc text={t("search")} onClick={send} />
    </div>
  );
};

export default Form;
