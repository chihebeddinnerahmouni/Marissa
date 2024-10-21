import SetWhen from "../SetWhen";
import {useContext} from "react";
import { useTranslation } from 'react-i18next';
import { AppContext } from "../../../App";

const When = () => {
  const { t } = useTranslation();
  const { mobileSelected, setMobileSelected } = useContext(AppContext);

  return (
    <div
      className={`w-full animate-slideDown mt-5 p-5 bg-white shadow-hardShadow rounded-20`}
      onClick={() => setMobileSelected("when")}
    >
      {mobileSelected === "when" ? (
        <>
          <p className="text-[24px] font-bold mb-5 text-writingMainDark">
            {t("when")}
          </p>
          <SetWhen />
        </>
      ) : (
        <p className="text-[18px] font-bold text-writingGrey">{t("when")}</p>
      )}
    </div>
  );
};

export default When
