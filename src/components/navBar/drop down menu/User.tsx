import { MenuItem } from '@mui/material';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const User = () => {

  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const user = useSelector((state: RootState) => state.user.user);


    
  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      className="user flex items-center gap-2">
      <img
        src={
          user.profilePicture ? `${url}/${user.profilePicture}` : "/anonyme.jpg"
        }
        alt="profile, picture"
        className="w-[35px] h-[35px] object-cover object-center rounded-50"
      />
      <p className="text-writingMainDark font-medium">
        {user.name} {user.surname}
      </p>
    </MenuItem>
  );
}

export default User
