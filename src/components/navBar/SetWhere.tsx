import { useTranslation } from "react-i18next";
import PlacesButtons from "./PlacesComp";
// import placesArray from "../../assets/files/Places_array";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingLine from "../ui/LoadingLine";

const SetWhere = () => {

  const { i18n } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const [loading, setLoading] = useState(true);
  const [placesArray, setPlacesArray] = useState<any>([]);

  
  useEffect(() => { 
    axios
      .get(`${url}/api/region/regions`)
      .then((response) => {
        setPlacesArray(response.data);
        // setPlacesArray(placesArray);
        setLoading(false);
      })
      .catch((error) => {
          console.log(error);
        });
  }, []);


  if (loading)
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  
  return (
    <div
      className={`max-h-[420px] w-[100%]flex flex-col gap-1 lg:max-h-[420px] ${
        i18n.language === "en" ? "lg:mr-auto" : "lg:ml-auto"
      }`}
    >
      {placesArray.map((place:any, index: any) => (
        <PlacesButtons key={index} place={place} />
      ))}
    </div>
  );
};

export default SetWhere;
