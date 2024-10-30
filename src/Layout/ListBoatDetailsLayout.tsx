import logo from "@/assets/files/logo";
import { Link, Outlet } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import isLoggedIn from "@/lib/isLogedin";
import { useNavigate } from "react-router-dom";

export const ListingDetailsContext = createContext<any>({});

const ListeBoatDetailsLayout = () => {
  const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const steps = 11;
  const navigate = useNavigate();

  useEffect(() => {
    const isUserIn = isLoggedIn();
    if (!isUserIn) {
      return navigate("/");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="w-full h-screen bg-white"></div>;
  }

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center px-4 md:px-[80px] lg:px-[120px]  md:pt-[40px] md:pb-10">
      <Link
        to="/"
        className="absolute top-0 left-0 md:top-4 md:left-4 text-white"
      >
        <img src={logo} className="" alt="logo" />
      </Link>

      <div className="progress absolute top-0 w-full h-1">
        <div
          className={`progres-bar h-1 bg-main transition-all duration-500 ease-in-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <ListingDetailsContext.Provider value={{ setProgress, steps }}>
        <Outlet />
      </ListingDetailsContext.Provider>
    </div>
  );
};

export default ListeBoatDetailsLayout;
