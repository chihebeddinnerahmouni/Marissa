import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useContext, useEffect } from "react";
import NextButton from "./NextButton";
import NumbersHandlers from "./NumbersHandlers";
import { useNavigate } from "react-router-dom";
import { InquiryContext } from "@/Layout/InquiryLayout";
import { toast } from "react-hot-toast";

const Duration = () => {

  useEffect(() => {
    setProgress(100 / 6);
    sessionStorage.clear();
  }, []);


  const { t } = useTranslation();
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { setProgress } = useContext(InquiryContext);

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [nights, setNights] = useState<number>(0);


  const nextHandler = () => {
    const check = !hours && !minutes && !nights;
    if (check) return toast.error(t("please_enter_valid_values_for_all_fields"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    sessionStorage.setItem("inquiry_duration_hours", hours.toString());
    sessionStorage.setItem("inquiry_duration_minutes", minutes.toString());
    sessionStorage.setItem("inquiry_duration_nights", nights.toString());
    navigate(`/inquiry/${boatId}/date`);
  }
  
  return (
    <div className="all flex flex-col items-center">
      <p className="text-[22px] font-medium text-writingMainDark">
        {t("duration")}*
      </p>
      <p className="text-[14px] text-writingGrey">
        {t("how_long_do_you_want_your_trip_to_be?")}
      </p>
      <p className="text-[16px] mt-10 text-writingGrey font-medium">
        {t("return_on_same_day")}
      </p>

      <div className="hours w-[70%] h-[35px] flex justify-between items-center mt-3">
        <p className="text-writingGrey">{t("hours")}</p>
        <NumbersHandlers value={hours} setValue={setHours} />
      </div>
      <div className="hours w-[70%] h-[35px] flex justify-between items-center mt-4">
        <p className="text-writingGrey">{t("minutes")}</p>
        <NumbersHandlers value={minutes} setValue={setMinutes} />
      </div>

      <p className="text-[16px] mt-5 text-writingGrey font-medium">
        {t("overnights")}
      </p>

      <div className="hours w-[70%] h-[35px] flex justify-between items-center mt-3">
        <p className="text-writingGrey">{t("nights")}</p>
        <NumbersHandlers value={nights} setValue={setNights} />
      </div>

      <NextButton onClick={nextHandler} />
    </div>
  );
};

export default Duration;
