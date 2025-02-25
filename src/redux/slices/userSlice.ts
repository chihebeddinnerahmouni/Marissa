import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IAuthUser} from '@/types/auth-user';


const initialState = {
    user: {} as IAuthUser,
} 

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;