import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingLine from "../ui/LoadingLine";
import ChoiceButton from "../Listing/ChoiceButton";



const RegionsD = () => {

      const { setProgress, steps, region, setRegion } = useContext(ListingDetailsContext);
      const { t } = useTranslation()
    const navigate = useNavigate();
     const [Loading, setLoading] = useState(true);
     const [placesArray, setPlacesArray] = useState<any>([]);
    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    // const [choice, setChoice] = useState<string>("");
    

    useEffect(() => {
        setProgress((100 / steps) * 7);
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
        const regionId = placesArray.find((elem: any) => elem.name === region).id;
        setRegion(regionId);
        // const choiceId = placesArray.find((elem: any) => elem.name === choice).id;
        // sessionStorage.setItem("Listing_details_region", choiceId);
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
                choice={choiceElem.id}
                text={choiceElem.name}
                value={region}
                setValue={setRegion}
                checkValue={choiceElem.name}
                />
            ))}
        </div>

            <ContinueButton onClick={handleContinue} />
        </div>
            )
};

export default RegionsD;
