import SetWho from "../SetWho"
import {useContext} from "react";
import { useTranslation } from "react-i18next";
import { NavBarContext } from "@/components/ui/NavBar";

const Who= () => {
  const { t } = useTranslation();
  const {setSelected, selected} = useContext(NavBarContext);
  return (
    <div
      className={`w-full animate-slideDown mt-5 p-5 bg-white shadow-hardShadow rounded-20`}
      onClick={() => setSelected("who")}
    >
      {selected === "who" ? (
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
