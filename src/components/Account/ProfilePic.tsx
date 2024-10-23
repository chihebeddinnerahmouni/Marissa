import { useTranslation } from "react-i18next"

const ProfilePic = () => {
    const { t } = useTranslation()
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label
        htmlFor="profile-pic-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <img
          src="/anonyme.jpg"
          className="w-[160px] h-[160px] object-cover object-center rounded-50"
          alt="profile picture"
        />
        <p className="text-main font-medium">
          {t("change_your_profile_picture")}
        </p>
      </label>
      <input
        id="profile-pic-upload"
        type="file"
        className="hidden"
        accept="image/*"
      />
    </div>
  );
}

export default ProfilePic
