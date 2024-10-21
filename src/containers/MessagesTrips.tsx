import { MdOutlineDirectionsBoatFilled } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { useTranslation } from "react-i18next";

const MessagesTrips = () => {

    const { t } = useTranslation();
  return (
    <div
      className="image flex-grow bg-cover bg-center hidden items-center justify-center md:flex md:flex-col md:gap-20"
    //   style={{
    //     backgroundImage: `url("https://i.pinimg.com/564x/b3/4b/ca/b34bca5a13094d574270110dc99089a9.jpg")`,
    //   }}
    >
      <div className="trips w-[200px] flex flex-col items-center">
        <MdOutlineDirectionsBoatFilled className="text-5xl text-writingMainDark" />
        <hr className="border-writingMainDark  w-[80%] my-4" />
        <p className="text-[18px] font-semibold">{t("TRIPS")}</p>
        <p className="text-center text-writingGrey mt-3">
          {t("use_the_trips_tab")}
        </p>
      </div>

      <div className="trips w-[200px] flex flex-col items-center">
        <MdOutlineEmail className="text-5xl text-writingMainDark" />
        <hr className="border-writingMainDark w-[80%] my-4" />
        <p className="text-[18px] font-semibold">{t("MESSAGES")}</p>
        <p className="text-center text-writingGrey mt-3">
          {t("exchange_messages")}
        </p>
      </div>
    </div>
  );
};

export default MessagesTrips;
