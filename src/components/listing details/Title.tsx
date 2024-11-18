import { useContext, useEffect, useState } from 'react'
import { ListingDetailsContext } from '@/Layout/ListBoatDetailsLayout'
import { useTranslation } from 'react-i18next'
import ContinueButton from '../Listing/ContinueButton'
import { useNavigate } from 'react-router-dom'
import PageName from './PageName'




const Title = () => {

  const { setProgress, steps, name, setName } = useContext(ListingDetailsContext);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isValid, setIsvalid] = useState(true);
  const min = 12;
  const max = 40;
  
  useEffect(() => {
    setProgress((100 / steps) * 1);
  }, []);


  const handleContinue = () => {
    if (!name) return;
    if (name.length < min || name.length > max) return setIsvalid(false);
    navigate("/boats-list/description");
  }

  return (
    <div className="w-full md:w-[600px]">
      <PageName text="name_your_boat" />

      <input
        type="text"
        value={name}
        onChange={(e) => {
          setIsvalid(true);
          setName(e.target.value);
        }}
        placeholder={t("boat_name")}
        className="bg-emptyInput w-full h-10 px-3 rounded-[5px] border-1 border-gray-300 outline-main md:h-10 lg:h-12 lg:text-[18px]"
      />

      {!isValid && <p className='text-red-500 mt-1 text-sm'>{t("name_must_be_between_12_and_50_characters")}</p>}

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Title
