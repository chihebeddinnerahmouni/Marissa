import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AppContext } from "@/App";
import { NavBarContext } from "@/components/ui/NavBar";
import { useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";

const Disconnect = () => {
    const { t } = useTranslation();
    
      const { setFirstName, setLastName } =
        useContext(NavBarContext);
    const {  setProfilePic } = useContext(AppContext);
    const navigate = useNavigate();

  return (
    <MenuItem className="user flex items-center gap-2">
      <button
        onClick={() => {
          localStorage.removeItem("jwt");
          setFirstName("");
          setLastName("");
          setProfilePic("");
          localStorage.removeItem("userId");
          localStorage.removeItem("isBoatOwner");
          localStorage.removeItem("userName");
          localStorage.removeItem("hasSubmissions");
          localStorage.removeItem("isBlocked");
          navigate("/login");
        }}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <IoIosLogOut className="text-[20px]" />
        <span>{t("logout")}</span>
      </button>
    </MenuItem>
  );
};

export default Disconnect;
