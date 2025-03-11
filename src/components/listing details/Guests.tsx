import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import NumbersHandlers from "../inquiry forms/NumbersHandlers";
import PageName from "./PageName";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Guests = () => {
  const { setProgress, steps, guests, setGuests, name, desc, lat, long, selectedFeatures, selectedImages, category, region } = useContext(ListingDetailsContext);
  const navigate = useNavigate();
  const { t } = useTranslation();


  useEffect(() => {
    const check = [name, desc, lat, long, selectedFeatures, selectedImages, category, region];
    const isAnyEmpty = check.some((item) => !item || item.length === 0);
    if (isAnyEmpty) {
      navigate("/boats-list/title");
    }
    setProgress((100 / steps) * 8);
  }, []);

  const handleContinue = () => {
    if (guests === 0) return toast.error(t("please_enter_valid_value"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    navigate("/boats-list/prices");
  };

  return (
    <div className="w-full md:w-[500px]">
      <PageName text="guests_capacity" />
      <div className="my-10">
        <NumbersHandlers value={guests} setValue={setGuests} />
      </div>
      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Guests;
