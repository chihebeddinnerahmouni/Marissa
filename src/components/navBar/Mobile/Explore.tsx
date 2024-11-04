
 import { useTranslation } from 'react-i18next';
// not used


const Explore = () => {
    const { t } = useTranslation();
  return (
    <button className="expolore w-full flex items-center justify-between text-writingMainDark">
      <span>{t("explore")}</span>
      <span>{">"}</span>
    </button>
  );
}

export default Explore
