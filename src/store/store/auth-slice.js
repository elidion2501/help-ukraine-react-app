import { createSlice } from "@reduxjs/toolkit";

const getInitialValues = () => {
  let isLogin = false;
  const token = localStorage.getItem("token");
  if (localStorage.getItem("token")) {
    isLogin = true;
  }

  return {
    token,
    isLogin,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: getInitialValues().isLogin,
    token: getInitialValues().token,
  },
  reducers: {
    login(state, action) {
      state.login = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.login = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
