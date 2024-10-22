import PricesComp from "./PricesComp";
import { useTranslation } from "react-i18next";
import React from "react";
import { useParams } from "react-router-dom";

const CompareComp = ({ ship }: any) => {

  const { boatId } = useParams<{ boatId: string }>();
  // const site = import.meta.env.VITE_SITE;
  const site = "https://boats-mauve.vercel.app";
  const { t } = useTranslation();


  const inquiryHandler = () => {
    // window.open(`${site}/inquiry/${boatId}`, "_blank");
    window.open(`https://boats-mauve.vercel.app/inquiry/${boatId}`);
  };



  return (
    <div className="w-full p-5 shadow-hardShadow mt-5 rounded-20 md:px-10 md:py-8 lg:mt-0 lg:sticky lg:top-[110px]">
      <p className="font-bold text-writingMainDark flex items-center gap-1 lg:text-[20px]">
        <span>
          ${ship.minPrice} - ${ship.maxPrice}
        </span>
        <span className="text-sm text-writingGrey">/{t("hour")}</span>
      </p>

      <div className="prices w-full mt-10 flex flex-col gap-4 lg:gap-[22px]">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm font-semibold text-writingMainDark lg:text-base">
            {t("price")}
          </p>
          <p className="text-sm text-writingGrey font-medium lg:text-base">
            {t("min")}
          </p>
        </div>
        <hr />
        {ship.prices.map((price: any, index: any) => (
          <React.Fragment key={index}>
            <PricesComp price={price} />
            {index < ship.prices.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={inquiryHandler}
        className="text-white flex-grow bg-main h-[40px] rounded-10 w-full mt-10 lg:mt-14 ml-2 hover:bg-mainHover lg:h-[50px]">
        {t("Inquery")}
      </button>
    </div>
  );
}

export default CompareComp
