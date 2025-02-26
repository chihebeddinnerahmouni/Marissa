import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const Home = ({ close }: { close: any }) => {
  const { t } = useTranslation();

  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      onClick={close}
      className="user flex items-center gap-2"
    >
      <Link
        to={"/?page=1"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <AiOutlineHome className="text-[20px]" />
        <p>{t("home")}</p>
      </Link>
    </MenuItem>
  );
};

export default Home;
