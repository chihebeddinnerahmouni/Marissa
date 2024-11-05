import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";
import { ListingContext } from "@/Layout/ListeBoatLayout";

const choices = [
  {
    id: 1,
    text: "power_pontoon_yacht_rib",
  },
  {
    id:2,
    text: "sailboat_cataraman",
  },
  {
    id:3,
    text: "jet_ski_pwcs",
  },
  {
    id:4,
    text: "non_powered",
  },
];

const WaterCraft = () => {

          const { t } = useTranslation();
          const [choice, setChoice] = useState<string>(sessionStorage.getItem("Listing_watercraft") || "");
  const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);

  useEffect(() => {
    setProgress((100/5)*3);
  }, []);

  const handleContinue = () => {
    if (!choice) return;
    sessionStorage.setItem("Listing_watercraft", choice);
            navigate("/boats-list/conditions");
    };
    
  // console.log("choice", choice);

    return (
      <div className="w-full md:w-[500px]">
        <p className="mb-3 text-[25px] font-bold">
          {t("which_watercraft_are_you_listing?")}
        </p>
        <p className="mb-7 text-[20px] text-writingGrey">
          {t("select_the_first_type_that_you_plan_to_add")}
        </p>

        <div className="choices w-full flex flex-col gap-2 md:w-[300px]">
          {choices.map((item, index) => (
            <ChoiceButton
              key={index}
              choice={(index + 1).toString()}
              text={item.text}
              value={choice}
              setValue={setChoice}
              checkValue={item.text}
              id={item.id.toString()}
            />
          ))}
        </div>

        <ContinueButton onClick={handleContinue} />
      </div>
    );
};

export default WaterCraft;
