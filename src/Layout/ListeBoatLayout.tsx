import logo from "@/assets/files/logo";
import { Link } from "react-router-dom";
import React, { ReactNode } from 'react';
import { createContext, useState } from "react";


interface AuthLayoutProps {
    children: ReactNode;
}


export const ListingContext = createContext<any>({});

const ListeBoatLayout: React.FC<AuthLayoutProps> = ({ children }) => {

  const [progress, setProgress] = useState(0);

  return (
    <div className="relative w-full min-h-screen md:pt-[40px] md:pb-10 flex justify-center items-center px-4 ">
      <Link
        to="/"
        className="absolute top-4 left-4 md:top-7 md:left-7 text-white"
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
        {children}
      </ListingContext.Provider>
    </div>
  );
};

export default ListeBoatLayout
