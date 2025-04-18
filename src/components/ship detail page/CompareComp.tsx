import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import isLoggedIn from "@/lib/isLogedin";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ButtonFunc from "@/components/ui/buttons/Button";


const CompareComp = ({ ship }: any) => {
  const { boatId } = useParams<{ boatId: string }>();
  const { t, i18n } = useTranslation();
  // const locale = i18n.language === "ar" ? ar : enUS;
  const user = useSelector((state: RootState) => state.user.user);

  // console.log(ship);

  const inquiryHandler = () => {
    const isUserIn = isLoggedIn();
    if (!isUserIn) {
      Swal.fire({
        icon: "error",
        title: t("ops"),
        text: t("you_must_login_first"),
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: t("login"),
        customClass: {
          confirmButton: "custom-confirm-button",
        },
        preConfirm: () => {
          window.open(`/login`, "_blank");
        },
      });
      return;
    }
    if (ship.owner.id === user.id) {
      Swal.fire({
        icon: "error",
        title: t("ops"),
        text: t("you_cant_send_inquiry_to_your_own_boat"),
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
    if (user.isBoatOwner) {
       Swal.fire({
         icon: "error",
         title: t("ops"),
         text: t("you_cant_send_inquiry_as_boat_owner"),
         timer: 3000,
         timerProgressBar: true,
         showConfirmButton: false,
       });
       return;
    }
    
     if (user.block) {
       Swal.fire({
         icon: "error",
         title: t("ops"),
         text: t("you_cant_send_inquiry_as_blocked_user"),
         timer: 3000,
         timerProgressBar: true,
         showConfirmButton: false,
       });
       return;
     }
    window.open(`/inquiry/${boatId}`, "_blank");
  };

  return (
    <div className="w-full order-2 p-5 shadow-hardShadow mt-5 rounded-20 md:px-10 md:py-8 lg:mt-0 lg:sticky lg:top-[110px]">
      <Top ship={ship} t={t} />
      <PricesPart ship={ship} t={t} i18n={i18n} />
      <SpecificDays ship={ship} t={t} i18n={i18n}/>
      <div className="mt-10 ml-2 lg:mt-14">
        <ButtonFunc
          text={t("Inquery")}
          onClick={inquiryHandler}
        />
      </div>
    </div>
  );
};

export default CompareComp;



const Top = ({ ship, t }: { ship: any, t: any }) => {  
  return (
  <p className="font-bold text-writingMainDark flex items-center gap-1 text-[20px] lg:text-[23px]">
    <span>
      {ship.Prices[0].price_per_hour} {t("rs")}
    </span>
    <span className="text-sm text-writingGrey">/{t("hour")}</span>
  </p>
);}



const PricesPart = ({ ship, t, i18n }: { ship: any, t: any, i18n: any }) => {
  return (
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
  );
}

const SpecificDays = ({ ship, t, i18n }: { ship: any, t: any, i18n: any }) => {

  const locale = i18n.language === "ar" ? ar : enUS;
  return (
    <>
      {ship.Prices[0].date_specific_price.length > 0 && (
        <>
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
              {ship.Prices[0].date_specific_price.map(
                (price: any, index: any) => (
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    <td
                      className={`text-base font-semibold text-writingMainDark lg:text-[18px] p-2 ${
                        i18n.language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {format(new Date(price.date), "dd MMM yyyy", {
                        locale,
                      })}
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
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}