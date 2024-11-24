import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import React, {useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingButton from "../ui/LoadingButton";

interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setChanged: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}

const UpdateName: React.FC<UpdatePricesProps> = ({
  setIsOpen,
    setChanged,
  title
}) => {


  const { t } = useTranslation();
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const [loading, setLoading] = useState(false);
  const [newTitle, setTitle] = useState(title);
  const [isTitleValid, setIsTitleValid] = useState(true);
    const min = 12;
    const max = 40;
  
    

  // console.log(prices);

  const handleContinue = () => {

    if (newTitle.length < min || newTitle.length > max) return setIsTitleValid(false);

    setLoading(true);
      const formData = new FormData();
      formData.append("title", newTitle);
    axios
      .put(`${url}/api/listing/listings/${myBoatId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: t("great"),
          text: t("prices_updated_successfully"),
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
        setIsOpen(false);
        setLoading(false);
        setChanged((prevChanged) => !prevChanged);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          title: t("oops"),
          text: t("something_went_wrong_try_again"),
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      });
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setIsOpen(false)}
      className="flex flex-col items-center justify-center w-full bg-white p-3 rounded-10 shadow-hardShadow md:w-[500px]"
      overlayClassName="fixed inset-0 backdrop-blur-[7px] bg-opacity-20 bg-black z-20 flex items-center justify-center px-4"
    >
      <p className="mb-5 text-[25px] font-bold">{t("name_your_boat")}</p>

      <div className="w-full">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => {
            setIsTitleValid(true);
            setTitle(e.target.value)
          }}
          placeholder={t("boat_name")}
          className="bg-emptyInput w-full h-10 px-3 rounded-[5px] border-1 border-gray-300 outline-main md:h-10 lg:h-12 lg:text-[18px]"
        />
        {!isTitleValid && (
          <p className="text-red-500 mt-2 text-sm">
            {t("name_must_be_between_12_and_50_characters")}
          </p>
        )}
      </div>

      <button
        onClick={handleContinue}
        className="w-full h-10 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out mt-5"
      >
        {loading ? <LoadingButton /> : t("save")}
      </button>
    </ReactModal>
  );
};

export default UpdateName;
