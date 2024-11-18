import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import isLoggedIn from "@/lib/isLogedin"


const ChangePassword = () => {
  
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [currentPassword, setCurrentPassword] = useState("")
  

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/")
    }
  }, [])

  const go = () => {
    const url = import.meta.env.VITE_SERVER_URL_USERS;
    axios.post(
      url + "/api/user/verify-password",
      {
        currentPassword: currentPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => {
        if (res.data.status === true) {
          navigate('/account/change-email/set-password')
        }
      }
    )
      .catch((err) => {
        // console.log(err)
        if (err.response.data.status === false) {
          Swal.fire({
            icon: "error",
            title: t("ops"),
            text: t("invalid_password"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
        }
      })
  }
 
 
  return (
    // <div className="w-full flex justify-center items-center h-screen mt-[100px] md:mt-[120px] lg:mt-[160px]">
    <div className="w-full flex justify-center items-center h-screen py-0 px-4 md">
      <div className="content w-full md:w-[500px] flex flex-col items-center gap-3 lg:gap-5">
        <p className="text-[26px] font-semibold text-writingMainDark lg:text-[26px]">
          {t("please_enter_your_password")}
        </p>
        <p className="text-base font-medium text-writingGrey text-center lg:text-[20px]">
          {t("we_require_your_password")}
        </p>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder={t("password")}
          className="w-full h-[40px] bg-emptyInput border border-darkGrey rounded-[5px] px-2 outline-main"
        />
        <button className="w-full h-[40px] bg-main rounded-[5px] text-white hover:bg-mainHover" onClick={go}>
          {t("send")}
        </button>
      </div>
    </div>
  );
}

export default ChangePassword
