import { useTranslation } from 'react-i18next';
import SetWhere from '../SetWhere';
import React from "react";
import { NavBarContext } from '@/components/ui/NavBar';

const Where = () => {
  const { t } = useTranslation();
  const { selected, setSelected } = React.useContext(NavBarContext);


  return (
    <div
      className={`w-full cursor-pointer animate-slideDown mt-5 p-5 bg-white shadow-hardShadow rounded-20`}
      onClick={() => setSelected("where")}
    >
      {selected === "where" ? (
        <>
          <p className="text-[24px] font-bold text-writingMainDark">
            {t("where")}
          </p>
          <div className="places w-full mt-5">
            <SetWhere />
          </div>
        </>
      ) : (
        <p className="text-[18px] font-bold text-writingGrey">{t("where")}</p>
      )}
    </div>
  );
};

export default Where
