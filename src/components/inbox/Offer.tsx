// import { useTranslation } from "react-i18next";




// const Offer = ({ offer }: any) => {
    
//     const { t } = useTranslation();
//     console.log(offer);


//   return (
//     <div className="w-full p-3 bg-white mt-5 rounded-10 shadow-sm lg:p-5">
//       {/* total */}
//       <div className="total flex w-full justify-between text-sm lg:text-[18px]">
//         <p className="font-semibold">{t("your_total")}</p>
//         <p className="font-semibold">
//           {offer.total_cost} {t("rs")}
//         </p>
//       </div>

//       <hr className="mt-2 mb-4 border border-dashed lg:mt-4 lg:mb-6" />

//       {/* base cost */}
//       <div className="total flex w-full justify-between text-writingGrey text-sm lg:text-base">
//         <p className="font-medium underline cursor-pointer">{t("base_cost")}</p>
//         <p className="font-medium">
//           {offer.base_cost} {t("rs")}
//         </p>
//       </div>

//       {/* fees */}
//       <div className="total flex w-full justify-between text-writingGrey mt-2 text-sm lg:text-base lg:mt-4">
//         <p className="font-medium underline cursor-pointer">{t("service_fee")}</p>
//         <p className="font-medium">
//           {offer.payment_service_fee} {t("rs")}
//         </p>
//       </div>

//       <hr className="mt-4 mb-2 border border-dashed" />

//       {/* total */}
//       <div className="total flex w-full justify-between text-sm lg:text-base">
//         <p className="">{t("total")}</p>
//         <p className="">
//           {offer.total_cost} {t("rs")}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Offer

import { useState } from 'react';
import { useTranslation } from "react-i18next";

const Offer = ({ offer }: any) => {
  const { t } = useTranslation();
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const handleClick = (element: string) => {
    setActiveElement(activeElement === element ? null : element);
  };

  return (
    <div className="w-full p-3 bg-white mt-5 rounded-10 shadow-sm lg:p-6">
      {/* total */}
      <div className="total flex w-full justify-between text-sm lg:text-[18px]">
        <p className="font-semibold">{t("your_total")}</p>
        <p className="font-semibold">
          {offer.total_cost} {t("rs")}
        </p>
      </div>

      <hr className="mt-2 mb-4 border border-dashed lg:mt-4 lg:mb-6" />

      {/* base cost */}
      <div className="total flex w-full justify-between text-writingGrey text-sm lg:text-base relative">
        <p
          className="font-medium underline cursor-pointer"
          onClick={() => handleClick("base_cost")}
        >
          {t("base_cost")}
        </p>
        <p className="font-medium">
          {offer.base_cost} {t("rs")}
        </p>
        {activeElement === "base_cost" && (
          <div className="tooltip">
            <div className="tooltip-arrow"></div>
            <div className="tooltip-content">
              {t("the_original_offer_amount")}
            </div>
          </div>
        )}
      </div>

      {/* fees */}
      <div className="total flex w-full justify-between text-writingGrey mt-2 text-sm lg:text-base lg:mt-4 relative">
        <p
          className="font-medium underline cursor-pointer"
          onClick={() => handleClick("service_fee")}
        >
          {t("service_fee")}
        </p>
        <p className="font-medium">
          {offer.payment_service_fee} {t("rs")}
        </p>
        {activeElement === "service_fee" && (
          <div className="tooltip">
            <div className="tooltip-arrow"></div>
            <div className="tooltip-content">{t("the_service_fee")}</div>
          </div>
        )}
      </div>

      <hr className="mt-4 mb-2 border border-dashed" />

      {/* total */}
      <div className="total flex w-full justify-between text-sm lg:text-base">
        <p className="">{t("total")}</p>
        <p className="">
          {offer.total_cost} {t("rs")}
        </p>
      </div>
    </div>
  );
}

export default Offer;