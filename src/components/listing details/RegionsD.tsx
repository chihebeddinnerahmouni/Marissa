import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingLine from "../ui/LoadingLine";
import ChoiceButton from "../Listing/ChoiceButton";
import PageName from "./PageName";
import {useQuery} from "@tanstack/react-query";


const fetchRegions = async () => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const response = await axios.get(`${url}/api/region/regions`);
  return response.data;
}

const RegionsD = () => {
  const {
    setProgress,
    steps,
    region,
    setRegion,
    name,
    desc,
    selectedFeatures,
    selectedImages,
    category,
  } = useContext(ListingDetailsContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const array = [name, desc, selectedFeatures, selectedImages, category];
    const check = array.some((elem) => !elem || elem.length === 0);
    if (check) {
      return navigate("/boats-list/title");
    }
    setProgress((100 / steps) * 7);
  }, []);

  const { data: placesArray, isLoading } = useQuery({
    queryKey: ["listingDetailsRegions"],
    queryFn: fetchRegions,
  });

  const handleContinue = () => {
    if (!region) return;
    navigate("/boats-list/guests");
  };

  if (isLoading) return <LoadingLine />;
  

  return (
    <div className="w-full md:w-[500px]">
      <PageName text={t("what_region_do_you_operate_in?")} />
      <div className="choices w-full flex flex-col gap-2 md:w-[300px]">
        {placesArray.map((choiceElem: any, index: number) => (
          <ChoiceButton
            key={index}
            choice={(index + 1).toString()}
            text={i18n.language === "en" ? choiceElem.name : choiceElem.arabic_name}
            value={region}
            setValue={setRegion}
            checkValue={choiceElem.name}
            id={choiceElem.id}
          />
        ))}
      </div>

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default RegionsD;
// const regionsdummy = [
//   {
//     id: 10,
//     name: "North",
//   },
//   {
//     id: 20,
//     name: "South",
//   },
//   {
//     id: 30,
//     name: "East",
//   },
//   {
//     id: 40,
//     name: "West",
//   }
// ]