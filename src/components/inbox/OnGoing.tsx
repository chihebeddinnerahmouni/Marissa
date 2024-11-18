import { GiSpeedBoat } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const OnGoing = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full p-4 bg-white rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <p>
          <GiSpeedBoat className={` text-[30px] text-green-500 mt-[-10px]`} />
        </p>
        <p className="text-[18px] lg:text-[20px] font-medium text-writingGrey w-full">
          {t("offer_ongoing")}
        </p>
      </div>
    </div>
  );
};

export default OnGoing;
