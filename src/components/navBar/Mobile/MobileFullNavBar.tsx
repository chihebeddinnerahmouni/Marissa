import MobileBar from './MobileBar'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useContext } from 'react'
import { AppContext } from '../../../App';

const MobileFullNavBar = () => {

  const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);

  const changeNavState = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="mobile w-full shadow-bottomShadow flex px-4 items-center gap-4 bg-white h-[74px] md:px-10 lg:hidden">
      <MobileBar />
      <button
        onClick={changeNavState}
        className="text-[20px] md:text-[30px] text-writingMainDark"
      >
        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
    </div>
  );
}

export default MobileFullNavBar

// I'm the mobile navbar component. i wrap the mobile navbar in another container.
//  I'm the mobile navbar, I have a MobileBar component and a MobileLinks component.
