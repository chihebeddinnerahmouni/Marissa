import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";

const Descrition = () => {
  const { setProgress, steps } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
    const [name, setName] = useState<string>("");
    const navigate = useNavigate();

  useEffect(() => {
    setProgress((100 / steps) * 2);
  }, []);

  const handleContinue = () => {
    // if (!choice) return;
    // sessionStorage.setItem("Listing_who_are_you", choice);
    // navigate("/boats-list/region");
  };

  return (
    <div className="w-full md:w-[500px]">
      <p className="mb-5 text-[25px] font-bold">{t("describe_your_boat")}</p>

      <textarea
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("boat_name")}
        className="bg-emptyInput w-full h-14 p-1 rounded-[5px] border-1 border-gray-300 outline-main md:h-20 lg:h-28 lg:text-[18px] lg:p-2"
      />

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Descrition;


