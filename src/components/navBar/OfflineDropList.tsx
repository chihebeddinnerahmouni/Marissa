import Language from "./Mobile/Language";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoBoatSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Explore from "./Mobile/Explore";
import { FaRegUserCircle } from "react-icons/fa";
import { PiSignIn } from "react-icons/pi";

const OfflineDropList = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      
      <Explore />
      
      <hr className="lg:hidden"/>

      <Language />

      <hr />

      <Link
        to={"/boats-list"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <IoBoatSharp className="text-[20px]" />
        <p>{t("list_your_boats")}</p>
      </Link>

      <hr />

      <Link
        to={"/help"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <IoIosHelpCircleOutline className="text-[20px]" />
        <span>{t("help")}</span>
      </Link>

      <hr />

      <Link
        to={"/register"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <FaRegUserCircle className="text-[20px]" />
        <span>{t("register")}</span>
      </Link>

      <hr />

      <Link
        to={"/login"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <PiSignIn className="text-[20px]" />
        <span>{t("login")}</span>
      </Link>
    </div>
  );
};

export default OfflineDropList;
