import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const OneBoatComp = ({ item }: any) => {
  const { t } = useTranslation("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/my-boats/${item.id}`);
  };

  const urlListing = import.meta.env.VITE_SERVER_URL_LISTING;


  // console.log(item);

  return (
    <div
      className="w-full cursor-pointer rounded-[5px] overflow-hidden shadow-hardShadow hover:shadow-hoverShadow transition-all duration-100"
      onClick={handleClick}
    >
      <img
        src={`${urlListing}/${item.Images[0].url}`}
        // src="anonyme.jpg"
        className="w-full h-[180px] object-cover object-center"
        alt="boat"
      />
      {/* infos */}
      <div className="relative info flex flex-col py-2 px-2">
        <p className="text-sm font-semibold mx-auto text-writingMainDarkw-[80%] text-center ellipsesCss">
          {item.title}
        </p>
        <p className="inboxdate text-sm mt-3 text-writingMainDark">
          <span>last update</span> :{" "}
          <span>{format(new Date(item.updatedAt), "dd MMM yyyy")}</span>
        </p>
          <p className="text-sm text-writingMainDark mt-1">
            {item.guests} {t("guests")}
        </p>
        {item.Prices.length > 0 && (
          <div className="withCaptain flex w-full justify-between mt-1">
          <p className="text-sm text-writingMainDark">{item.Prices[0].min_price}-{item.Prices[0].min_price} {t("rs")}</p>
          <p className="text-sm text-writingGrey">{item.Region.name}</p>
        </div>
        )}
  
      </div>
    </div>
  );
};

export default OneBoatComp;

//  <div
//           className={`profile absolute top-[-35px] w-[70px] h-[70px] rounded-50 p-0.5 bg-white ${
//             i18n.language === "en" ? "left-[8px]" : "right-[8px]"
//           }`}
//         >
//           <img
//             src={item.ownerPicture}
//             className="w-full h-full object-cover object-center rounded-50"
//             alt=""
//           />
//         </div> 