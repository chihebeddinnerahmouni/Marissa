import SetWhere from "../SetWhere";
import { useTranslation } from "react-i18next";



const SetWhereContainer = () => {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`all absolute w-[50%] shadow-hardShadow rounded-20 py-5 bg-white top-[75px] z-20 ${
        i18n.language === "en" ? "left-0 pl-5" : "right-0 pr-5"
      }`}
    >
      <p className="text-sm font-medium text-writingGrey mb-2">
        {t("results")}
      </p>
      <SetWhere/>
    </div>
  );
};

export default SetWhereContainer;
