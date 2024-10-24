import logo from "@/assets/files/logo";
import { Link, Outlet } from "react-router-dom";




const HelpLayout= () => {
    return (
      <div
        className="w-full min-h-screen pt-[100px] pb-5">
        <Link
          to="/"
          className="absolute top-4 leftt-4 md:top-3 md:left-3 text-white"
        >
          <img src={logo} className="h-[80px] object-cover object-center" alt="logo" />
        </Link> 
       <Outlet />
      </div>
    );
};

export default HelpLayout;
