import { useEffect, useContext } from 'react'
import Where from "./Where";
import Date from "./Date";
import Who from "./Who";
import SetWhereContainer from '../pc/SetWhereContainer';
import SetWhenContainer from '../pc/SetWhenContainer';
import SetWhoContainer from '../pc/SetWhoContainer';
import { useTranslation } from "react-i18next";
import { AppContext } from '../../../App';



const MdBar = () => {

  const { Pcselected, setPcSelected, setIsMenuOpen } = useContext(AppContext);
  const { i18n } = useTranslation();

  const handleSelected = (selected: string) => {
    setPcSelected(selected);
  };

  useEffect(() => {
    const handleClick = () => {
      setPcSelected("");
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
        setIsMenuOpen(false);
  };


  return (
    <div
      className={`flex relative h-[65px] rounded-60 shadow-hardShadow items-center justify-between p-[2px] flex-grow max-w-[800px] cursor-pointer ${
        Pcselected === "" ? "bg-white" : "bg-lightGrey"
      } `}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      onClick={stopPropagation}
    >
      <Where selected={Pcselected} handleSelected={handleSelected} />
      {Pcselected !== "when" && Pcselected !== "where" && (
        <hr className="h-[70%] w-[1px] bg-[#d4d4d4] transform: rotate(90deg)" />
      )}
      <Date selected={Pcselected} handleSelected={handleSelected} />
      {Pcselected !== "who" && Pcselected !== "when" && (
        <hr className="h-[70%] w-[1px] bg-[#d4d4d4] transform: rotate(90deg)" />
      )}
      <Who selected={Pcselected} handleSelected={handleSelected} setPcSelected={setPcSelected} />

      {/* setters */}
      {Pcselected === "where" && <SetWhereContainer />}
      {Pcselected === "when" && <SetWhenContainer />}
      {Pcselected === "who" && <SetWhoContainer />}
    </div>
  );
};

export default MdBar
