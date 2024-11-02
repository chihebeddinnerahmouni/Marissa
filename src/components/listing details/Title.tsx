import { useContext, useEffect, useState } from 'react'
import { ListingDetailsContext } from '@/Layout/ListBoatDetailsLayout'
import { useTranslation } from 'react-i18next'
import ContinueButton from '../Listing/ContinueButton'
import { useNavigate } from 'react-router-dom'




const Title = () => {

  const { setProgress, steps } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  
  useEffect(() => {
    setProgress((100 / steps) * 1);
    sessionStorage.clear();
  }, []);

  const handleContinue = () => {
    if (!name) return;
    sessionStorage.setItem("Listing_details_name", name);
    navigate("/boats-list/description");
  }

  return (
    <div className="w-full md:w-[500px]">
      <p className="mb-5 text-[25px] font-bold">{t("name_your_boat")}</p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("boat_name")}
        className="bg-emptyInput w-full h-10 px-3 rounded-[5px] border-1 border-gray-300 outline-main md:h-10 lg:h-12 lg:text-[18px]"
      />

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Title
