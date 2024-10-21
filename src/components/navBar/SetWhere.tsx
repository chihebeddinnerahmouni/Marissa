import { useTranslation } from "react-i18next";
import PlacesButtons from "./PlacesComp";
import placesArray from "../../assets/files/Places_array";

const SetWhere = () => {
  const { i18n } = useTranslation();
  return (
    <div
      className={`max-h-[420px] w-full flex flex-col gap-1 overflow-auto bg-white lg:max-h-[420px] ${
        i18n.language === "en" ? "lg:mr-auto" : "lg:ml-auto"
      }`}
    >
      {placesArray.map((place, index) => (
        <PlacesButtons key={index} place={place} />
      ))}
    </div>
  );
};

export default SetWhere;
