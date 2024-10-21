import SetWho from '../SetWho'
import { useTranslation } from "react-i18next";


const SetWhoContainer = () => {
    const { i18n } = useTranslation()
  return (
    <div
      className={`all absolute w-[50%] shadow-hardShadow rounded-20 p-5 bg-white top-[75px] z-20 ${
        i18n.language === "en" ? "right-0" : "left-0"
      }`}
    >
      <SetWho />
    </div>
  );
}

export default SetWhoContainer
