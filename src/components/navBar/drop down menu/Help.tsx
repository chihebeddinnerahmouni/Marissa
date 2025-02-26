import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IoIosHelpCircleOutline } from "react-icons/io";

const Help = ({ close }: { close: any }) => {
  const { t } = useTranslation();

  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      className="user flex items-center gap-2"
      onClick={close}
    >
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
