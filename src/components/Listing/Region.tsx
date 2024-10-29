import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";
import { ListingContext } from "@/Layout/ListeBoatLayout";
import axios from "axios";
import LoadingLine from "../ui/LoadingLine";





const Region = () => {
      const { t } = useTranslation();
      const [choice, setChoice] = useState<string>(sessionStorage.getItem("Listing_region") || "");
    const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);
  const [Loading, setLoading] = useState(true);
  const [placesArray, setPlacesArray] = useState<any>([]);
    const url = import.meta.env.VITE_SERVER_URL_LISTING;

    useEffect(() => {
      setProgress((100 / 5) * 2);
          axios
            .get(`${url}/api/region/regions`)
            .then((response) => {
              setPlacesArray(response.data);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
    }, []);

  const handleContinue = () => {
    if (!choice) return;
    sessionStorage.setItem("Listing_region", choice);
        navigate("/boats-list/water-craft");
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
                value={choice}
                setValue={setChoice}
                checkValue={choiceElem.name}
                />
            ))}
        </div>

        <ContinueButton onClick={handleContinue} />
      </div>
    );
};

export default Region;
