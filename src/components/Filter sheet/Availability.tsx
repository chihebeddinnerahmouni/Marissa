import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";

interface AvailabilityProps { 
    availability: string;
    setAvailability: (value: string) => void;
}

const Availability:React.FC<AvailabilityProps> = ({availability, setAvailability}) => {
    const { t } = useTranslation();
    return (
      <div className="w-full">
        <p className="filterTitleCss">{t("availability")}</p>

        {/* now */}
        <div className="availabilty flex flex-col mt-3 gap-3 lg:mt-5">
          <div className="now flex items-center gap-2">
            <button
              onClick={() => setAvailability("now")}
              className={` w-[18px] h-[18px]   lg:w-[20px] lg:h-[20px] border-2 rounded-[5px] flex items-center justify-center ${
                availability === "now"
                  ? "bg-main border-main"
                  : "bg-white border-greyBorder"
              }`}
            >
              {availability === "now" && <FaCheck className="text-sm text-white lg:text-base" />}
            </button>
            <p className="text-sm text-writingGrey lg:text-base">
              {t("available_now")}
            </p>
          </div>

          {/* all */}
          <div className="all flex items-center gap-2">
            <button
              onClick={() => setAvailability("all")}
              className={` w-[18px] h-[18px]  lg:w-[20px] lg:h-[20px] border-2 rounded-[5px] flex items-center justify-center ${
                availability === "all"
                  ? "bg-main border-main"
                  : "bg-white border-greyBorder"
              }`}
            >
              {availability === "all" && <FaCheck className="text-white" />}
            </button>
            <p className="text-sm text-writingGrey lg:text-base">{t("all")}</p>
          </div>
        </div>
      </div>
    );
};

export default Availability;
