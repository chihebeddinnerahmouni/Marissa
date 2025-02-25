// import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
// import DropMenuModal from '../DropMenuModal';
// import { AppContext } from '../../../App';
// import { useContext } from 'react';
// import { useState } from 'react';


// const UserMenuButton = () => {

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { profilePic } = useContext(AppContext);
//   const url = import.meta.env.VITE_SERVER_URL_USERS;


//   const changeNavState = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };


//   return (
//     <div
//       className={`w-[75px] h-[37px] border-[1px] border-darkGrey rounded-60 flex justify-between items-center cursor-pointer hover:shadow-hoverShadow pl-3 pr-[2px]`}
//       onClick={changeNavState}
//     >
//       <div className="text-[16px] text-writingMainDark">
//         {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//       </div>

//       <img
//         src={profilePic ? `${url}/${profilePic}` : "/anonyme_two.jpg"}
//         alt="profile"
//         className={`w-[33px] h-[33px] object-cover object-center rounded-50`}
//       />

//       {/* {isMenuOpen && (
//         <DropMenuModal isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
//       )} */}
      

//     </div>
//   );
// };

// export default UserMenuButton

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import DropMenuModal from '../DropMenuModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


const UserMenuButton = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const user = useSelector((state: RootState) => state.user.user);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <div>
      <div
        className={`w-[75px] h-[37px] border-[1px] border-darkGrey rounded-60 flex justify-between items-center cursor-pointer hover:shadow-hoverShadow pl-3 pr-[2px]`}
        onClick={handleMenuOpen}
      >
        <div className="text-[16px] text-writingMainDark">
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>

        <img
          src={
            user.profilePicture
              ? `${url}/${user.profilePicture}`
              : "/anonyme_two.jpg"
          }
          alt="profile"
          className={`w-[33px] h-[33px] object-cover object-center rounded-50`}
        />
      </div>

      <DropMenuModal
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={handleMenuClose}
        anchorEl={anchorEl}
      />

      {/* <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            borderRadius: '10px',
            marginTop: '10px',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu> */}
    </div>
  );
};

export default UserMenuButton;