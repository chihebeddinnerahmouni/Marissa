import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";

const Descrition = () => {
  const { setProgress, steps, desc, setDesc } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
    // const [desc, setDesc] = useState<string>("");
    const navigate = useNavigate();

  useEffect(() => {
    setProgress((100 / steps) * 2);
  }, []);

  const handleContinue = () => {
    if (!desc) return;
    // sessionStorage.setItem("Listing_details_desc", desc);
    navigate("/boats-list/location");
  };

  return (
    <div className="w-full md:w-[500px]">
      <p className="mb-5 text-[25px] font-bold">{t("describe_your_boat")}</p>

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder={t("boat_name")}
        className="bg-emptyInput w-full h-14 p-1 rounded-[5px] border-1 border-gray-300 outline-main md:h-20 lg:h-28 lg:text-[18px] lg:p-2"
      />

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Descrition;


