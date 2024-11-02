import { Link } from 'react-router-dom'
import { BsInbox } from 'react-icons/bs'
import { IoBoatSharp } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import Language from './Mobile/Language'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { CiSettings } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'
import isLoggedIn from '@/lib/isLogedin'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import axios from 'axios'
import { useEffect, useState } from 'react'


const OnlineDropList = ({ setIsMenuOpen }: any) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const [hasSubmissions, setHasSubmissions] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => { 
    axios
      .get(`${url}/api/user/auth-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        setHasSubmissions(res.data.hasSubmissions);
        setFirstName(res.data.name);
        setLastName(res.data.surname);
        setProfilePicture(`${url}/${ res.data.profilePicture }`);
      })
      .catch((err) => {
        console.log(err);
      });  
  }, []);

    return (
      <>
        {/* user */}
        <div className="user flex items-center gap-2">
          <img
            src={profilePicture ? profilePicture : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"}
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
          to={"/inbox"}
          onClick={() => setIsMenuOpen(false)}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <BsInbox className="text-[20px]" />
          <p>{t("inbox")}</p>
        </Link>

        <hr className="my-3" />

        {hasSubmissions &&
          <Link
          to={"/boats-list/my-submissions"}
          onClick={() => setIsMenuOpen(false)}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <MdOutlinePlaylistAddCheck className="text-[20px]" />
          <p>{t("my_submitions")}</p>
        </Link>}
       

        <hr className="my-3" />

        <a
          className="w-full flex items-center gap-2 text-writingMainDark cursor-pointer"
          onClick={() => {
            if (!isLoggedIn()) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to login first",
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
          <IoBoatSharp className="text-[20px]" />
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
