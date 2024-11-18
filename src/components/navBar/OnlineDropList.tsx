import { Link } from 'react-router-dom'
import { BsInbox } from 'react-icons/bs'
// import { IoBoatSharp } from 'react-icons/io5'
import { IoBoatOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next'
import Language from './Mobile/Language'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { CiSettings } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'
import isLoggedIn from '@/lib/isLogedin'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
// import { FaHome } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { useContext } from 'react'
import { NavBarContext } from '../ui/NavBar'
import { AppContext } from '@/App'
import { TbSailboat } from "react-icons/tb";
import { LuBanknote } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";


const OnlineDropList = ({ setIsMenuOpen }: any) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const hasSubmissions = localStorage.getItem("hasSubmissions") === "true";
  const isBoatOwner = localStorage.getItem("isBoatOwner") === "true";
  const {
    firstName,
    lastName,
    setFirstName,
    setLastName,
  } = useContext(NavBarContext);
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const { profilePic, setProfilePic } = useContext(AppContext);

  

    return (
      <>
        {/* user */}
        <div className="user flex items-center gap-2">
          <img
            src={profilePic ? `${url}/${profilePic}` : "/anonyme.jpg"}
            alt="profile, picture"
            className="w-[35px] h-[35px] object-cover object-center rounded-50"
          />
          <p className="text-sm text-writingMainDark font-medium">
            {firstName} {lastName}
          </p>
        </div>

        <hr className="my-3" />

        <Language />

        <hr className="my-3 lg:hidden" />

        <Link
          to={"/?page=1"}
          onClick={() => setIsMenuOpen(false)}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <AiOutlineHome className="text-[20px]" />
          <p>{t("home")}</p>
        </Link>

        <hr className="my-3" />

        <Link
          to={"/inbox"}
          onClick={() => setIsMenuOpen(false)}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <BsInbox className="text-[20px]" />
          <p>{t("inbox")}</p>
        </Link>

        <hr className="my-3" />

        <Link
          to={"/favorite"}
          onClick={() => setIsMenuOpen(false)}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <MdFavoriteBorder className="text-[20px]" />
          <p>{t("favorite")}</p>
        </Link>

        <hr className="my-3" />

        <Link
          to={"/my-transactions"}
          onClick={() => setIsMenuOpen(false)}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <LuBanknote className="text-[20px]" />
          <p>{t("my_transactions")}</p>
        </Link>

        <hr className="my-3" />

        {isBoatOwner && (
          <>
            <Link
              to={"/my-boats"}
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center gap-2 text-writingMainDark"
            >
              <TbSailboat className="text-[20px]" />
              <p>{t("my_boats")}</p>
            </Link>

            <hr className="my-3" />
          </>
        )}

        {hasSubmissions && (
          <>
            <Link
              to={"/boats-list/my-submissions"}
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center gap-2 text-writingMainDark"
            >
              <MdOutlinePlaylistAddCheck className="text-[20px]" />
              <p>{t("my_submitions")}</p>
            </Link>

            <hr className="my-3" />
          </>
        )}

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
              setIsMenuOpen(false);
              return;
            }
            window.open(`/boats-list/who-are-you`, "_blank");
            setIsMenuOpen(false);
          }}
        >
          <IoBoatOutline className="text-[20px]" />
          <p>{t("list_your_boats")}</p>
        </a>

        <hr className="my-3" />

        <Link
          to={"/account"}
          onClick={() => setIsMenuOpen(false)}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <CiSettings className="text-[20px]" />
          <p>{t("account")}</p>
        </Link>

        <hr className="my-3" />

        <a
          href={"/help"}
          target="_blank"
          onClick={() => setIsMenuOpen(false)}
          className="w-full flex items-center gap-2 text-writingMainDark cursor-pointer"
        >
          <IoIosHelpCircleOutline className="text-[20px]" />
          <span>{t("help")}</span>
        </a>

        <hr className="my-3" />

        <button
          onClick={() => {
            localStorage.removeItem("jwt");
            setIsMenuOpen(false);
            setFirstName("");
            setLastName("");
            setProfilePic("");
            localStorage.removeItem("userId");
            localStorage.removeItem("isBoatOwner");
            localStorage.removeItem("userName");
            localStorage.removeItem("hasSubmissions");
            navigate("/");
          }}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <IoIosLogOut className="text-[20px]" />
          <span>{t("logout")}</span>
        </button>
      </>
    );
}

export default OnlineDropList
