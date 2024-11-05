import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import DropMenuModal from '../DropMenuModal';
import { AppContext } from '../../../App';
import { useContext } from 'react';
import { NavBarContext } from '@/components/ui/NavBar';


const UserMenuButton = () => {

  const { isMenuOpen, setIsMenuOpen, profilePic } = useContext(AppContext);
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  // const { profilePicture } = useContext(NavBarContext);


  const changeNavState = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // console.log(profilePic);

  return (
    <div
      className={`w-[75px] h-[37px] border-[1px] border-darkGrey rounded-60 flex justify-between items-center cursor-pointer hover:shadow-hoverShadow pl-3 pr-[2px]`}
      onClick={changeNavState}
    >
      <div className="text-[16px] text-writingMainDark">
        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>

      <img
        src={profilePic ? `${url}/${profilePic}` : "anonyme_two.jpg"}
        alt="profile"
        className={`w-[33px] h-[33px] object-cover object-center rounded-50`}
      />
      
      {isMenuOpen && <DropMenuModal isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}

    </div>
  );
};

export default UserMenuButton
