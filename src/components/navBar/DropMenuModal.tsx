import ReactModal from "react-modal";
import OnlineDropList from "./OnlineDropList"
import OffLineDropList from "./OfflineDropList"
import { useTranslation } from "react-i18next";
import isLoggedIn from "@/lib/isLogedin";
import { useEffect, useState } from "react";

ReactModal.setAppElement("#root");

const OnlineDropMenu = ({ isMenuOpen, setIsMenuOpen }: any) => {

    const { i18n } = useTranslation();
  const [isUserOnline, setIsUserOnline] = useState(false);

  useEffect(() => {
    isLoggedIn() ? setIsUserOnline(true) : setIsUserOnline(false);
  }, []);


  const stop = (event: any) => { 
    event.stopPropagation();
  }




    return (
      <ReactModal
        isOpen={isMenuOpen}
        onRequestClose={() => setIsMenuOpen(false)}
        className={`z-50 outline-none bg-white absolute w-[220px] top-[-4px] py-3 px-4 lg:top-[-5px] lg:w-[280px] rounded-20 shadow-hardShadow ${
          i18n.language === "en"
            ? "right-3 md:right-[50px] lg:right-[80px] 2xl:right-[120px]"
            : "left-3 md:left-[50px] lg:right-[80px] 2xl:right-[120px]"
        }`}
        overlayClassName={`fixed inset-0 backdrop-filter backdrop-blur-[7px] mt-[74px] lg:mt-[95px] z-50`}
      >
        <div className="div" onClick={stop}>
          {isUserOnline ? (
            <OnlineDropList setIsMenuOpen={setIsMenuOpen} />
          ) : (
            <OffLineDropList setIsMenuOpen={setIsMenuOpen} />
          )}
        </div>
      </ReactModal>
    );
    
};

export default OnlineDropMenu
