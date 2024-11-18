import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import NumbersHandlers from "../inquiry forms/NumbersHandlers";
import Swal from "sweetalert2";
import PageName from "./PageName";

const Guests = () => {
  const { setProgress, steps, guests, setGuests, name, desc, lat, long, selectedFeatures, selectedImages, category, region } = useContext(ListingDetailsContext);
  const navigate = useNavigate();


  useEffect(() => {
    const check = [name, desc, lat, long, selectedFeatures, selectedImages, category, region];
    const isAnyEmpty = check.some((item) => !item || item.length === 0);
    if (isAnyEmpty) {
      navigate("/boats-list/title");
    }
    setProgress((100 / steps) * 8);
  }, []);

  const handleContinue = () => {
    if (guests === 0) {
     return Swal.fire({
        title: "Oops...",
        text: "Please enter at least 1 guest!",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
    }
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
