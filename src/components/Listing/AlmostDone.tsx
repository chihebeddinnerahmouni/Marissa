import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";
import ConditionComp from "./ConditionComp";
import conditionsArray from '../../assets/files/Listing_conditions'
import { ListingContext } from "@/Layout/ListeBoatLayout";

const choices = [
    {
        choice: "A",
        text: "im_ready_to_go",
        },
        {
        choice: "B",
        text: "i_need_more_informations",
        }
]

const AlmostDone = () => {

              const { t } = useTranslation();
              const [choice, setChoice] = useState<string>("individual");
  const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);

  useEffect(() => {
    setProgress((100 / 5) * 4);
  }, []);

              const handleContinue = () => {
                navigate("/boats-list/contact");
              };
    
    
    
    return (
      <div className="w-full md:w-[500px] mt-[150px]">
        <p className="mb-3 text-[25px] font-bold">{t("great_almost_done")}</p>
        <p className="mb-10 text-[25px] font-bold">
          {t("information_you_need_to_know")}
        </p>

        {/* conditions */}
        <div className="conditions flex flex-col gap-4">
          {conditionsArray.map((condition) => (
            <ConditionComp
              key={condition.id}
              num={condition.id}
              title={condition.title}
              description={condition.description}
            />
          ))}
        </div>

        <p className="mt-5">* {t("certain_bodies_of_water")}</p>

        <hr className="w-[60%] border-t-2 border-writingGrey rounded-60 my-5" />

        <p className="text-[22px] font-bold text-writingMainDark">
          {t("we_understand_that_boating_regulations")}
        </p>

        <div className="choices w-full flex flex-col gap-2 mt-10 md:w-[300px]">
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

export default AlmostDone;
