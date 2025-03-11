// import logo from '@/assets/files/logo';
// import { Link, Outlet } from 'react-router-dom';

// const AuthLayout = () => {
//     return (
//       <div
//         className="w-full min-h-screen md:pt-[40px] md:pb-10 flex justify-center items-center"
//         style={{
//           background: "linear-gradient(to bottom, #FF7F89, #FFA6B0)",
//         }}
//       >
//         <Link
//           to="/"
//           className="absolute top-4 leftt-4 md:top-7 md:left-7 text-white"
//         >
//           <img src={logo} className="w-[70px]" alt="logo" />
//         </Link>

//         <Outlet />
//       </div>
//     );
// };

// export default AuthLayout;

import logo from "@/assets/files/logo";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, children, subTitle }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen px-4 md:py-[40px] flex justify-center items-center"
      style={{
        background: "linear-gradient(to bottom, #FF7F89, #FFA6B0)",
      }}
    >
      <div className="w-full p-4 bg-white shadow-hardShadow flex flex-col items-center justify-center rounded-10 md:w-[400px]">
        <img
          src={logo}
          alt="logo"
          className="w-[70px] mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <p className="text-lg font-semibold text-writingMainDark">
          {title}
        </p>

        {subTitle && (
          <p className="text-sm text-writingGrey font-medium mt-2">
            {subTitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
