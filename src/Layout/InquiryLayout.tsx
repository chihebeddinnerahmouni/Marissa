import React, { ReactNode } from 'react';
import logo from '@/assets/files/logo';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';


interface AuthLayoutProps {
    children: ReactNode;
}

export const InquiryContext = createContext<any>({});


const InquiryLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number>(0);



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

      <div
        className={`relative w-full h-[100vh] p-6 bg-white shadow-hardShadow flex flex-col items-center justify-center md:rounded-10 md:w-[400px] md:h-auto`}
      >
        <div className="top w-full flex items-center justify-between gap-6 mb-10">
          <button onClick={() => navigate(-1)}>
            <FaArrowLeftLong className="text-gray-400 text-[25px]" />
          </button>
          <div className="progress bg-lightGrey flex-grow h-1.5 rounded-40 relative">
            <div
              className={`progress-bar bg-primary h-full bg-main rounded-40 transition-all duration-500 ease-in-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <button>
            <MdOutlineCancel className="text-gray-400 text-[25px]" />
          </button>
        </div>

        <InquiryContext.Provider value={{ setProgress }}>
          {children}
        </InquiryContext.Provider>
      </div>
    </div>
  );
};



export default InquiryLayout;