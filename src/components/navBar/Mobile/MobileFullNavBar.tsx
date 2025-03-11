import MobileBar from "./MobileBar";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import DropMenuModal from "../DropMenuModal";

const MobileFullNavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <div className="mobile w-full shadow-bottomShadow flex px-4 items-center gap-4 bg-white h-[74px] md:px-10 lg:hidden">
      <MobileBar />
      <div className="">
        <button
          onClick={handleMenuOpen}
          className="text-[20px] md:text-[30px] text-writingMainDark"
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>
      {isMenuOpen && (
        <DropMenuModal
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={handleMenuClose}
          anchorEl={anchorEl}
        />
      )}
    </div>
  );
};

export default MobileFullNavBar;
