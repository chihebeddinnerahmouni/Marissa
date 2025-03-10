import { useTranslation } from "react-i18next";
import React, { useState, useCallback} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaMinusCircle, FaCamera } from "react-icons/fa";
import ModalComp from "@/components/ui/modals/ModalComp";
import { axios_toast_error } from "@/functions/axios_toast_error";
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
  if (imageList.length < 5) {
    toast.error(t("please_add_at_least_5_images"),{
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
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
    window.location.reload();
  } catch (err: any) {
    setLoading(false);
    axios_toast_error(err, t);
    
  }
};

  // console.log(imageList);
  return (
    <ModalComp onClose={() => setIsOpen(false)}>
      <Title title={t("update_images")} />
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
      <div className="w-full mt-5">
        <ButtonFunc
          text={t("save")}
          onClick={handleContinue}
          loading={loading}
        />
      </div>
    </ModalComp>
  );
};

export default UpdateImages;
