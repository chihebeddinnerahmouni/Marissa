import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";

const choices = [
  {
    choice: "A",
    text: "power_pontoon_yacht_rib",
  },
  {
    choice: "B",
    text: "sailboat_cataraman",
  },
  {
    choice: "C",
    text: "jet_ski_pwcs",
  },
  {
    choice: "D",
    text: "non_powered",
  },
];

const WaterCraft = () => {

          const { t } = useTranslation();
          const [choice, setChoice] = useState<string>("individual");
          const navigate = useNavigate();

          const handleContinue = () => {
            navigate("/boats-list/conditions");
    };
    

    return (
      <div className="w-full md:w-[500px]">
        <p className="mb-3 text-[25px] font-bold">
          {t("which_watercraft_are_you_listing?")}
        </p>
        <p className="mb-7 text-[20px] text-writingGrey">
          {t("select_the_first_type_that_you_plan_to_add")}
        </p>

        <div className="choices w-full flex flex-col gap-2 md:w-[300px]">
          {choices.map((choiceElem) => (
            <ChoiceButton
              choice={choiceElem.choice}
              text={choiceElem.text}
              value={choice}
              setValue={setChoice}
              checkValue={choiceElem.choice}
            />
          ))}
        </div>

        <ContinueButton onClick={handleContinue} />
      </div>
    );
};

export default WaterCraft;
