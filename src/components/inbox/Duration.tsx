import { GiDuration } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const Duration = ({ details }: any) => {

    const { t } = useTranslation();


  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-hoverShadow">
      <div className="preferedDate flex items-center gap-4">
        <GiDuration className="text-writingGrey text-[30px]" />
        <div className="datesAgain">
                  <p className="font-bold">{t("duration")}</p>
                  <p>{details.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default Duration;
