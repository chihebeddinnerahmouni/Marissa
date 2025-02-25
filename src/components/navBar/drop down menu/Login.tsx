import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PiSignIn } from "react-icons/pi";


const Login = () => {
  const { t } = useTranslation();

  return (
    <MenuItem className="user flex items-center gap-2">
      <Link
        to={"/login"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <PiSignIn className="text-[20px]" />
        <p>{t("login")}</p>
      </Link>
    </MenuItem>
  );
};

export default Login;
