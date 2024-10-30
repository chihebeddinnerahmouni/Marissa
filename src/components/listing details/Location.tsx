import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import { FaSearchLocation } from "react-icons/fa";



const LocationComp = () => {
  const { setProgress, steps } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
    const [long, setLong] = useState("");
    const [lat, setLat] = useState("");
    const navigate = useNavigate();
    const { coords, isGeolocationEnabled } =
      useGeolocated({
        positionOptions: {
          enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
      });

    
  useEffect(() => {
    setProgress((100 / steps) * 3);
  }, []);

  // get location
  const locate = () => {
    if (!isGeolocationEnabled) {
      alert("Please enable location services to continue");
      return;
    }
    if (coords) {
      setLong(coords.longitude.toString());
      setLat(coords.latitude.toString());
    }
  }

  // send data
    const handleContinue = () => {
    if (!long && !lat) return;
    sessionStorage.setItem("Listing_details_long", long);
    sessionStorage.setItem("Listing_details_lat", lat);
    navigate("/boats-list/features");
  };

  return (
    <div className="w-full md:w-[360px]">
      <p className="mb-5 text-[25px] font-bold">{t("specify_location")}</p>

      <div className="flex flex-col items-center mb-5">
        {/* <button
          onClick={locate}
          className="flex items-center justify-center px-4 py-2 bg-white text-main rounded-lg shadow-hoverShadow hover:shadow-hardShadow transition duration-100"
        >
          <FaSearchLocation className="text-[22px] md:text-[25px] mr-2" />
          <span className="text-base font-medium">{t("get_location")}</span>
        </button> */}
        <button
          onClick={locate}
          className="flex items-center justify-center text-main rounded-lg hover:text-mainHover transition duration-100"
        >
          <FaSearchLocation className="text-[22px] md:text-[25px] mr-2" />
          <span className="text-base font-medium">{t("get_location")}</span>
        </button>
        {long && lat && (
          <p className="mt-3 text-sm text-gray-600">
            {t("location_found")}: {lat}, {long}
          </p>
        )}
      </div>

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};
export default LocationComp;
