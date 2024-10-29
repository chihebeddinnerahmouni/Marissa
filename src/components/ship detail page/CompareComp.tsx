import PricesComp from "./PricesComp";
import { useTranslation } from "react-i18next";
import React from "react";
import { useParams } from "react-router-dom";
import isLoggedIn from "@/lib/isLogedin";
import Swal from "sweetalert2";
import SpeceficDaysComp from "./speceficDaysComp";



const CompareComp = ({ ship }: any) => {

  const { boatId } = useParams<{ boatId: string }>();
  const { t } = useTranslation();


  const inquiryHandler = () => {

    const isUserIn = isLoggedIn();
    if (!isUserIn) {
       Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "You need to login first",
         timer: 5000,
         timerProgressBar: true,
         showConfirmButton: true,
         confirmButtonText: "Login",
         customClass: {
           confirmButton: "custom-confirm-button",
         },
         preConfirm: () => {
           window.open(`/login`, '_blank');
         },
       });
      return;
    }



    window.open(`/inquiry/${boatId}`, '_blank');
  };




  return (
    <div className="w-full p-5 shadow-hardShadow mt-5 rounded-20 md:px-10 md:py-8 lg:mt-0 lg:sticky lg:top-[110px]">
      <p className="font-bold text-writingMainDark flex items-center gap-1 text-[20px] lg:text-[23px]">
        <span>${ship.Prices[0].price_per_hour}</span>
        <span className="text-sm text-writingGrey">/{t("hour")}</span>
      </p>

      {/* prices */}
      <div className="prices w-full mt-10 flex flex-col gap-4 lg:gap-[12px]">
        <div className="w-full flex justify-between items-center">
          <p className="text-base font-semibold text-main lg:text-[18px]">
            {t("price")}
          </p>
          <p className="text-sm text-writingGrey font-medium lg:text-base">
            {t("min")}
          </p>
          <p className="text-sm text-writingGrey font-medium lg:text-base">
            {t("max")}
          </p>
        </div>
        <hr />
        {ship.Prices.map((price: any, index: any) => (
          <React.Fragment key={index}>
            <PricesComp price={price} />
            {index < ship.Prices.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>

      {/* specefic days */}
      <div className="prices w-full mt-10 flex flex-col gap-4 lg:gap-[12px]">
        <div className="w-full flex justify-between items-center ">
          <p className="text-base font-semibold text-main lg:text-[18px]">
            {t("specefic days")}
          </p>
          <p className="text-sm text-writingGrey font-medium lg:text-base">
            {t("price")}
          </p>
          <p className="text-sm text-writingGrey font-medium lg:text-base ">
            {t("min")}
          </p>
        </div>
        <hr />
        {ship.Prices[0].date_specific_price.map((price: any, index: any) => (
          <React.Fragment key={index}>
            <SpeceficDaysComp price={price} />
            {index < ship.Prices.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={inquiryHandler}
        className="text-white flex-grow bg-main h-[40px] rounded-10 w-full mt-10 lg:mt-14 ml-2 hover:bg-mainHover lg:h-[50px]"
      >
        {t("Inquery")}
      </button>
    </div>
  );
}

export default CompareComp
         //  footer: '<a href="/login" target="_blank">Login</a>',