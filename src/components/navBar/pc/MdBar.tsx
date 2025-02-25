import {
  useContext,
} from 'react'
import Where from "./Where";
import Date from "./Date";
import Who from "./Who";
import SetWhereContainer from '../pc/SetWhereContainer';
import SetWhenContainer from '../pc/SetWhenContainer';
import SetWhoContainer from '../pc/SetWhoContainer';
import { useTranslation } from "react-i18next";
import {NavBarContext} from '../../ui/NavBar';

const MdBar = () => {

  const {selected} = useContext(NavBarContext);
  const { i18n } = useTranslation();
  
  return (
    <div
      className={`flex relative h-[65px] rounded-60 shadow-hardShadow items-center justify-between p-[2px] flex-grow max-w-[800px] cursor-pointer ${
        selected === "" ? "bg-white" : "bg-lightGrey"
      } `}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Where />
      <Date />
      <Who />

      {/* setters */}
      {selected === "where" && <SetWhereContainer />}
      {selected === "when" && <SetWhenContainer />}
      {selected === "who" && <SetWhoContainer />}
    </div>
  );
};

export default MdBar
