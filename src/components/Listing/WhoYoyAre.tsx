import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";
import { ListingContext } from "@/Layout/ListeBoatLayout";

const WhoYoyAre = () => {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<string>("");
  const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);

  useEffect(() => {
    setProgress((100/5) * 1);
  }, []);

  const handleContinue = () => {
    navigate("/boats-list/region");
  }

  return (
    <div className="w-full md:w-[500px]">
      <p className="text-[25px] text-writingMainDark">
        {t("tell_us_about_your_self")}
      </p>

      <p className="my-7 text-[25px] font-bold">
        {t("which_of_the_following_are_you?")}
      </p>

      <div className="choices w-full flex flex-col gap-2 md:w-[300px]">
        <ChoiceButton
          choice={"A"}
          text={"im_individual"}
          value={choice}
          setValue={setChoice}
          checkValue={"individual"}
        />
        <ChoiceButton
          choice={"B"}
          text={"charter_rental_company"}
          value={choice}
          setValue={setChoice}
          checkValue={"company"}
        />
        <ChoiceButton
          choice={"C"}
          text={"charter_borker"}
          value={choice}
          setValue={setChoice}
          checkValue={"borker"}
        />
      </div>

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default WhoYoyAre;
