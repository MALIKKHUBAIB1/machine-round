import { configureStore } from "@reduxjs/toolkit";
import chatRedcuer from "./ChatSLice";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    chat: chatRedcuer,
    user: userReducer,
  },
});
