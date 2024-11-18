// import { MdOutlineDirectionsBoatFilled } from "react-icons/md";
// import { MdOutlineEmail } from "react-icons/md";
import boatLottie from "../../../public/boat-lottie.json";
import Lottie  from "lottie-react";


const MessagesTrips = () => {

  return (
    <div className="image flex-grow bg-cover bg-center hidden items-center justify-center overflow-auto md:flex md:flex-col md:gap-20 inboxList bg-creme">
      <Lottie animationData={boatLottie} loop={true} />
      {/* <div className="trips w-[200px] flex flex-col items-center">
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
      </div> */}
    </div>
  );
};

export default MessagesTrips;
