import { useTranslation } from 'react-i18next';
import SetWhere from '../SetWhere';
import { AppContext } from '../../../App';
import React from "react";

// interface Props {
//   mobSelected: string;
//   setMobSelected: (selected: string) => void;
// }

// const Where: React.FC<Props> = ({ mobSelected, setMobSelected }) => {
const Where = () => {
  const { t } = useTranslation();
  const { where, setWhere, setMobileSelected, mobileSelected } = React.useContext(AppContext);

  return (
    <div
      className={`w-full animate-slideDown mt-5 p-5 bg-white shadow-hardShadow rounded-20`}
      onClick={() => setMobileSelected("where")}
    >
      {mobileSelected === "where" ? (
        <>
          <p className="text-[24px] font-bold text-writingMainDark">
            {t("where")}
          </p>
          <input
            type="text"
            className="h-[54px] w-full rounded-10 mt-5 px-2 text-[18px] font-medium border-[1px] border-darkGrey outline-none focus:border-main focus:bg-emptyInput"
            placeholder={t("where")}
            value={where}
            onChange={(e) => setWhere(e.target.value)}
          />

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
