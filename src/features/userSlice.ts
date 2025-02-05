import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const savedUser = localStorage.getItem("userData");
const initialState: { userInfo: UserState } = {
  userInfo: savedUser
    ? JSON.parse(savedUser)
    : { id: "", name: "", email: "", phone: "", address: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserState>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const { saveUser } = userSlice.actions;
export default userSlice.reducer;
