import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";


const ShipDetails = ({ ship }: any) => {

  const navigate = useNavigate();
  
  const navigateTo = () => {
    navigate(`/boat-details/${ship.id}`);
  }

    return (
      <div
        className="relative w-full rounded-[12px] cursor-pointer max-w-[500px] 2xl:max-w-[500px]"
        onClick={navigateTo}
      >
        <img
          src={ship.image}
          // className="w-full h-[200px] object-cover object-center rounded-[12px] lg:h-[240px]"
          className="w-full h-[200px] object-cover object-center rounded-[12px] lg:h-[190px] 2xl:h-[250px]"
          alt="boat"
        />
        <div className="texts mt-3 text-writingMainDark px-3">
          <div className="titleRate flex w-full justify-between items-center">
            {/* <p className="font-semibold text-[16px] lg:text-[18px]"> */}
            <p className="font-semibold text-[16px] lg:text-[16px]">
              {ship.name}
            </p>
            <StarRatings
              rating={ship.rate}
              starRatedColor="#FFD700"
              starEmptyColor="#dddcdc"
              numberOfStars={5}
              name="rating"
              starDimension="17px"
              starSpacing="1px"
            />
          </div>
          <p className="mt-1 text-writingGrey font-medium text-sm lg:text-[14px] text-nowrap overflow-hidden">
            {ship.description}
          </p>
          <div className="priceGuests flex items-center justify-between mt-2">
            <p className="text-writingMainDark font-bold text-[19px] lg:text-[18px]">
              ${ship.minPrice}-{ship.maxPrice} hour
            </p>
            <p className="text-writingGrey text-[13px] lg:text-[13px]">
              {ship.guests} guests
            </p>
          </div>
        </div>

        <div className="profilePic absolute w-[60px] h-[70px] rounded-10 bg-white top-[-35px] left-[20px] flex items-center justify-center shadow-smallShadow hover:shadow-smallHoverShadow lg:h-[80px] lg:w-[65px]">
          <img
            src={ship.ownerImage}
            className="w-[50px] h-[50px] object-cover object-center rounded-50 lg:w-[55px] lg:h-[55px]"
            alt="owner"
          />
        </div>
      </div>
    );
}

export default ShipDetails



