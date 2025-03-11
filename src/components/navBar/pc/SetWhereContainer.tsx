import { useEffect, useRef, useContext } from "react";
import SetWhere from "../SetWhere";
import { useTranslation } from "react-i18next";
import {NavBarContext} from "@/components/ui/NavBar";

const SetWhereContainer = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { setSelected }= useContext(NavBarContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelected("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`all absolute w-[50%]  px-5 shadow-hardShadow rounded-20 py-5 bg-white top-[75px] z-20 ${
        i18n.language === "en" ? "left-0" : "right-0"
      }`}
    >
      <p className="text-sm font-medium text-writingGrey mb-2">
        {t("results")}
      </p>
      <SetWhere />
    </div>
  );
};

export default SetWhereContainer;
