import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import isLoggedIn from "@/lib/isLogedin";
import Swal from "sweetalert2";
import { IoBoatOutline } from "react-icons/io5";
import {useNavigate } from "react-router-dom";

const ListUrBoat = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

  return (
    <MenuItem className="user flex items-center gap-2">
      <a
        className="w-full flex items-center gap-2 text-writingMainDark cursor-pointer"
        onClick={() => {
          if (!isLoggedIn()) {
            Swal.fire({
              icon: "error",
              title: t("ops"),
              text: t("you_need_to_login_first"),
              timer: 5000,
              timerProgressBar: true,
              showConfirmButton: true,
              confirmButtonText: "Login",
              customClass: {
                confirmButton: "custom-confirm-button",
              },
              preConfirm: () => {
                navigate(`/login`);
              },
            });
            return;
          }
          window.open(`/boats-list/who-are-you`, "_blank");
        }}
      >
        <IoBoatOutline className="text-[20px]" />
        <p>{t("list_your_boats")}</p>
      </a>
    </MenuItem>
  );
};

export default ListUrBoat;
