import { Link } from "react-router-dom";
import MdBar from "./MdBar";
import Right from "./Right";
import logo from "../../../assets/files/logo";
import { useState, useEffect } from "react";


const PcFullNavBar = () => {

 const [isScrolled, setIsScrolled] = useState(false);

 useEffect(() => {
   const handleScroll = () => {
     const isScrolled = window.scrollY > 20;
     setIsScrolled(isScrolled);
   };

   document.addEventListener("scroll", handleScroll);
   return () => {
     document.removeEventListener("scroll", handleScroll);
   };
 }, []);

  return (
    <>
      <div
        className={`pcBar hidden w-full h-full justify-between items-center gap-4 bg-white px-[60px] lg:flex 2xl:px-[120px] bottomShadowTransition ${
          isScrolled ? "shadow-bottomShadow" : ""
        }`}
        style={{ direction: "ltr" }}
      >
        <Link to={"/"} className="logo h-[74px] w-[74px] flex items-center">
          <img
            src={logo}
            alt="logo"
            className="object-cover object-center"
          />
        </Link>
        <MdBar />
        <Right />
      </div>
    </>
  );
};

export default PcFullNavBar;

// I'm the pc navbar. i wrap the pc navbar in another container, I have a logo, a MdBar and a Right component.
// I'm used in the NavBar component.
