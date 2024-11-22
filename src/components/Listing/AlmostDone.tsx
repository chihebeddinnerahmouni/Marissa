import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ConditionComp from "./ConditionComp";
import conditionsArray from "../../assets/files/Listing_conditions";
import { ListingContext } from "@/Layout/ListeBoatLayout";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";
// import Swal from "sweetalert2";

const choices = [
  {
    id: 1,
    text: "im_ready_to_go",
  },
];

const AlmostDone = () => {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<string>(
    sessionStorage.getItem("Listing_almost_done") || ""
  );
  const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const whoAreYou = sessionStorage.getItem("Listing_who_are_you");
  const region = sessionStorage.getItem("Listing_region");
  const waterCraft = sessionStorage.getItem("Listing_watercraft");
  const check = !whoAreYou || !region || !waterCraft;

  // console.log(waterCraft, region, whoAreYou);

  useEffect(() => {
    setProgress((100 / 5) * 4);
  }, []);

  const handleContinue = () => {
    if (!choice) return;

    if (!check) {
      setLoading(true);
      const token = localStorage.getItem("jwt");
      axios
        .post(
          `${url}/api/submit/user-submissions`,
          {
            business_type: whoAreYou,
            city: region,
            boat_type: waterCraft,
            business_management: "Captain Included",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          setLoading(false);
          navigate("/boats-list/done");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      alert("All data is required, please check the previous steps");
    }
  };

  return (
    <div className="w-full pb-20 md:w-[500px] mt-[120px] md:mt-0">
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

      {/* <ContinueButton onClick={handleContinue} /> */}
      <button
        className="w-[100px] h-[40px] flex justify-center items-center bg-main mt-4 text-white rounded-60 hover:bg-mainHover"
        onClick={handleContinue}
      >
        {loading ? <LoadingButton /> : <p>{t("continue")}</p>}
      </button>
    </div>
  );
};

export default AlmostDone;
