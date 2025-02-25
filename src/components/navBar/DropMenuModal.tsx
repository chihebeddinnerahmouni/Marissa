// import ReactModal from "react-modal";
// import OnlineDropList from "./OnlineDropList"
// import OffLineDropList from "./OfflineDropList"
// import { useTranslation } from "react-i18next";
// import isLoggedIn from "@/lib/isLogedin";

// ReactModal.setAppElement("#root");

// const OnlineDropMenu = ({ isMenuOpen, setIsMenuOpen }: any) => {
//   const { i18n } = useTranslation();

//   const stop = (event: any) => {
//     event.stopPropagation();
//   }

//     return (
//       <ReactModal
//         isOpen={isMenuOpen}
//         onRequestClose={() => setIsMenuOpen(false)}
//         className={`z-50 outline-none bg-white absolute w-[220px] top-[-4px] py-3 px-4 lg:top-[-5px] lg:w-[280px] rounded-20 shadow-hardShadow ${
//           i18n.language === "en"
//             ? "right-3 md:right-[50px] lg:right-[80px] 2xl:right-[120px]"
//             : "left-3 md:left-[50px] lg:right-[80px] 2xl:right-[120px]"
//         }`}
//         overlayClassName={`fixed inset-0 backdrop-filter backdrop-blur-[7px] mt-[74px] lg:mt-[95px] z-50`}
//       >
//         <div className="div" onClick={stop}>
//           {isLoggedIn() ? (
//             <OnlineDropList setIsMenuOpen={setIsMenuOpen} />
//           ) : (
//             <OffLineDropList setIsMenuOpen={setIsMenuOpen} />
//           )}
//         </div>
//       </ReactModal>
//     );

// };

// export default OnlineDropMenu

// import OnlineDropList from "./OnlineDropList"
// import OffLineDropList from "./OfflineDropList"
// import { useTranslation } from "react-i18next";

import isLoggedIn from "@/lib/isLogedin";
import { Menu } from "@mui/material";
import User from "@/components/navBar/drop down menu/User";
import Language from "@/components/navBar/drop down menu/Language";
import Home from "@/components/navBar/drop down menu/Home";
import Inbox from "@/components/navBar/drop down menu/Inbox";
import Favorite from "@/components/navBar/drop down menu/Favorite";
import Transactions from "@/components/navBar/drop down menu/Transactions";
import MyBoats from "@/components/navBar/drop down menu/MyBoats";
import MySubmittions from "@/components/navBar/drop down menu/MySubmittions";
import ListUrBoat from "@/components/navBar/drop down menu/ListUrBoat";
import Account from "@/components/navBar/drop down menu/Account";
import Help from "@/components/navBar/drop down menu/Help";
import Disconnect from "@/components/navBar/drop down menu/Disconnect";
import Register from "@/components/navBar/drop down menu/Register";
import Login from "@/components/navBar/drop down menu/Login";

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  anchorEl: any;
}

const OnlineDropMenu = ({ isMenuOpen, setIsMenuOpen, anchorEl }: Props) => {
  const isLoggedInvar = isLoggedIn();
  const hasSubmissions = localStorage.getItem("hasSubmissions") === "true";
  const isBoatOwner = localStorage.getItem("isBoatOwner") === "true";
  return (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={setIsMenuOpen}
      PaperProps={{
        style: {
          borderRadius: "10px",
          marginTop: "10px",
        },
      }}
      BackdropProps={{
        style: {
          backdropFilter: "blur(10px)",
          // backgroundColor: "rgba(0, 0, 0, 0.2)",
          // marginTop: "95px",
        },
      }}
    >
      {isLoggedInvar ? (
        <>
          <User />
          <Home />
          <Language />
          <ListUrBoat />
          <Inbox />
          <Favorite />
          <Transactions />
          {hasSubmissions && isBoatOwner && <MyBoats />}
          {hasSubmissions && <MySubmittions />}
          <Help />
          <Account />
          <Disconnect />
        </>
      ) : (
        <>
          <Home />
          <Language />
          <ListUrBoat />
          <Help />
          <Register />
          <Login />
        </>
      )}
    </Menu>
  );
};

export default OnlineDropMenu;




        {/* {isLoggedInvar && <User />}
        <Language />
        <Home />
        {isLoggedInvar && <Inbox />}
        {isLoggedInvar && <Favorite />}
        {isLoggedInvar && <Transactions />}
        {isLoggedInvar && hasSubmissions && isBoatOwner && <MyBoats />}
        {isLoggedInvar && hasSubmissions && <MySubmittions />}
        <ListUrBoat />
        {isLoggedInvar && <Account />}
        <Help />
        {isLoggedInvar && <Disconnect />}
        {!isLoggedInvar && <Login />}
        {!isLoggedInvar && <Register />} */}