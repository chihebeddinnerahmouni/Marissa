import SetWho from "../SetWho"
import {useContext} from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../App";

// interface Props {
//   mobSelected: string;
//   setMobSelected: (selected: string) => void;
// }

// const Who: React.FC<Props> = ({ mobSelected, setMobSelected }) => {
const Who= () => {
  const { t } = useTranslation();
  const { mobileSelected, setMobileSelected } = useContext(AppContext);

  return (
    <div
      className={`w-full animate-slideDown mt-5 p-5 bg-white shadow-hardShadow rounded-20`}
      onClick={() => setMobileSelected("who")}
    >
      {mobileSelected === "who" ? (
        <>
          <p className="text-[24px] font-bold mb-5 text-writingMainDark">
            {t("add_guests")}
          </p>
          <SetWho />
        </>
      ) : (
        <p className="text-[18px] font-bold text-writingGrey">
          {t("add_guests")}
        </p>
      )}
    </div>
  );
};

export default Who
