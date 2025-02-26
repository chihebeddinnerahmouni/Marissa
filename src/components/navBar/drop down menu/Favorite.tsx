import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MdFavoriteBorder } from "react-icons/md";


const Favorite = ({ close }: { close: any }) => {
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
      <Link
        to={"/favorite"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <MdFavoriteBorder className="text-[20px]" />
        <p>{t("favorite")}</p>
      </Link>
    </MenuItem>
  );
};

export default Favorite;
