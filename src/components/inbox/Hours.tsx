import { FaRegClock } from "react-icons/fa6";
import { useTranslation } from "react-i18next";



// not used
const Hours = ({details}:any) => {
    const { t } = useTranslation();
  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <FaRegClock className="text-writingGrey text-[30px]" />
        <div className="datesAgain lg:text-[18px]">
          <p className="text- text-writingMainDark font-bold">
            {t("depart")}:{" "}
            <span className="font-normal text-writingGrey">
              {details[0].booking_info.departureTime}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hours;
