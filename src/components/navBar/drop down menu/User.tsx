import { useContext } from 'react';
import { NavBarContext } from '@/components/ui/NavBar';
import { AppContext } from '@/App';
import { MenuItem } from '@mui/material';

const User = () => {

    const { firstName, lastName } = useContext(NavBarContext);
    const { profilePic } = useContext(AppContext);
    const url = import.meta.env.VITE_SERVER_URL_USERS;


    
  return (
    <MenuItem className="user flex items-center gap-2">
      <img
        src={profilePic ? `${url}/${profilePic}` : "/anonyme.jpg"}
        alt="profile, picture"
        className="w-[35px] h-[35px] object-cover object-center rounded-50"
      />
      <p className="text-writingMainDark font-medium">
              {firstName} {lastName}
      </p>
    </MenuItem>
  );
}

export default User
