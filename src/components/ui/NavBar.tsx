import MobileFullNavBar from "../navBar/Mobile/MobileFullNavBar";
import PcFullNavBar from "../navBar/pc/PcFullNavBar";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import isLoggedIn from "@/lib/isLogedin";
import { useContext } from "react";
import { AppContext } from "@/App";



export const NavBarContext = createContext<any>(null);


const NavBar = () => {
  const [Where, setWhere] = useState<any>({ id: 0, name: "" }); // the place where the user wants to go
  const [when, setWhen] = useState<string>(""); // the date when the user wants to go
  const [who, setWho] = useState(0); // the number of adults
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setProfilePic, profilePic } = useContext(AppContext);

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
          // console.log(res);
          setFirstName(res.data.name);
          setLastName(res.data.surname);
          localStorage.setItem("userId", res.data.id);
          localStorage.setItem(
            "userName",
            res.data.name + " " + res.data.surname
          );
          localStorage.setItem("isBoatOwner", res.data.isBoatOwner);
          localStorage.setItem("hasSubmissions", res.data.hasSubmissions);
          setProfilePic(res.data.profilePicture);
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    }
  }, []);

  return (
    <NavBarContext.Provider
      value={{
        Where,
        setWhere,
        when,
        setWhen,
        who,
        setWho,
        firstName,
        lastName,
        profilePic,
        setFirstName,
        setLastName,
        setProfilePic,
      }}
    >
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