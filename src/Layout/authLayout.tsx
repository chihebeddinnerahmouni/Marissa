import React, { ReactNode } from 'react';
import logo from '@/assets/files/logo';
import { Link } from 'react-router-dom';


interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
      <div
        className="w-full min-h-screen md:pt-[40px] md:pb-10 flex justify-center items-center"
        style={{
          background: "linear-gradient(to bottom, #FF7F89, #FFA6B0)",
        }}
      >
        <Link
          to="/"
          className="absolute top-4 leftt-4 md:top-7 md:left-7 text-white"
        >
          <img src={logo} className="" alt="logo" />
        </Link>

        {children}
      </div>
    ); 
};

export default AuthLayout;