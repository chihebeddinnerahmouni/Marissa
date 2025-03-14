import { useTranslation } from "react-i18next";
import React, {useCallback} from "react";
import axios from "axios";
import { axios_error_handler } from "../../functions/axios_error_handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "react-hot-toast";

interface ProfilePicProps {
  profilePic: string;
}

const updateFunction = async (formData: FormData) => {
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const response = await axios.put(`${url}/api/user/upload-avatar`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return response.data;
};

const ProfilePic: React.FC<ProfilePicProps> = ({ profilePic }) => {


  const { t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const queryClient = useQueryClient();
  const [image, setImage] = useState<any>(profilePic);

  const { mutate, isPending } = useMutation({
    mutationFn: updateFunction,
    onError: (error) => {
      axios_error_handler(error, t);
    },
    onSuccess: () => {
      toast.success(t("great"), {
        style: { border: "1px solid #10B981", color: "#10B981" },
      });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
  });

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    const formData = new FormData();
    formData.append("avatar", file);
    mutate(formData);
  }, []);


  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label
        htmlFor="profile-pic-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <LazyLoadImage
          // src={profilePic ? `${url}/${profilePic}` : "/anonyme.jpg"}
          src={
            typeof image === "string"
              ? image ? `${url}/${image}` : "/anonyme.jpg"
              : URL.createObjectURL(image)
          }
          effect="blur"
          className="w-[160px] h-[160px] object-cover object-center rounded-50"
          alt="profile picture"
        />
        <p className="text-main font-medium mt-4">
          {t("change_your_profile_picture")}
        </p>
      </label>
      <input
        disabled={isPending}
        id="profile-pic-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfilePic;
