import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";
import { ListingContext } from "@/Layout/ListeBoatLayout";
import axios from "axios";
import LoadingLine from "../ui/LoadingLine";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


const fetshRegions = async () => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { data } = await axios.get(`${url}/api/region/regions`);
  return data;
}


const Region = () => {
  const { t, i18n } = useTranslation();
  const [choice, setChoice] = useState<string>(
    sessionStorage.getItem("Listing_region") || ""
  );
  const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);

  useEffect(() => {
    setProgress((100 / 5) * 2);
  }, []);

  const { data: placesArray, isLoading } = useQuery({
    queryKey: ["listing_regions"],
    queryFn: fetshRegions,
  })

  const handleContinue = () => {
    if (!choice) return toast.error(t("please_select_a_choice"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    sessionStorage.setItem("Listing_region", choice);
    navigate("/boats-list/water-craft");
  };

  if (isLoading) {
    return <LoadingLine />;
  }


  return (
    <div className="w-full md:w-[500px]">
      <p className="mb-7 text-[25px] font-bold">
        {t("what_region_do_you_operate_in?")}
      </p>

      <div className="choices w-full grid gap-2 lg:w[900px] md:grid-cols-2">
        {placesArray.map((item: any, index: number) => (
          <ChoiceButton
            key={index}
            choice={(index + 1).toString()}
            text={i18n.language === "ar" ? item.arabic_name : item.name}
            value={choice}
            setValue={setChoice}
            checkValue={item.name}
            id={item.id.toString()}
          />
        ))}
      </div>

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Region;
