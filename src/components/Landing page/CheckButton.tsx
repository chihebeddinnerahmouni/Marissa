import { FaCheckDouble } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CheckButton = () => {
    const { t } = useTranslation("");
    return (
      <button className="w-full h-[60px] mt-5 rounded-10 border-[1px] border-darkGrey flex items-center justify-center gap-2 lg:h-[70px] lg:mt-7">
        <FaCheckDouble className="text-[20px] text-writingMainDark" />
        <span className="text-writingMainDark font-medium">
          {t("click_to_check_the_availability")}
        </span>
      </button>
    );
};

export default CheckButton;
