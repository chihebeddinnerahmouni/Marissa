import { useTranslation } from "react-i18next";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";


const url = import.meta.env.VITE_SERVER_URL_LISTING;


const OptionsButton = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = anchorEl ? FaChevronUp : FaChevronDown;

  return (
    <div
      className={`w-full absolute px-4 h-[60px] bg-creme bottom-[-2px] py-2 flex justify-center items-center lg:w-auto ${
        i18n.language === "ar"
          ? "lg:left-0 lg:right-[350px]"
          : "lg:right-0 lg:left-[350px]"
      }`}
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <button
        className="relative w-full h-full rounded-20 bg-main text-white font-medium md:w-[530px] xl:w-[630px]"
        onClick={handleOpen}
      >
        {t("options")} <Icon className="inline-block ml-2" />
      </button>

      <Options anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
};
export default OptionsButton;

const Options = ({
  anchorEl,
  handleClose,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}) => {
  const { t } = useTranslation();
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const navigate = useNavigate();



  return (
    <Menu
      BackdropProps={{
        sx: {
          backdropFilter: "blur(3px)",
          transition: "backdrop-filter 0.3s ease",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <DeleteButton
        handleClose={handleClose}
        t={t}
        navigate={navigate}
        myBoatId={myBoatId!}
      />
    </Menu>
  );
};




const DeleteButton = ({
  handleClose,
  t,
  navigate,
  myBoatId,
}: {
  handleClose: any;
  t: any;
  navigate: any;
  myBoatId: string;
}) => {
  const deleteBoat = () => {
    handleClose();
    Swal.fire({
      title: t("are_you_sure"),
      text: t("you_want_to_delete_this_boat"),
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: t("yes"),
      cancelButtonText: t("no"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/api/listing/owner/my-listings/delete/${myBoatId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: t("great"),
            });
            navigate("/my-boats");
            window.location.reload();
          });
      }
    });
  };

  return (
    <MenuItem onClick={deleteBoat} sx={{
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.1)',
      }
    }}>
      <MdDeleteSweep className="text-2xl mr-2" />
      {t("delete_boat")}
    </MenuItem>
  );
};
