import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slice/chat";
import chatHistorySlice from "./slice/chat_history";
import numberSlice from "./slice/number";

const store = configureStore({
  reducer: {
    number: numberSlice.reducer,
    chat: chatSlice.reducer,
    chat_history: chatHistorySlice.reducer,
  },
});
export default store;
