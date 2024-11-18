import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const NewPassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
    const [isConfirmedPasswordMissing, setIsConfirmedPasswordMissing] = useState(false);
   const [isCurrentPasswordMissing, setIsCurrentPasswordMissing] = useState(false);
  const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
  const navigate = useNavigate();
    
    const send = () => {
        let isMissing = false;
        if (password === "") {
            setIsPasswordMissing(true);
            isMissing = true;
        }
        if (confirmedPassword === "") {
            setIsConfirmedPasswordMissing(true);
            isMissing = true;
        }
        if (isMissing) return;

        if (password !== confirmedPassword) {
            setIsPasswordNotMatch(true);
            return;
      }
      
      const url = import.meta.env.VITE_SERVER_URL_USERS;
      axios
        .post(url + "/api/user/change-password", {
          currentPassword,
          newPassword: password,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          }
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: t("success"),
            text: t("password_changed"),
          });
          navigate("/account");
        })
        .catch((err) => {
          // console.log(err);
          if (
            err.response.data.message ===
            "New password cannot be the same as the current password"
          ) {
            Swal.fire({
              icon: "error",
              title: t("ops"),
              text: t("cant_be_same_password"),
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            });
          }
          if (err.response.data.message === "Current password is incorrect") {
            Swal.fire({
              icon: "error",
              title: t("ops"),
              text: t("invalid_password"),
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            });
          }
        });
    };

  return (
    <div className="w-full flex justify-center items-center h-screen py-0 px-4 md">
      <div className="content w-full md:w-[500px] flex flex-col items-center gap-3 lg:gap-5">
        <p className="text-[26px] font-semibold text-writingMainDark lg:text-[26px]">
          {t("change_password")}
        </p>

        <div className="newpassword w-full flex flex-col gap-1">
          <p className="text-base font-medium text-writingGrey text-center self-start lg:text-[20px]">
            {t("password")}
          </p>
          <input
            type="password"
            placeholder={t("password")}
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
                setIsCurrentPasswordMissing(false);
                // setIsPasswordNotMatch(false);
            }}
            className="w-full h-[40px] bg-emptyInput border border-darkGrey rounded-[5px] px-2 outline-main"
          />
          {isCurrentPasswordMissing && (
            <p className="text-red-500 text-xs">{t("enter_password")}</p>
          )}
        </div>

        {/* new password */}
        <div className="newpassword w-full flex flex-col gap-1">
          <p className="text-base font-medium text-writingGrey text-center self-start lg:text-[20px]">
            {t("new_password")}
          </p>
          <input
            type="password"
            placeholder={t("new_password")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
                setIsPasswordMissing(false);
                setIsPasswordNotMatch(false);
            }}
            className="w-full h-[40px] bg-emptyInput border border-darkGrey rounded-[5px] px-2 outline-main"
          />
          {isPasswordMissing && (
            <p className="text-red-500 text-xs">{t("enter_password")}</p>
          )}
        </div>
        {/* confirme */}
        <div className="confirm w-full flex flex-col gap-1">
          <p className="text-base font-medium text-writingGrey text-center self-start lg:text-[20px]">
            {t("confirm_password")}
          </p>
          <input
            type="password"
            placeholder={t("confirm_password")}
            value={confirmedPassword}
            onChange={(e) => {
              setConfirmedPassword(e.target.value);
                setIsConfirmedPasswordMissing(false);
                setIsPasswordNotMatch(false);
            }}
            className="w-full h-[40px] bg-emptyInput border border-darkGrey rounded-[5px] px-2 outline-main"
          />
          {isConfirmedPasswordMissing && (
            <p className="text-red-500 text-xs">
              {t("enter_confirm_password")}
            </p>
          )}
        </div>

        <button
          className="w-full h-[40px] bg-main rounded-[5px] text-white hover:bg-mainHover"
          onClick={send}
        >
          {t("send")}
        </button>

        {isPasswordNotMatch && (
          <p className="text-red-500 text-xs">{t("didnt_match")}</p>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
