import { FaRegClock } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Hours = ({details}:any) => {
    const { t } = useTranslation();
  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-hoverShadow">
      <div className="preferedDate flex items-center gap-4">
        <FaRegClock className="text-writingGrey text-[30px]" />
        <div className="datesAgain">
          <p className="text- text-writingMainDark font-bold">
            {t("depart")}: <span className="font-normal">{details.departHour}</span>
          </p>
          <p className="text- text-writingMainDark font-bold">
            {t("return")}: <span className="font-normal">{details.returnHour}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hours;
