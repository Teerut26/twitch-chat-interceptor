import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slice/chat";
import numberSlice from "./slice/number";

const store = configureStore({
  reducer: {
    number: numberSlice.reducer,
    chat: chatSlice.reducer,
  },
});
export default store;
