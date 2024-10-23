import { useTranslation } from "react-i18next";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import options_Array from "../../assets/files/inquiry_options";
import React from "react";
// import ReactModal from "react-modal";

const ButtomTrip = () => {
  const { t } = useTranslation();
  const [isOptionsOn, setIsOptionsOn] = useState(false);

  return (
    <div className="w-full fixed px-4 h-[60px] bg-creme shadow-hardShadow bottom-0 py-2 lg:h-[70px] flex justify-center items-center lg:ml-[0px]">
      <button
        className="relative w-full h-full rounded-20 bg-main text-white font-medium md:w-[530px] xl:w-[630px]"
        onClick={() => setIsOptionsOn(!isOptionsOn)}
      >
        {t("options")}{" "}
        {isOptionsOn ? (
          <FaChevronDown className="inline-block ml-2" />
        ) : (
          <FaChevronUp className="inline-block ml-2" />
        )}
              {/* {isOptionsOn && <Options isOptionsOn={isOptionsOn} setIsOptionsOn={setIsOptionsOn} />} */}
              {isOptionsOn && <Options/>}
      </button>
    </div>
  );
};

export default ButtomTrip;

// const Options = ({ isOptionsOn, setIsOptionsOn }: any) => {
const Options = () => {
  const { i18n, t } = useTranslation();

  return (
    //   <ReactModal
    //       isOpen={isOptionsOn}
    //       onRequestClose={() => setIsOptionsOn(false)}
    //       contentLabel="Contact Modal"
    //   className={`options absolute p-3 rounded-10 bg-white shadow-hardShadow text-writingMainDark bottom-[50px] flex flex-col gap-3 items-start lg:bottom-[60px] ${
    //     i18n.language === "en" ? "left-0" : "right-0"
    //           }`}
    //       overlayClassName={`fixed inset-0 bg-black bg-opacity-50 z-20`}
    // >
    //   {options_Array.map((option, index) => (
    //     <React.Fragment key={index}>
    //       <div
    //         className="flex items-center h-full px-4 cursor-pointer gap-3"
    //       >
    //         <option.Icon className="text-2xl" />
    //         <p className="">{t(option.text)}</p>
    //           </div>
    //           {index < options_Array.length - 1 && <hr className="w-full border-1 border-gray-200" />}
    //     </React.Fragment>
    //   ))}
    //   </ReactModal>
      
    <div
      className={`options absolute p-3 rounded-10 bg-white shadow-hardShadow text-writingMainDark bottom-[50px] flex flex-col gap-3 items-start lg:bottom-[60px] ${
        i18n.language === "en" ? "left-0" : "right-0"
      }`}
    >
      {options_Array.map((option, index) => (
        <React.Fragment key={index}>
          <div
            className="flex items-center h-full px-4 cursor-pointer gap-3"
          >
            <option.Icon className="text-2xl" />
            <p className="">{t(option.text)}</p>
              </div>
              {index < options_Array.length - 1 && <hr className="w-full border-1 border-gray-200" />}
        </React.Fragment>
      ))}
    </div>
  );
};
