import { useTranslation } from "react-i18next";
import { FaRegCalendarAlt } from "react-icons/fa";

const Dates = ({ details }: any) => {
    const { t } = useTranslation();
  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-hoverShadow">
          <p className="text-sm font-medium text-writingMainDark">{t("preferred_date")}</p>
          <div className="preferedDate mt-3 flex items-center gap-4">
              <FaRegCalendarAlt className="text-writingGrey text-[30px]" />
              <div className="datesAgain">
                  <p className="text- text-writingMainDark font-bold">{t("depart")}: <span className="font-normal">{details.depart}</span></p>
                  <p className="text- text-writingMainDark font-bold">{t("return")}: <span className="font-normal">{details.return}</span> </p>
              </div>
          </div>
    </div>
  );
}

export default Dates
