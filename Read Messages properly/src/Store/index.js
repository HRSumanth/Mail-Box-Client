import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./AuthReducer";
import emailSlice from "./EmailReducer";
import {modalSlice} from "./EmailReducer";
import {notifySlice} from "./EmailReducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    email: emailSlice.reducer,
    modal: modalSlice.reducer,
    notify: notifySlice.reducer,
  },
});

export default store;
