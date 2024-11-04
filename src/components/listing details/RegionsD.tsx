import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingLine from "../ui/LoadingLine";
import ChoiceButton from "../Listing/ChoiceButton";

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

const RegionsD = () => {

      const { setProgress, steps, region, setRegion, name, desc, lat, long, selectedFeatures, selectedImages, category } = useContext(ListingDetailsContext);
      const { t } = useTranslation()
    const navigate = useNavigate();
     const [Loading, setLoading] = useState(true);
     const [placesArray, setPlacesArray] = useState<any>([]);
    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    

  useEffect(() => {
    const check = !name || !desc || !lat || !long || selectedFeatures.length === 0 || selectedImages.length < 5 || !category
    if (check) {
      return navigate("/boats-list/title");
    }
      setProgress((100 / steps) * 7);
      // setPlacesArray(regionsdummy);
      setLoading(false);
        axios
          .get(`${url}/api/region/regions`)
            .then((response) => {
              // console.log(response.data);
            setPlacesArray(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);

      const handleContinue = () => {
        if (!region) return;
        navigate("/boats-list/guests");
      };

      if (Loading) {
        return <LoadingLine />;
    }
    


    return (
          <div className="w-full md:w-[500px]">
        <p className="mb-7 text-[25px] font-bold">
          {t("what_region_do_you_operate_in?")}
        </p>

        <div className="choices w-full flex flex-col gap-2 md:w-[300px]">
            {placesArray.map((choiceElem: any, index: number) => (
              <ChoiceButton
                key={index}
                choice={(index + 1).toString()}
                text={choiceElem.name}
                value={region}
                setValue={setRegion}
                checkValue={choiceElem.name}
                id={choiceElem.id}
                />
            ))}
        </div>

            <ContinueButton onClick={handleContinue} />
        </div>
            )
};

export default RegionsD;
