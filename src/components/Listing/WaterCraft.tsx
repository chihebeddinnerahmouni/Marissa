import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";
import { ListingContext } from "@/Layout/ListeBoatLayout";
import LoadingLine from "../ui/LoadingLine";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";


const fetshCategories = async () => {
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY;
  const res = await axios.get(`${url}/categories`);
  return res.data;
}


const WaterCraft = () => {

          const { t, i18n } = useTranslation();
  const [choice, setChoice] = useState<string>(sessionStorage.getItem("Listing_watercraft") || "");
  const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);

  useEffect(() => {
    setProgress((100 / 5) * 3);
  }, []);

  const { data: choices, isLoading } = useQuery({
    queryKey: ["listing-categories"],
    queryFn: fetshCategories,
  })

  const handleContinue = () => {
    if (!choice) return toast.error(t("please_select_a_choice"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    sessionStorage.setItem("Listing_watercraft", choice);
    navigate("/boats-list/conditions");
    };
    
  // console.log("choice", choice);


  if (isLoading) return <LoadingLine />
  

    return (
      <div className="w-full md:w-[500px]">
        <p className="mb-3 text-[25px] font-bold">
          {t("which_watercraft_are_you_listing?")}
        </p>
        <p className="mb-7 text-[20px] text-writingGrey">
          {t("select_the_first_type_that_you_plan_to_add")}
        </p>

        <div className="choices w-full flex flex-col gap-2 md:w-[300px]">
          {choices.map((item: any, index: number) => (
            <ChoiceButton
              key={index}
              choice={(index + 1).toString()}
              text={i18n.language === "en" ? item.name : item.arabic_name}
              value={choice}
              setValue={setChoice}
              checkValue={i18n.language === "en" ? item.name : item.arabic_name}
              id={item.id.toString()}
            />
          ))}
        </div>

        <ContinueButton onClick={handleContinue} />
      </div>
    );
};

export default WaterCraft;
