import { createSlice } from "@reduxjs/toolkit";


const authToken = localStorage.getItem("idToken");
let authStatus;
if (authToken) {
  authStatus = true;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: authStatus,
    token: authToken,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("idToken", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
