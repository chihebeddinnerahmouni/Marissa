import { useTranslation } from "react-i18next";
import { FaMoneyBillWave } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import UpdatePrices from "./UpdatePrices";

const Prices = ({ prices, changed, setChanged }: any) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <p className="text-sm font-medium text-writingMainDark">{t("price")}</p>

      <div className="preferedDate mt-3 flex items-center gap-4">
        <FaMoneyBillWave className="text-writingGrey text-[30px]" />
        <div className="text flex flex-col gap-2 w-full">
          <table className="prices w-full">
            <thead className="border-b">
              <tr>
                <th
                  className={`text-base font-semibold text-main lg:text-[18px] p-2 ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("price")}
                </th>
                <th className="text-sm text-writingGrey font-medium lg:text-base text-center p-2">
                  {t("min")}
                </th>
                <th
                  className={`text-sm text-writingGrey font-medium lg:text-base p-2 ${
                    i18n.language === "ar" ? "text-left" : "text-right"
                  }`}
                >
                  {t("max")}
                </th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price: any, index: any) => (
                <tr key={index} className={`bg-white hover:bg-gray-100`}>
                  <td
                    className={`text-base font-semibold text-writingMainDark lg:text-[18px] p-2 ${
                      i18n.language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {price.price_per_hour} {t("rs")} /{t("hour")}
                  </td>
                  <td className="text-sm text-writingGrey font-medium lg:text-base text-center p-2">
                    {price.min_hours} {t("hours")}
                  </td>
                  <td
                    className={`text-sm text-writingGrey font-medium lg:text-base p-2 ${
                      i18n.language === "ar" ? "text-left" : "text-right"
                    }`}
                  >
                    {price.max_hours} {t("hours")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* specefic days */}
          {/* {prices.date_specific_price && (
            <table className="prices w-full mt-10">
              <thead className="border-b">
                <tr>
                  <th
                    className={`text-base font-semibold text-main lg:text-[18px] p-2 ${
                      i18n.language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("specefic_days")}
                  </th>
                  <th className="text-sm text-writingGrey font-medium lg:text-base text-center p-2">
                    {t("price")}
                  </th>
                  <th
                    className={`text-sm text-writingGrey font-medium lg:text-base p-2 ${
                      i18n.language === "ar" ? "text-left" : "text-right"
                    }`}
                  >
                    {t("min")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {prices[0].date_specific_price.map((price: any, index: any) => (
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    <td
                      className={`text-base font-semibold text-writingMainDark lg:text-[18px] p-2 ${
                        i18n.language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {format(new Date(price.date), "dd MMM yyyy", { locale })}
                    </td>
                    <td className="text-sm text-writingGrey font-medium lg:text-base text-center p-2">
                      {price.price} {t("rs")}
                    </td>
                    <td
                      className={`text-sm text-writingGrey font-medium lg:text-base p-2 ${
                        i18n.language === "ar" ? "text-left" : "text-right"
                      }`}
                    >
                      {price.min_hours} {t("hours")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )} */}
        </div>
      </div>

      {/* update button */}
      <button
        className={`absolute top-1 ${isArabic ? "left-2" : "right-2"}`}
        onClick={() => setIsOpen(true)}
      >
        <HiOutlineDotsHorizontal className="text-writingGrey text-[30px]" />
      </button>

      {isOpen && (
        <UpdatePrices
          setIsOpen={setIsOpen}
          prices={prices}
          changed={changed}
          setChanged={setChanged}
        />
      )}
    </div>
  );
};

export default Prices;

