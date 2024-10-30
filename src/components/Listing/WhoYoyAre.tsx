import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import ContinueButton from "./ContinueButton";
import { useNavigate } from "react-router-dom";
import { ListingContext } from "@/Layout/ListeBoatLayout";

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

    sessionStorage.setItem("Listing_who_are_you", choice);
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
          choice={"1"}
          text={"im_individual"}
          value={choice}
          setValue={setChoice}
          checkValue={"individual"}
        />
        <ChoiceButton
          choice={"2"}
          text={"charter_rental_company"}
          value={choice}
          setValue={setChoice}
          checkValue={"company"}
        />
        <ChoiceButton
          choice={"3"}
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
