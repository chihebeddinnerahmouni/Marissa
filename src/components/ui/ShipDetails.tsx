  import StarRatings from "react-star-ratings";
  import { useNavigate } from "react-router-dom";
  import { useTranslation } from "react-i18next";
  import { LazyLoadImage } from "react-lazy-load-image-component";
  import "react-lazy-load-image-component/src/effects/blur.css";

  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const urlUser = import.meta.env.VITE_SERVER_URL_USERS;

  const ShipDetails = ({ ship }: any) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const navigateTo = () => {
      navigate(`/boat-details/${ship.id}`);
    };

    return (
      <div
        className="relative w-full rounded-[12px] cursor-pointer max-w-[500px] 2xl:max-w-[500px]"
        onClick={navigateTo}
      >
        <LazyLoadImage
          src={`${url}/${ship.Images[0].url}`}
          width="100%"
          className="h-[200px] object-cover object-center rounded-[12px] lg:h-[190px] 2xl:h-[250px]"
          alt="boat"
          decoding="async"
          effect="blur"
        />
        <div className="texts mt-3 text-writingMainDark px-3">
          <div className="titleRate flex w-full justify-between items-center">
            <p className="font-semibold text-[16px] lg:text-[16px] w-[55%] ellipsesCss lg:w-[55%] xl:w-[55%]">
              {ship.title}
            </p>
            <StarRatings
              rating={Math.floor(ship.rating)}
              starRatedColor="#FFD700"
              starEmptyColor="#dddcdc"
              numberOfStars={5}
              name="rating"
              starDimension="17px"
              starSpacing="1px"
            />
          </div>
          <p className="mt-1 w-full text-writingGrey font-medium text-sm lg:text-[14px] text-nowrap ellipsesCss">
            {ship.description}
          </p>
          <div className="priceGuests flex items-center justify-between mt-2">
            <p className="text-writingMainDark font-bold text-[16px]">
              {ship.Prices[0].min_price}-{ship.Prices[0].max_price} {t("rs")} /{" "}
              {t("hour")}
            </p>
            <p className="text-writingGrey text-[13px] lg:text-[13px]">
              {ship.guests} {t("guests")}
            </p>
          </div>
        </div>

        {ship.user && (
          <div className="profilePic absolute w-[60px] h-[70px] rounded-10 bg-white top-[-35px] left-[20px] flex items-center justify-center shadow-smallShadow hover:shadow-smallHoverShadow lg:h-[80px] lg:w-[65px]">
            <LazyLoadImage
              src={
                ship.user.profilePicture
                  ? `${urlUser}/${ship.user.profilePicture}`
                  : "/anonyme.jpg"
              }
              className="w-[47px] h-[47px] object-cover object-center rounded-50 lg:w-[55px] lg:h-[55px]"
              alt="owner"
              effect="blur"
            />
          </div>
        )}
      </div>
    );
  };

  export default ShipDetails;

