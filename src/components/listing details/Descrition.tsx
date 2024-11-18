import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import PageName from "./PageName";

const Descrition = () => {
  const { setProgress, steps, desc, setDesc, name } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
    const navigate = useNavigate();

  useEffect(() => {
    if (!name) navigate("/boats-list/title");
    setProgress((100 / steps) * 2);
  }, []);

  const handleContinue = () => {
    if (!desc) return;
    navigate("/boats-list/location");
  };

  return (
    <div className="w-full md:w-[600px]">
      <PageName text="describe_your_boat" />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder={t("boat_description")}
        className="bg-emptyInput w-full h-14 p-1 rounded-[5px] border-1 border-gray-300 outline-main md:h-20 lg:h-28 lg:text-[18px] lg:p-2"
      />

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Descrition;


