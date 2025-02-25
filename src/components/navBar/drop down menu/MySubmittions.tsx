import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";


const MySubmittions = () => {

  const { t } = useTranslation();

  return (
    <MenuItem className="user flex items-center gap-2">
      <Link
        to={"/boats-list/my-submissions"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <MdOutlinePlaylistAddCheck className="text-[20px]" />
        <p>{t("my_submitions")}</p>
      </Link>
    </MenuItem>
  );
};

export default MySubmittions;
