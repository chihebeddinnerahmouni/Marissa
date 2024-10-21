import MobileFullNavBar from "../navBar/Mobile/MobileFullNavBar";
import PcFullNavBar from "../navBar/pc/PcFullNavBar";


const NavBar = () => {

  return (
    <>
        <div className="w-full h-[74px] flex items-center fixed top-0 z-20 lg:h-[95px]">
          <MobileFullNavBar />
          <PcFullNavBar />
        </div>
        <hr className="w-[91%] mx-auto" />
    </>
  );
};

export default NavBar;


// Hi, I'm the navbar. I have two components, one for mobile and one for pc. 
// I use a common context to share the state of the informations (when where and who) between the two components.