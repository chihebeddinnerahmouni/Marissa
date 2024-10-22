import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";


const choices = [
    {
        choice: "A",
        text: "USA",
    },
    {
        choice: "B",
        text: "KSA",
    },
    {
        choice: "C",
        text: "Emirates",
    },
    {
        choice: "D",
        text: "Qatar",
    }
]


const Region = () => {
      const { t } = useTranslation();
      const [choice, setChoice] = useState<string>("individual");
      const navigate = useNavigate();

      const handleContinue = () => {
        navigate("/boats-list/water-craft");
    };
    
    return (
      <div className="w-full md:w-[500px]">
        <p className="mb-7 text-[25px] font-bold">
          {t("what_region_do_you_operate_in?")}
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

export default Region;
