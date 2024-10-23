import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import NextButton from "./NextButton";
import { useNavigate } from "react-router-dom";
import { InquiryContext } from "../../Layout/InquiryLayout";

const Extra = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setProgress } = useContext(InquiryContext);

  useEffect(() => {
    setProgress((100/6) * 5);
  }, []);

  const [extra, setExtra] = useState("");

  const nextHandler = () => {
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

      {/* fields */}

      <textarea
        value={extra}
        onChange={(e) => setExtra(e.target.value)}
        className="bg-emptyInput border-1 outline-none border-writingMainDark w-[320px] mt-10 h-[100px] rounded-[5px] p-2"
      />

      <NextButton onClick={nextHandler} />
    </div>
  );
};

export default Extra;
