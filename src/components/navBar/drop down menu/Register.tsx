import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaRegUserCircle } from "react-icons/fa";


const Register = () => {
  const { t } = useTranslation();

  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      className="user flex items-center gap-2"
    >
      <Link
        to={"/register"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <FaRegUserCircle className="text-[20px]" />
        <p>{t("register")}</p>
      </Link>
    </MenuItem>
  );
};

export default Register;
