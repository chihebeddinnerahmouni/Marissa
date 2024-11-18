import CompareComp from "../../components/ship detail page/CompareComp";
import DateCheck from "../../components/ship detail page/DateCheck";
import ReviewByStars from "@/components/ship detail page/ReviewByStars";
import Reviews from "@/components/ship detail page/Reviews";
import Offers from "@/components/ship detail page/Offers";
import Location from "@/components/ship detail page/Location";



const ShipCheck = ({ ship }: any) => {


// not used

  return (
    <div className="w-full grid grid-cols-1 md:max-w-[700px] lg:max-w-full lg:grid-cols-2 lg:gap-x-14 lg:items-start 2xl:max-w-[1700px]">
      <div className="desc h-full flex items-center">
        <p className="lg:text-[23px]">{ship.description}</p>
      </div>
      <CompareComp ship={ship} />
      <div className="check w-full">
        <DateCheck ship={ship} />
        <hr className="my-7 lg:my-10" />
        <ReviewByStars ship={ship} />
        <hr className="my-7 lg:my-10" />
        <Reviews ship={ship} />
        <hr className="my-7 lg:my-10" />
        <Offers ship={ship} />
        <hr className="my-7 lg:my-10" />
        <Location />
      </div>
    </div>
  );
};

export default ShipCheck;
