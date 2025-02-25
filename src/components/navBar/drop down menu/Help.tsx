import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IoIosHelpCircleOutline } from "react-icons/io";

const Help = () => {
  const { t } = useTranslation();

  return (
    <MenuItem className="user flex items-center gap-2">
      <a
        href={"/help"}
        target="_blank"
        className="w-full flex items-center gap-2 text-writingMainDark cursor-pointer"
      >
        <IoIosHelpCircleOutline className="text-[20px]" />
        <span>{t("help")}</span>
      </a>
    </MenuItem>
  );
};

export default Help;
