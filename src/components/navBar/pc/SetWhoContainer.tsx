// import SetWho from '../SetWho'
// import { useTranslation } from "react-i18next";


// const SetWhoContainer = () => {
//     const { i18n } = useTranslation()
//   return (
//     <div
//       className={`all absolute w-[50%] shadow-hardShadow rounded-20 p-5 bg-white top-[75px] z-20 ${
//         i18n.language === "en" ? "right-0" : "left-0"
//       }`}
//     >
//       <SetWho />
//     </div>
//   );
// }

// export default SetWhoContainer

import { useEffect, useRef, useContext } from "react";
import SetWho from "../SetWho";
import { useTranslation } from "react-i18next";
import { NavBarContext } from "@/components/ui/NavBar";

const SetWhoContainer = () => {
  const { i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { setSelected } = useContext(NavBarContext);

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
      className={`all absolute w-[50%] shadow-hardShadow rounded-20 p-5 bg-white top-[75px] z-20 ${
        i18n.language === "en" ? "right-0" : "left-0"
      }`}
    >
      <SetWho />
    </div>
  );
};

export default SetWhoContainer;
