import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
// import LoadingButton from "../ui/LoadingButton";
import PageName from "./PageName";



const LocationComp = () => {
  const { setProgress, steps, long, setLong, lat, setLat, name, desc } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
    const { coords, isGeolocationEnabled } =
      useGeolocated({
        positionOptions: {
          enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
      });

    
  useEffect(() => {
    if (!name || !desc) {
      navigate("/boats-list/title");
    }
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
      // setLat("0");
      // setLong("0");
    navigate("/boats-list/features");
  };

  return (
    <div className="w-full md:w-[500px]">
      <PageName text="specify_location" />
      <div className="flex flex-col items-center mb-5">
        <button
          onClick={locate}
          className="flex items-center justify-center text-main rounded-lg hover:text-mainHover transition duration-100"
        >
          <span className="text-base font-bold hover:text-mainHover">{t("get_location")}</span>
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
