import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import isLoggedIn from "@/lib/isLogedin";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";



const CompareComp = ({ ship }: any) => {
  const { boatId } = useParams<{ boatId: string }>();
  const { t, i18n } = useTranslation();
    const locale = i18n.language === "ar" ? ar : enUS;


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
          window.open(`/login`, "_blank");
        },
      });
      return;
    }

    window.open(`/inquiry/${boatId}`, "_blank");
  };

  return (
    <div className="w-full p-5 shadow-hardShadow mt-5 rounded-20 md:px-10 md:py-8 lg:mt-0 lg:sticky lg:top-[110px]">
      <p className="font-bold text-writingMainDark flex items-center gap-1 text-[20px] lg:text-[23px]">
        <span>
          {ship.Prices[0].price_per_hour} {t("rs")}
        </span>
        <span className="text-sm text-writingGrey">/{t("hour")}</span>
      </p>

      {/* prices */}
      <table className="prices w-full mt-5">
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
          {ship.Prices.map((price: any, index: any) => (
            <tr key={index} className={`bg-white hover:bg-gray-100`}>
              <td
                className={`text-base font-semibold text-writingMainDark lg:text-[18px] p-2 ${
                  i18n.language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("rs")} {price.price_per_hour} /{t("hour")}
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
          {ship.Prices[0].date_specific_price.map((price: any, index: any) => (
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

      <button
        onClick={inquiryHandler}
        className="text-white flex-grow bg-main h-[40px] rounded-10 w-full mt-10 lg:mt-14 ml-2 hover:bg-mainHover lg:h-[50px]"
      >
        {t("Inquery")}
      </button>
    </div>
  );
};

export default CompareComp;
//  footer: '<a href="/login" target="_blank">Login</a>',
