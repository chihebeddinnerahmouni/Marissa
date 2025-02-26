import logo from "@/assets/files/logo";
import { Link, Outlet } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import isLoggedIn from "@/lib/isLogedin";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";



export const ListingContext = createContext<any>({});

const ListeBoatLayout = () => {

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (!isLoggedIn()) return navigate("/?page=1");
    if (Object.keys(user).length !== 0) {
      if (user.block) {
        Swal.fire({
          icon: "error",
          title: t("ops"),
          text: t("you_cant_send_inquiry_as_blocked_user"),
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: true,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        }).then(() => {
          navigate(`/?page=1`);
        });
      }
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <div className="w-full h-screen bg-white"></div>;
  }


  return (
    <div className="relative w-full min-h-screen flex justify-center items-center px-4 md:px-[80px] lg:px-[120px]  md:pt-[150px] md:pb-10">
      <Link
        to="/"
        className="absolute top-0 left-0 md:top-7 md:left-7 text-white"
      >
        <img src={logo} className="" alt="logo" />
      </Link>

      <div className="progress absolute top-0 w-full h-1">
        <div
          className={`progres-bar h-1 bg-main transition-all duration-500 ease-in-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <ListingContext.Provider value={{ setProgress }}>
        <Outlet />
      </ListingContext.Provider>
    </div>
  );
};

export default ListeBoatLayout
