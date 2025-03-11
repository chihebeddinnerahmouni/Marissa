import { useContext, useEffect, useState } from 'react'
import { ListingDetailsContext } from '@/Layout/ListBoatDetailsLayout'
import { useTranslation } from 'react-i18next'
import ContinueButton from '../Listing/ContinueButton'
import { useNavigate } from 'react-router-dom'
import PageName from './PageName'
import InputText from '../ui/inputs/InputText'
import { toast } from 'react-hot-toast'




const Title = () => {

  const { setProgress, steps, name, setName } = useContext(ListingDetailsContext);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isValid, setIsvalid] = useState(true);
  const min = 12;
  const max = 40;
  
  useEffect(() => {
    sessionStorage.clear();
    setProgress((100 / steps) * 1);
  }, []);


  const handleContinue = () => {
    if (!name) return toast.error(t("please_enter_valid_value"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    if (name.length < min || name.length > max) return setIsvalid(false);
    navigate("/boats-list/description");
  }

  return (
    <div className="w-full md:w-[600px]">
      <PageName text="name_your_boat" />
      <InputText
        value={name}
        setValue={(e: any) => {
          setIsvalid(true);
          setName(e.target.value);
        }}
        label={t("boat_name")}
        error={!isValid}
        helperText={!isValid && t("name_must_be_between_12_and_50_characters")}
        bgColor="bg-emptyInput"
      />

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Title
