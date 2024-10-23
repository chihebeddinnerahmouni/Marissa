import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NextButton from "./NextButton";
import { useTranslation } from "react-i18next";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState, useContext, useEffect} from "react";
import PickADay from "./PickADay";
import { InquiryContext } from "../../Layout/InquiryLayout";

const DateComp = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [date, setDate] = useState<any>("10-10-2021");
  const { setProgress } = useContext(InquiryContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  useEffect(() => {
    setProgress((100/6)*2);
  }, []);

  const nextHandler = () => {
    navigate(`/inquiry/${boatId}/departure`);
  };
  return (
    <div
      className={`all flex flex-col items-center ${
        isCalendarOpen ? "h-[420px]" : "h-full"
      }`}
    >
      <p className="text-[22px] font-medium text-writingMainDark">
        {t("preferred_date")}
      </p>
      <p className="text-[14px] text-writingGrey text-center">
        {t("provide_the_preferred_date")}
      </p>

      {/* the fields */}
      <div className="preferedDay w-[220px] h-[35px] flex justify-between items-center mt-10 gap-3">
        <p className="text-writingGrey">{t("date")}</p>
        <div
          className="day bg-emptyInput h-8 flex-grow flex items-center border-1 border-gray-400 rounded-[5px] justify-between px-3 cursor-pointer"
          onClick={() => { setIsCalendarOpen(true)} }
        >
          <FaRegCalendarAlt className="text-writingGrey" />
          <p>{date}</p>
          <button onClick={(e: any) => {
            e.stopPropagation();
            setDate("");
          }}>x</button>
        </div>
      </div>

      <NextButton onClick={nextHandler} />

      {isCalendarOpen && (
        <PickADay
          setIsCalendarOpen={setIsCalendarOpen}
          setDate={setDate}
          date={date}
        />
      )}
    </div>
  );
};

export default DateComp;
