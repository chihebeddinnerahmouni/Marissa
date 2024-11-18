import ReactModal from "react-modal";
import { LuFerrisWheel } from "react-icons/lu";
import { useTranslation } from "react-i18next";
// import UserNotifs from "./UserNotifs";
// import { useState } from "react";


ReactModal.setAppElement("#root");

const CongratsModal = ({
  setIsCongratsOpen,
  setIsUserNotifsOpen,
}: {
    setIsCongratsOpen: (isOpen: boolean) => void;
    setIsUserNotifsOpen: (isOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  // const [isUserNotifsOpen, setIsUserNotifsOpen] = useState(false);

  // console.log(userNotifs);

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setIsCongratsOpen(false)}
      className={`z-50 outline-none bg-white w-[90%] max-w-[400px] py-6 px-8 rounded-20 shadow-lg flex flex-col items-center`}
      overlayClassName={`z-10 fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[7px] flex justify-center items-center`}
    >
      <div className="flex flex-col items-center">
        <LuFerrisWheel className="text-main text-6xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">{t("congratulations")}</h2>
        <p className="mb-6 text-center text-lg">{t("something_new")}</p>
        <button
          onClick={() => { setIsCongratsOpen(false);  setIsUserNotifsOpen(true); }}
          className="bg-main text-white py-2 px-6 rounded-full hover:bg-mainHover transition duration-300"
        >
          {t("check")}
        </button>
      </div>
    </ReactModal>
  );
};

export default CongratsModal;