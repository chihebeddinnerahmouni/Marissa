import { useTranslation } from "react-i18next"

const CaptainOffer = ({ details }: any) => {
  const { t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const isBoatOwner = localStorage.getItem("isBoatOwner") === "true";

  // console.log(isBoatOwner);

    const image = isBoatOwner
      ? details.clientDetails?.image
        ? `${url}/${details.clientDetails.image}`
        : "/anonyme.jpg"
      : details.boatOwnerDetails?.image
      ? `${url}/${details.boatOwnerDetails.image}`
      : "/anonyme.jpg";
  
  const name = isBoatOwner
    ? details.clientDetails.name + " " + details.clientDetails.surname
    : details.boatOwnerDetails.name + " " + details.boatOwnerDetails.surname;
  
  const text = isBoatOwner ? "interested_in_your_listing" : "will_be_prompted";
  

  return (
    <div className="w-full p-3 bg-white mt-5 rounded-10 shadow-sm flex items-center gap-4">
      <img
        src={image}
        className="min-w-[60px] h-[60px] object-cover object-center rounded-50"
        alt="profile"
      />

      <p className="font-medium lg:text-[18px]">
        <span>{name}</span>{" "} 
         <span className="text-writingGrey">{t(text)}</span>
      </p>
    </div>
  );
};

export default CaptainOffer
