import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const InboxItem = ({ item }: any) => {


  const { t, i18n } = useTranslation("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/inbox/${item.id}`);
  };


  return (
    <div
      className="w-full cursor-pointer rounded-[5px] overflow-hidden shadow-hardShadow hover:shadow-hoverShadow transition-all duration-100"
      onClick={handleClick}
    >
      <img
        src={item.boatPicture}
        className="w-full h-[180px] object-cover object-center"
        alt="boat"
      />
      {/* infos */}
      <div className="relative info flex flex-col py-2 px-2">
        <p className="text-sm font-semibold mx-auto text-writingMainDark">
          {item.ownerName}
        </p>
        <p className="inboxdate text-sm mt-5 text-writingMainDark">
          <span>{item.date}</span> . <span>{item.duration}</span>
        </p>
        <div className="guestsState flex w-full justify-between mt-1">
          <p className="text-sm text-writingMainDark">
            {item.guests} {t("guests")}
          </p>
          {item.state === "sent" && (
            <p className={`text-sm text-green-400`}>{t("inquiry_sent")}</p>
          )}
          {item.state === "expired" && (
            <p className={`text-sm text-red-400`}>{t("offer_expired")}</p>
          )}
        </div>
        <div className="withCaptain flex w-full justify-between mt-1">
          <p className="text-sm text-writingMainDark">{t("with_captain")}</p>
          <p className="text-sm text-writingGrey">{item.in}</p>
        </div>

        {/* profile pic */}
        <div
          className={`profile absolute top-[-35px] w-[70px] h-[70px] rounded-50 p-0.5 bg-white ${
            i18n.language === "en" ? "left-[8px]" : "right-[8px]"
          }`}
        >
          <img
            src={item.ownerPicture}
            className="w-full h-full object-cover object-center rounded-50"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default InboxItem
