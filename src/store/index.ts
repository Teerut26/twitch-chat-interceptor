import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slice/chat";
import chatHistorySlice from "./slice/chat_history";
import chatSelectSlice from "./slice/chat_select";
import numberSlice from "./slice/number";

const store = configureStore({
  reducer: {
    number: numberSlice.reducer,
    chat: chatSlice.reducer,
    chat_history: chatHistorySlice.reducer,
    chat_select: chatSelectSlice.reducer
  },
});
export default store;
