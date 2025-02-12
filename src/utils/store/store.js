import { configureStore } from "@reduxjs/toolkit";
import chatRedcuer from "./ChatSLice";
export const store = configureStore({
  reducer: {
    chat: chatRedcuer,
  },
});
