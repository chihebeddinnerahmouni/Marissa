import { createContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar.tsx";
import { useState } from "react";


export const AppContext = createContext<any>({});

function App() {


  // note: this context is global and can be used in any component, it can be 
  // refactor to be more organized according to the project needs, thank you :)

  const [where, setWhere] = useState(""); // the place where the user wants to go
  const [when, setWhen] = useState<string>(); // the date when the user wants to go
  const [who, setWho] = useState(0); // the number of adults
  const [Pcselected, setPcSelected] = useState(""); // the selected field on the pc navbar
  const [mobileSelected, setMobileSelected] = useState("where"); // the selected field on the mobile navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false); // for the dropdown menu
  const [isUserOnline, setIsUserOnline] = useState(true); // to know if the user is online or not, this is only for testing
  const [isFormOpen, setIsFormOpen] = useState(false); // to know if the form is open or not


  //  console.log("where", where);
  // console.log("when", when);

  return (
    <>
      <AppContext.Provider value={{
        where,
        setWhere,
        when,
        setWhen,
        who,
        setWho,
        Pcselected,
        setPcSelected,
        mobileSelected,
        setMobileSelected,
        isMenuOpen,
        setIsMenuOpen,
        isUserOnline,
        setIsUserOnline,
        isFormOpen,
        setIsFormOpen,
      }}>
        <NavBar />
        <Outlet />
      </AppContext.Provider>
    </>
  );
}

export default App;
