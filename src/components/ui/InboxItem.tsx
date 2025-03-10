import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const InboxItem = ({ item }: any) => {
  const { t, i18n } = useTranslation("");
  const navigate = useNavigate();
  const [depuis, setDepuis] = useState("");
  const [duration, setDuration] = useState("");
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const urlUsers = import.meta.env.VITE_SERVER_URL_USERS;
  const locale = i18n.language === "en" ? enUS : ar;
  const userId = useSelector((state: RootState) => state.user.user.id);



  useEffect(() => {
    const getDepuis = () => {
      const date = new Date(
        item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000
      );
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const diffMinutes = Math.ceil(diff / (1000 * 60));
      const diffHours = Math.ceil(diff / (1000 * 3600));
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      let formattedDifference = "";
  
      if (diff < 1000 * 60 * 60) {
        formattedDifference = `${diffMinutes} ${t("minutes")}`;
      } else if (diff < 1000 * 60 * 60 * 24) {
        formattedDifference = `${diffHours} ${t("hours")}`;
      } else {
        formattedDifference = `${diffDays} ${t("days")}`;
      }
      setDepuis(formattedDifference)
    };
    
    const getDuration = () => {
      const { hours, minutes, nights } = item.booking_info.duration;
      let formattedDuration = "";

      if (hours) {
        formattedDuration += `${hours}${t("h")}`;
      }
      if (minutes) {
        formattedDuration += `${hours ? ":" : ""}${minutes}${t("minimin")}`;
      }
      const finalDuration = nights
        ? `${nights} ${t("nights")}`
        : formattedDuration;

      setDuration(finalDuration);
    };
    
    getDepuis();
    getDuration();
  }, []);



  const handleClick = useCallback(() => {
    navigate(`/inbox/${item.conversationId}`);
  }, [item.conversationId]);

  const getUserName = useCallback(() => { 
    return userId === item.clientDetails.id
    ? item.boatOwnerDetails.name + " " + item.boatOwnerDetails.surname
    : item.clientDetails.name + " " + item.clientDetails.surname
  }, []);

  const getProfilePic = useCallback(() => {
    return userId === item.clientDetails.id
    ? item.boatOwnerDetails.image
      ? `${urlUsers}/${item.boatOwnerDetails.image}`
      : "/anonyme.jpg"
    : item.clientDetails.image
      ? `${urlUsers}/${item.clientDetails.image}`
        : "/anonyme.jpg"
  }, []);

  const getDate = useCallback(() => {
    return format(new Date(item.booking_info.preferredDate), "dd MMM yyyy", {
      locale,
    })
  }, []);

  const getGuests = useCallback(() => {
    return Number(item.booking_info.groupSize.adults) +
    Number(item.booking_info.groupSize.children) +
      Number(item.booking_info.groupSize.infants)
  }, []);


  return (
    <div
      className="w-full cursor-pointer rounded-[5px] overflow-hidden shadow-hardShadow hover:shadow-hoverShadow transition-all duration-100 max-w-[400px]"
      onClick={handleClick}
    >
      <LazyLoadImage
        alt="boat"
        effect="blur"
        src={`${url}/${item.listingDetails.image}`}
        width={"100%"}
        className="h-[180px] object-cover object-center"
        />
      {/* infos */}
      <div className="relative info flex flex-col py-2 px-2">
        <p className="text-sm font-semibold mx-auto text-writingMainDark">
          {getUserName()}
        </p>
        <p className="inboxdate text-sm mt-5 text-writingMainDark">
          <span>{getDate()}</span>, <span>{duration}</span>
        </p>
        <div className="guestsState flex w-full justify-between mt-1">
          <p className="text-sm text-writingMainDark">
            {getGuests()} {t("guests")}
          </p>
          <GetStatusComp status={item.status} />
        </div>
        <div className="withCaptain flex w-full justify-between mt-1">
          <p className="text-sm text-writingMainDark">{t("with_captain")}</p>
          <p className="text-sm text-writingGrey">{depuis}</p>
        </div>

        {/* profile pic */}
        <div
          className={`profile absolute top-[-35px] w-[70px] h-[70px] rounded-50 p-0.5 bg-white ${
            i18n.language === "en" ? "left-[8px]" : "right-[8px]"
          }`}
        >
          <img
            src={getProfilePic()}
            className="w-full h-full object-cover object-center rounded-50"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default InboxItem;

const GetStatusComp = ({ status }: { status: string }) => { 
  const { t } = useTranslation("");
  switch (status) {
    case "pending":
      return <p className={`text-sm text-orange-400`}>{t("pending")}</p>;
    case "expired":
      return <p className={`text-sm text-red-400`}>{t("offer_expired")}</p>;
    case "confirmed":
      return <p className={`text-sm text-green-400`}>{t("offer_confirmed")}</p>;
    case "ongoing":
      return <p className={`text-sm text-blue-400`}>{t("offer_ongoing")}</p>;
    case "cancelled":
      return <p className={`text-sm text-red-400`}>{t("offer_cancelled")}</p>;
    case "finished":
      return <p className={`text-sm text-gray-400`}>{t("offer_finished")}</p>;
    default:
      return null;
    }
  }
  

  // const getDuration = () => {
  //   const allDiration = item.booking_info.duration;
  //   let formattedDuration = "";
  //   if (allDiration?.hours && allDiration?.minutes) {
  //     formattedDuration = `${allDiration.hours}${t("h")}:${allDiration.minutes} ${t("minimin")}`;
  //   } else if (allDiration?.hours) {
  //     formattedDuration = `${allDiration.hours}h`;
  //   } else if (allDiration?.minutes) {
  //     formattedDuration = `${allDiration.minutes}${t("minimin")}`;
  //   }
  //   const final = allDiration?.nights
  //     ? `${allDiration.nights} ${t("nights")}`
  //     : formattedDuration;
  //   setDuration(final)
// };
  
