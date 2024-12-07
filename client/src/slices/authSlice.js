import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: document.cookie.startsWith("token")? JSON.parse(document.cookie.substring(6)): null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      document.cookie=`token=${JSON.stringify(action.payload)}`;
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
