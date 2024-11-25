import boatLottie from "../../assets/files/boat-lottie.json";
import Lottie  from "lottie-react";


const MessagesTrips = () => {

  return (
    <div className="image flex-grow bg-cover bg-center hidden items-center justify-center overflow-auto md:flex md:flex-col md:gap-20 inboxList bg-creme">
      <Lottie animationData={boatLottie} loop={true} />
    </div>
  );
};

export default MessagesTrips;
