import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import NextButton from "./NextButton";
import NumbersHandlers from "./NumbersHandlers";
import { useNavigate } from "react-router-dom";
import { InquiryContext } from "../../Layout/InquiryLayout";

const Groupe = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setProgress } = useContext(InquiryContext);

  useEffect(() => {
    setProgress((100/6)*4);
  }, []);

  const [adultes, setAdultes] = useState(Number(sessionStorage.getItem("inquiry_groupe_adultes")) || 0);
  const [childrens, setChildrens] = useState(Number(sessionStorage.getItem("inquiry_groupe_childrens")) || 0);
  const [infants, setInfants] = useState(Number(sessionStorage.getItem("inquiry_groupe_infants")) || 0);


  const nextHandler = () => {
    const check = !adultes && !childrens && !infants;
    if (check) return;

    sessionStorage.setItem("inquiry_groupe_adultes", adultes.toString());
    sessionStorage.setItem("inquiry_groupe_childrens", childrens.toString());
    sessionStorage.setItem("inquiry_groupe_infants", infants.toString());
    navigate(`/inquiry/${boatId}/extra`);
  };

  return (
    <div className="all flex flex-col items-center">
      <p className="text-[22px] font-medium text-writingMainDark">
        {t("groupe_size")}
      </p>

      {/* fields */}
      <div className="hours w-[70%] h-[35px] flex justify-between items-center mt-4">
        <p className="text-writingGrey">{t("adultes")}</p>
        <NumbersHandlers value={adultes} setValue={setAdultes} />
      </div>
      <div className="hours w-[70%] h-[35px] flex justify-between items-center mt-4">
        <p className="text-writingGrey">{t("childrens")}</p>
        <NumbersHandlers value={childrens} setValue={setChildrens} />
      </div>
      <div className="hours w-[70%] h-[35px] flex justify-between items-center mt-4">
        <p className="text-writingGrey">{t("infants")}</p>
        <NumbersHandlers value={infants} setValue={setInfants} />
      </div>

      <div className="w-[50%] border-t border-dashed border-gray-300 my-5"></div>

      <p className="text-[18px] font-medium text-writingMainDark">
        {t("total")}: {adultes + childrens + infants}
      </p>

      <NextButton onClick={nextHandler} />
    </div>
  );
};

export default Groupe;
