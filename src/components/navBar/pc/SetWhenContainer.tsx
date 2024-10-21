
import SetWhen from "../SetWhen"
import { useTranslation } from "react-i18next"

const SetWhenContainer = () => {
  const { t } = useTranslation();
  return (
    <div className="all absolute w-[50%] shadow-hardShadow rounded-20 p-7 bg-white top-[75px] left-[50%] translate-x-[-50%] z-20">
      <p className="text-sm font-medium text-writingGrey mb-2">
        {t("results")}
      </p>
      <SetWhen/>
    </div>
  );
};

export default SetWhenContainer
