import React, { ReactNode } from "react";
import logo from "@/assets/files/logo";
import { Link } from "react-router-dom";


interface AuthLayoutProps {
  children: ReactNode;
}

const HelpLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
      <div
        className="w-full min-h-screen pt-[100px] pb-5">
        <Link
          to="/"
          className="absolute top-4 leftt-4 md:top-3 md:left-3 text-white"
        >
          <img src={logo} className="h-[80px] object-cover object-center" alt="logo" />
        </Link> 
        {children}
      </div>
    );
};

export default HelpLayout;
