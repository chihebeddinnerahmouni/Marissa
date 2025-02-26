import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useQueryClient } from "@tanstack/react-query";
import { setUser } from "@/redux/slices/userSlice";
import {IAuthUser} from '@/types/auth-user';


const Disconnect = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      className="user flex items-center gap-2"
    >
      <button
        onClick={() => {
          const user = {} as IAuthUser;
          localStorage.removeItem("jwt");
          queryClient.clear();
          dispatch(setUser(user));
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
