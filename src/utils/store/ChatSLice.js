import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
  name: "livechat",
  initialState: [],
  reducers: {
    addChat: (state, action) => {
      const newChat = [...state, action.payload];
      return newChat;
    },
    removeChat: (state) => {
      if (state.length > 5) {
        state.shift();
      }
    },
  },
});

export const { addChat,removeChat } = chat.actions;
export default chat.reducer;
