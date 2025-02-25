import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TbSailboat } from "react-icons/tb";


const MyBoats = () => {
  const { t } = useTranslation();

  return (
    <MenuItem className="user flex items-center gap-2">
      <Link
        to={"/my-boats"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <TbSailboat className="text-[20px]" />
        <p>{t("my_boats")}</p>
      </Link>
    </MenuItem>
  );
};

export default MyBoats;
