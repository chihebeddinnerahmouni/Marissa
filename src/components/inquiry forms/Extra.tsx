import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import NextButton from "./NextButton";
import { useNavigate } from "react-router-dom";
import { InquiryContext } from "../../Layout/InquiryLayout";
import MultiLine from "../ui/inputs/MultiLine";



const Extra = () => {
  
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setProgress } = useContext(InquiryContext);
  const [extra, setExtra] = useState(sessionStorage.getItem("inquiry_extra") || "");


  useEffect(() => {
    setProgress((100/6) * 5);
  }, []);

 

  const nextHandler = () => {
    if (!extra) return;
    sessionStorage.setItem("inquiry_extra", extra);
    navigate(`/inquiry/${boatId}/contact`);
  }
  

  return (
    <div className="all flex flex-col items-center">
      <p className="text-[22px] font-medium text-writingMainDark">
        {t("anything_else?")}
      </p>
      <p className="text-[14px] text-writingGrey text-center">
        {t("specefic_needs")}
      </p>
      <div className="mt-10 w-full">
        <MultiLine value={extra} setValue={(e: any) => setExtra(e.target.value)} label="" />
      </div>
      <NextButton onClick={nextHandler} />
    </div>
  );
};

export default Extra;
