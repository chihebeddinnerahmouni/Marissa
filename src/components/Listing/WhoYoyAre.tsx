import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";
import { ListingContext } from "@/Layout/ListeBoatLayout";



const choices = [
  {
    id: 1,
    text: "im_individual",
  },
  {
    id: 2,
    text: "charter_rental_company",
  },
  {
    id: 3,
    text: "charter_borker",
  }
]



const WhoYoyAre = () => {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<string>(sessionStorage.getItem("Listing_who_are_you") || "");
  const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);

  useEffect(() => {
    setProgress((100 / 5) * 1);
    sessionStorage.clear();
  }, []);

  const handleContinue = () => {
    if (!choice) return;
    
    const choiceString = choices.find((item) => item.id.toString() === choice)?.text;
    // console.log(choiceString);

    sessionStorage.setItem("Listing_who_are_you", choiceString as string);
    navigate("/boats-list/region");
  }

// console.log("choice", choice)


  return (
    <div className="w-full md:w-[500px]">
      <p className="text-[25px] text-writingMainDark">
        {t("tell_us_about_your_self")}
      </p>

      <p className="my-7 text-[25px] font-bold">
        {t("which_of_the_following_are_you?")}
      </p>

      <div className="choices w-full flex flex-col gap-2 md:w-[300px]">
        {choices.map((item, index) => (
          <ChoiceButton
            key={index}
            choice={(index+1).toString()}
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

export default WhoYoyAre;
