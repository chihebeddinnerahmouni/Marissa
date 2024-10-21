import { useTranslation } from "react-i18next"

const CaptainOffer = ({ details }: any) => {
  const { t } = useTranslation()
  return (
    <div className="w-full p-3 bg-white mt-5 rounded-10 shadow-hoverShadow flex items-center gap-4">
      <img
        src={details.profilePic}
        className="w-[60px] h-[60px] object-cover object-center rounded-50"
        alt="profile"
      />

      <p className="font-medium">
        {details.captainName} {t("will_be_prompted")}
      </p>
    </div>
  );
}

export default CaptainOffer
