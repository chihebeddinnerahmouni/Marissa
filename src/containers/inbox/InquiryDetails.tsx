import CaptainOffer from "@/components/inbox/CaptainOffer";
import BoatNameAndPic from "@/components/inbox/BoatNameAndPic";
import Dates from "@/components/inbox/Dates";
import Duration from "@/components/inbox/Duration";
import Groupe from "@/components/inbox/Groupe";
import WithCaptain from "@/components/inbox/WithCaptain";
import SpecialRequest from "@/components/inbox/SpecialRequest";
import ButtomTrip from "@/components/inbox/ButtomTrip";
import Offer from "@/components/inbox/Offer";
import Return from "@/components/inbox/Return";
import Pay from "./Pay";
import OnGoing from "@/components/inbox/OnGoing";

const InquiryDetails = ({ details, setSelected }: any) => {

const isBoatOwner = localStorage.getItem("isBoatOwner") === "true";
  // console.log(details[0].status);

  return (
    <>
      <div className="content w-full px-4 mt-[80px] md:w-[550px] lg:mt-[90px] xl:w-[650px] bg-creme pb-5 relative">
        {details[0].status === "confirmed" && !isBoatOwner ? (
          <Pay details={details} />
        ) : (
          <>
            {details[0].status === "ongoing" && <OnGoing />}
            <Offer offer={details[0].offer} />
            <CaptainOffer details={details[0]} />
            <BoatNameAndPic details={details[0]} />
            <Dates details={details[0]} />
            <Return details={details[0]} />
            <Duration details={details} />
            <Groupe details={details} />
            <WithCaptain />
            <SpecialRequest details={details} />
          </>
        )}
      </div>
      <ButtomTrip setSelected={setSelected} details={details[0]} />
    </>
  );
};

export default InquiryDetails;
