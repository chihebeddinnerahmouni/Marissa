import { useTranslation } from "react-i18next";
import React, { useState, useCallback} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaMinusCircle, FaCamera } from "react-icons/fa";
import LoadingButton from "@/components/ui/LoadingButton";
import ModalComp from "@/components/ui/modals/ModalComp";
import {axios_error_handler} from "@/functions/axios_error_handler";
import MultiLineInput from "@/components/ui/inputs/MultiLine";
import ButtonFunc from "../ui/buttons/Button";
import Title from "../ui/modals/Title";
import { toast } from "react-hot-toast";

interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: any;
}

const UpdateImages: React.FC<UpdatePricesProps> = ({ setIsOpen, images }) => {

  const { t } = useTranslation();
  const [imageList, setImageList] = useState<any[]>(images);
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const [loading, setLoading] = useState(false);
  const urlList = import.meta.env.VITE_SERVER_URL_LISTING;

  

  // Remove image from imageList
  const removeImage = useCallback((index: number) => {
    const newImageList = imageList.filter((_, i) => i !== index);
    setImageList(newImageList);
  }, [imageList]);

  // Add images to imageList (for manual upload)
  const handleAddImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImageList([...imageList, ...newImages]);
    }
  }, [imageList]);



  // Submit images
const handleContinue = async () => {
  if (imageList.length < 8) {
    // Swal.fire({
    //   title: t("ops"),
    //   text: t("please_add_at_least_5_images"),
    //   timer: 3000,
    //   timerProgressBar: true,
    //   width: 400,
    //   customClass: {
    //     confirmButton: "custom-confirm-button",
    //   },
    // });
    toast.error(t("please_add_at_least_5_images"));
    return;
  }

  setLoading(true);

  const formData = new FormData();
  for (const image of imageList) {
    if (image.id) {
      const response = await fetch(`${urlList}/${image.url}`);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      formData.append("images", file);
    } else {
      formData.append("images", image.file);
    }
  }

  try {
    await axios.put(`${urlList}/api/listing/listings/${myBoatId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
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
    window.location.reload();
  } catch (err: any) {
    // console.log(err.response.data);
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
  }
};

  // console.log(imageList);
  return (
    <ModalComp onClose={() => setIsOpen(false)}>
      <p className="mb-5 text-[25px] font-bold">{t("update_images")}</p>
      <div className="grid grid-cols-3 gap-4 w-full max-h-[400px] overflow-auto">
        {imageList.map((image: any, index: number) => (
          <div key={index} className="relative">
            <img
              src={image.id ? `${urlList}/${image.url}` : image.url}
              // src={image.url}
              alt={`Boat image ${index + 1}`}
              className="w-full h-24 md:h-32 object-cover object-center rounded-lg shadow-sm"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 left-2 text-red-500 text-xl"
            >
              <FaMinusCircle />
            </button>
          </div>
        ))}
        <label className="relative flex items-center justify-center w-full h-24 md:h-32 bg-gray-200 rounded-lg shadow-sm cursor-pointer">
          <FaCamera className="text-gray-500 text-2xl" />
          <input
            type="file"
            multiple
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleAddImage}
          />
        </label>
      </div>
      <button
        onClick={handleContinue}
        disabled={loading}
        className="w-full h-10 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out mt-5"
      >
        {/* {t("save")} */}
        {loading ? <LoadingButton /> : t("save")}
      </button>
    </ModalComp>
  );
};

export default UpdateImages;
