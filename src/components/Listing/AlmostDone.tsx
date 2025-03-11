import { useTranslation } from "react-i18next";
import ChoiceButton from "./ChoiceButton";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ConditionComp from "./ConditionComp";
import conditionsArray from "../../assets/files/Listing_conditions";
import { ListingContext } from "@/Layout/ListeBoatLayout";
import axios from "axios";
import ContinueButton from "./ContinueButton";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {axios_error_handler} from "@/functions/axios_error_handler";


const choices = [
  {
    id: 1,
    text: "im_ready_to_go",
  },
];

const sendData = async (body: any) => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { data } = await axios.post(`${url}/api/submit/user-submissions`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return data;
}


const AlmostDone = () => {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<string>("");
  const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);
  const whoAreYou = sessionStorage.getItem("Listing_who_are_you");
  const region = sessionStorage.getItem("Listing_region");
  const waterCraft = sessionStorage.getItem("Listing_watercraft");
  const check = !whoAreYou || !region || !waterCraft;

  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      navigate("/boats-list/done");
    },
    onError: (err: any) => {
      sessionStorage.clear();
      axios_error_handler(err, t);
    }
  })

  useEffect(() => {
    setProgress((100 / 5) * 4);
  }, []);

  const handleContinue = () => {
    if (!choice) return toast.error(t("please_agree_before_proceeding"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    if (check) return toast.error(t("please_fill_all_required_fields_in_previous_steps"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
      const body = {
        business_type: whoAreYou,
        city: region,
        boat_type: waterCraft,
        business_management: "Captain Included",
      }
      mutate(body);
  };

  return (
    <div className="w-full pb-20 md:w-[500px] mt-[120px] md:mt-0">
      <p className="mb-3 text-[25px] font-bold">{t("great_almost_done")}</p>
      <p className="mb-10 text-[25px] font-bold">
        {t("information_you_need_to_know")}
      </p>
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

      <ContinueButton onClick={handleContinue} loading={isPending} />
    </div>
  );
};

export default AlmostDone;
