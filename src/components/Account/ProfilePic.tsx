import { useTranslation } from "react-i18next"
import React from "react"
import axios from "axios"
import {axios_error_handler} from "../../functions/axios_error_handler"

interface ProfilePicProps {
  profilePic: string,
}

const ProfilePic: React.FC<ProfilePicProps> = ({ profilePic }) => {
  

  const { t } = useTranslation()
  const url = import.meta.env.VITE_SERVER_URL_USERS

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("avatar", file)
    // console.log(formData)
    axios
      .put(`${url}/api/user/upload-avatar`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        axios_error_handler(err, t)
      });
  }


  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label
        htmlFor="profile-pic-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <img
          src={profilePic ? `${url}/${profilePic}` : "/anonyme.jpg"}
          className="w-[160px] h-[160px] object-cover object-center rounded-50"
          alt="profile picture"
        />
        <p className="text-main font-medium mt-4">
          {t("change_your_profile_picture")}
        </p>
      </label>
      <input
        id="profile-pic-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
}

export default ProfilePic
