import { useTranslation } from "react-i18next";
const Location = () => {
    const { t } = useTranslation();
  return (
    <div>
      <p className="font-semibold text-writingMainDark text-[18px] lg:text-[20px]">
        {t("approximate_location")}
      </p>

      <div className="map mt-3 lg:mt-5">
        <img
          src="/map.png"
          className="w-auto h-auto rounded-10 shadow-hoverShadow"
          alt=""
        />
      </div>
    </div>
  );
}

export default Location
