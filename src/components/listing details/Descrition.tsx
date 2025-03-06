import {
  useContext, useEffect, useState
} from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import PageName from "./PageName";
import MultiLineInput from "@/components/ui/inputs/MultiLine";

const Descrition = () => {
  const { setProgress, steps, desc, setDesc, name } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isValidate, setIsValidate] = useState(true);

  useEffect(() => {
    if (!name) navigate("/boats-list/title");
    setProgress((100 / steps) * 2);
  }, []);

  const handleContinue = () => {
    if (!desc) return;
    if (desc.length < 60 || desc.length > 500) return setIsValidate(false);
    navigate("/boats-list/location");
  };

  return (
    <div className="w-full md:w-[600px]">
      <PageName text="describe_your_boat" />
      {/* <textarea
        value={desc}
        onChange={(e) => {
          setIsValidate(true);
          setDesc(e.target.value);
        }}
        placeholder={t("boat_description")}
        className="bg-emptyInput w-full h-14 p-1 rounded-[5px] border-1 border-gray-300 outline-main md:h-20 lg:h-28 lg:text-[18px] lg:p-2"
      />
      {!isValidate && (
        <p className="text-red-500 mt-1 text-sm">
          {t("description_must_be_between_60_and_500_characters")}
        </p>
      )} */}
      <MultiLineInput
        value={desc}
        setValue={(e: any) => {
          setIsValidate(true)
          setDesc(e.target.value)
        }}
        label={t("boat_description")}
        error={!isValidate}
        helperText={
          !isValidate
            ? t("description_must_be_between_60_and_500_characters")
            : false
        }
        bgColor="bg-emptyInput"
      />

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Descrition;


