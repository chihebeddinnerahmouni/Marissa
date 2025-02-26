import MobileFullNavBar from "../navBar/Mobile/MobileFullNavBar";
import PcFullNavBar from "../navBar/pc/PcFullNavBar";
import { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import isLoggedIn from "@/lib/isLogedin";
import { useMediaQuery } from "react-responsive";
import {useQuery} from "@tanstack/react-query"
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';


export const NavBarContext = createContext<any>(null);

const NavBar = () => {
  
  const [Where, setWhere] = useState<any>({ id: 0, name: "" }); // the place where the user wants to go
  const [when, setWhen] = useState<string>(""); // the date when the user wants to go
  const [who, setWho] = useState(0); // the number of adults
  const [selected, setSelected] = useState("");
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1045px)" });
  const dispatch = useDispatch();
  
  const fetchUser = useCallback(async () => { 
    const url = import.meta.env.VITE_SERVER_URL_USERS;
    const {data} = await axios.get(`${url}/api/user/auth-user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return data
  }, [])

  const { data, isSuccess } = useQuery({
    queryKey: ["auth-user"],
    queryFn: fetchUser,
    enabled: isLoggedIn(),
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    }
  }, [isSuccess, data]);
  

  return (
    <NavBarContext.Provider
      value={{
        Where,
        setWhere,
        when,
        setWhen,
        who,
        setWho,
        selected,
        setSelected,
      }}
    >
      <div className="w-full h-[74px] flex items-center fixed top-0 z-20 lg:h-[95px]">
        {isLargeScreen ? <PcFullNavBar /> : <MobileFullNavBar />}
      </div>
      <hr className="w-[91%] mx-auto" />
    </NavBarContext.Provider>
  );
};

export default NavBar;


