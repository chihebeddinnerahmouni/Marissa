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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {useMediaQuery} from "@mui/material";

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  anchorEl: any;
}

const OnlineDropMenu = ({ isMenuOpen, setIsMenuOpen, anchorEl }: Props) => {
  const isLoggedInvar = isLoggedIn();
  const user = useSelector((state: RootState) => state.user.user);
  const hasSubmissions = user.hasSubmissions;
  const isBoatOwner = user.isBoatOwner;
  const isMobile = useMediaQuery("(max-width: 1045px)");
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
          <Home close={setIsMenuOpen} />
          {isMobile && <Language />}
          <ListUrBoat close={setIsMenuOpen} />
          <Inbox close={setIsMenuOpen} />
          <Favorite close={setIsMenuOpen} />
          {isBoatOwner && <Transactions close={setIsMenuOpen} />} 
          {hasSubmissions && isBoatOwner && <MyBoats close={setIsMenuOpen} />}
          {hasSubmissions && <MySubmittions close={setIsMenuOpen} />}
          <Help close={setIsMenuOpen} />
          <Account close={setIsMenuOpen} />
          <Disconnect />
        </>
      ) : (
        <>
          <Home close={setIsMenuOpen} />
          {isMobile && <Language />}
          <ListUrBoat close={setIsMenuOpen} />
          <Help close={setIsMenuOpen} />
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