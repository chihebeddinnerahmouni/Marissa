import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IoBoatSharp } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import Explore from "./Explore";
import Language from "./Language";

const MobileLinkModal = ({ isLinksOpen, setIsLinksOpen }: any) => {
    const { t, i18n } = useTranslation();

  return (
    <ReactModal
      isOpen={isLinksOpen}
      onRequestClose={() => setIsLinksOpen(false)}
      contentLabel="Contact Modal"
      ariaHideApp={false}
      className={`absolute hardShadow text-writingMainDark font-primarry w-[60%] top-[10px] bg-white z-20 ${
        i18n.language === "ar" ? "left-[12px]" : "right-[12px]"
      } rounded-10 px-4 py-3 flex flex-col items-start gap-3 font-bo md:top-[108px]`}
      overlayClassName="fixed overflow-hidden mt-[70px] inset-0 backdrop-blur-[4px] z-20 lg:hidden"
    >
      <Explore />

      <Language />

      <hr className="w-full" />

      <Link
        to={"/boats-list"}
        className="w-full flex items-center gap-2 hover:text-mainHover"
      >
        <IoBoatSharp />
        <p>{t("list_your_boats")}</p>
      </Link>

      <Link
        to={"/help"}
        className="w-full flex items-center gap-2 hover:text-mainHover"
      >
        <IoIosHelpCircleOutline />
        <span>{t("help")}</span>
      </Link>

      <hr className="w-full" />

      <Link
        to={"/register"}
        className="w-full flex items-center gap-2 hover:text-mainHover"
      >
        <MdOutlineAccountCircle />
        <span>{t("register")}</span>
      </Link>

      <Link
        to={"/login"}
        className="w-full flex items-center gap-2 hover:text-mainHover"
      >
        <CiLogin />
        <span>{t("login")}</span>
      </Link>
    </ReactModal>
  );
};

export default MobileLinkModal;
