import logo from "@/assets/files/logo";
import { Link } from "react-router-dom";
import React, { ReactNode } from 'react';


interface AuthLayoutProps {
    children: ReactNode;
}

const ListeBoatLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      className="w-full min-h-screen md:pt-[40px] md:pb-10 flex justify-center items-center px-4 ">
      <Link
        to="/"
        className="absolute top-4 left-4 md:top-7 md:left-7 text-white"
      >
        <img src={logo} className="" alt="logo" />
      </Link>

      {children}
    </div>
  );
};

export default ListeBoatLayout
