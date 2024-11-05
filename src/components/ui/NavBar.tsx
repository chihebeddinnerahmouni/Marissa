import MobileFullNavBar from "../navBar/Mobile/MobileFullNavBar";
import PcFullNavBar from "../navBar/pc/PcFullNavBar";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import isLoggedIn from "@/lib/isLogedin";



export const NavBarContext = createContext<any>(null);


const NavBar = () => {

  const [hasSubmissions, setHasSubmissions] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  

  useEffect(() => {
    const isLoggedInvar = isLoggedIn();
    if (isLoggedInvar) {
      const url = import.meta.env.VITE_SERVER_URL_USERS;
      axios
        .get(`${url}/api/user/auth-user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setHasSubmissions(res.data.hasSubmissions);
          setFirstName(res.data.name);
          setLastName(res.data.surname);
          setProfilePicture(res.data.profilePicture);
        })
        .catch((err) => {
          console.log(err);
        });
    }
   }, []);

  return (
    <NavBarContext.Provider value={{ hasSubmissions, firstName, lastName, profilePicture, setFirstName, setLastName, setProfilePicture }}>
      
        <div className="w-full h-[74px] flex items-center fixed top-0 z-20 lg:h-[95px]">
          <MobileFullNavBar />
          <PcFullNavBar />
        </div>
        <hr className="w-[91%] mx-auto" />
    </NavBarContext.Provider>
  );
};

export default NavBar;


// Hi, I'm the navbar. I have two components, one for mobile and one for pc. 
// I use a common context to share the state of the informations (when where and who) between the two components.