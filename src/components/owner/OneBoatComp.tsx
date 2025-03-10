import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { enGB, arSA } from "date-fns/locale";




const OneBoatComp = ({ item }: any) => {
  const { t, i18n } = useTranslation("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/my-boats/${item.id}`);
  };

  const urlListing = import.meta.env.VITE_SERVER_URL_LISTING;
  const locale = i18n.language === "en" ? enGB : arSA;
  const lastUpdate = format(new Date(item.updatedAt), "dd MMM yyyy", { locale });
  const regionName = i18n.language === "ar" ? item.Region.arabic_name : item.Region.name;

  return (
    <div
      className="w-full cursor-pointer rounded-[5px] overflow-hidden shadow-hardShadow hover:shadow-hoverShadow transition-all duration-100 max-w-[400px]"
      onClick={handleClick}
    >
      <LazyLoadImage
        src={`${urlListing}/${item.Images[0].url}`}
        effect="blur"
        width={"100%"}
        className=" h-[180px] object-cover object-center"
        alt="boat"
      />
      {/* infos */}
      <div className="relative info flex flex-col py-2 px-2">
        <p className="text-sm font-semibold mx-auto text-writingMainDarkw-[80%] text-center ellipsesCss">
          {item.title}
        </p>
        <p className="inboxdate text-sm mt-3 text-writingMainDark">
          <span>{t("last_update")}</span> : <span>{lastUpdate}</span>
        </p>
        <p className="text-sm text-writingMainDark mt-1">
          {item.guests} {t("guests")}
        </p>
        {item.Prices.length > 0 && (
          <div className="withCaptain flex w-full justify-between mt-1">
            <p className="text-sm text-writingMainDark">
              {item.Prices[0].min_price}-{item.Prices[0].min_price} {t("rs")}
            </p>
            <p className="text-sm text-writingGrey">{regionName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneBoatComp;
