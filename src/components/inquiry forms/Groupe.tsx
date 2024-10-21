import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import NextButton from "./NextButton";
import NumbersHandlers from "./NumbersHandlers";
import { useNavigate } from "react-router-dom";

const Groupe = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [adultes, setAdultes] = useState(0);
  const [seniotrs, setSeniotrs] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);


  const nextHandler = () => {
    // navigate(`/inquiry/${boatId}/captain`);
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
        <p className="text-writingGrey">{t("seniors")}</p>
        <NumbersHandlers value={seniotrs} setValue={setSeniotrs} />
      </div>
      <div className="hours w-[70%] h-[35px] flex justify-between items-center mt-4">
        <p className="text-writingGrey">{t("childrens")}</p>
        <NumbersHandlers value={children} setValue={setChildren} />
      </div>
      <div className="hours w-[70%] h-[35px] flex justify-between items-center mt-4">
        <p className="text-writingGrey">{t("infants")}</p>
        <NumbersHandlers value={infants} setValue={setInfants} />
      </div>

      <div className="w-[50%] border-t border-dashed border-gray-300 my-5"></div>

      <p className="text-[18px] font-medium text-writingMainDark">
        {t("total")}: {adultes + seniotrs + children + infants}
      </p>

      <NextButton onClick={nextHandler} />
    </div>
  );
};

export default Groupe;
