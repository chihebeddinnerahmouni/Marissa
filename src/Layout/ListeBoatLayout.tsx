import logo from "@/assets/files/logo";
import { Link, Outlet } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import isLoggedIn from "@/lib/isLogedin";
import { useNavigate } from "react-router-dom";



export const ListingContext = createContext<any>({});

const ListeBoatLayout = () => {

  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) return navigate("/");
  }, []);



  return (
    <div className="relative w-full min-h-screen flex justify-center items-center px-4 md:px-[80px] lg:px-[120px]  md:pt-[150px] md:pb-10">
      <Link
        to="/"
        className="absolute top-0 left-0 md:top-7 md:left-7 text-white"
      >
        <img src={logo} className="w-[70px]" alt="logo" />
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
