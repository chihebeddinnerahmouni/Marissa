import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NextButton from "./NextButton";
import { useTranslation } from "react-i18next";
import { TbClockHour4 } from "react-icons/tb";
import { useState, useContext, useEffect } from "react";
import { InquiryContext } from "../../Layout/InquiryLayout";
import { toast } from "react-hot-toast";




const DepartureTime = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [time, setTime] = useState(sessionStorage.getItem("inquiry_departure") || "");
  const { setProgress } = useContext(InquiryContext);

  useEffect(() => {
    setProgress((100/6)*3);
  }, []);

  const nextHandler = () => {
    if (!time) return toast.error(t("please_enter_valid_value"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    sessionStorage.setItem("inquiry_departure", time);
    navigate(`/inquiry/${boatId}/groupe`);
  };

  return (
    <div className="all flex flex-col items-center">
      <p className="text-[22px] font-medium text-writingMainDark">
        {t("departure_time")}*
      </p>
      <p className="text-[14px] text-writingGrey">
        {t("what_time_would_you_like_to_depart?")}
      </p>

      {/* the field */}
      <div className="hours mt-10 flex items-center justify-center gap-5">
        <label htmlFor="timeForm">
          <TbClockHour4 className="text-writingGrey text-[22px] hover:text-writingMainDark" />
        </label>
        <input
          type="time"
          id="timeForm"
          name="timeForm"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border rounded p-2"
        />
        <button className="text-sm underline text-writingMainDark" onClick={()=> setTime("")}>
          {t("reset")}
        </button>
      </div>

      <NextButton onClick={nextHandler} />
    </div>
  );
}
export default DepartureTime;
